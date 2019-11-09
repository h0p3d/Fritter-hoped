//hoped
//users routes

const express = require('express');
const router = express.Router();
const Users = require('../modules/Users').Users;
const Freets = require('../modules/Freets');

/**
 * Set username and password of active user.
 * @name POST/user/logging/:name
 * @param {string} username - username of User (if logging/in )
 * @param {string} password - password of User (if logging/in )
 * @return {session} - the status of session
 * @throws {401} - if passwords do not match
 * @throws {400} - if username does not exist
 * @throws {404} - if not logging/in or logging/out
 * -- will not throw error if already logged in, simply starts new session
 */
router.post('/logging/:name', (req, res) => {
  let update = req.params.name;
  if (update === "out"){ // log out
    req.session.name = undefined
    res.status(200).json(req.session).end();
  }else if (update === "in"){ // log in
    let name = req.body.username;
    let password = req.body.password;
    let found = Users.find(name);

    if (found === undefined){ //username does not exist
        res.status(404).json({
        error: `User with username ${req.body.username} does not exist.`,
      }).end();
    } else if (found.password !== password) { // passwords do not match
        res.status(401).json({
        error: `Password ${req.body.password} does not match with username ${req.body.username}.`,
      }).end();
    }else{ // SUCCESS
      req.session.name = name;
      res.status(200).json(req.session).end(); 
    }
  }else { // something else not valid
    res.status(404).json(req.params).end();
  }
});

/**
 * Create a User.
 * @name POST/users/create
 * @param {string} username - username of User 
 * @param {string} password - password of User
 * @return {User} - the created User
 * @throws {400} - if name is already taken
 */
router.post('/create', (req, res) => {
  console.log("made it to router post which is a good sign, yeah?");
  if (Users.find(req.body.username) !== undefined) {
    console.log("1")
    res.status(400).json({
      error: `User with username ${req.body.username} already exists.`,
    }).end();
  } else if ( (req.body.username) === "") {
    console.log("2")
    res.status(400).json({
      error: `Username must be at least one character!`,
    }).end();
  } else if ( (req.body.password) === "") {
    console.log("3")
    res.status(400).json({
      error: `Password must be at least one character!`,
    }).end();
  }else {
    console.log("4")
    const user = Users.create(req.body.username, req.body.password);
    console.log(user);
    res.status(200).json(user).end();
  }
});


/**
 * Update a User's username. User must be signed in.
 * @name PUT/users/edit/:name
 * @param {string} username - the new username (/:name = username )
 * @param {string} password = the new password (/:name = password )
 * @return {User} - the updated user
 * @throws {403} - if user is not currently signed in
 * @throws {400} - if name is already taken
 * @throws {400} - if password does not change
 * @throws {404} - if tries to edit something else
 */
router.put('/edit/:name', (req, res) => {
  console.log(req + " " + res)
  let current = req.session.name;
  let update = req.params.name;
  console.log("current "+current+" update "+update);
  if (current) { //currently logged in
    if (update === "username"){ //attempt to update username
      let newName = req.body.username;
      let found = Users.find(newName);
      if (found) {// new username is in use
        res.status(400).json({
         error: `User with username ${newName} already exists.`,
         }).end();
      } else if ( newName === "") {
          res.status(400).json({
           error: `New username must be at least one character!`,
         }).end();
       } else { 
        const user = Users.updateUsername(current, newName);
        const freets = Freets.updateAuthor(current, newName);// Update freets to new username
        user.followers.forEach(function(follower){  //update followers to new name
          Users.unfollow(follower, current, false);
          Users.follow(follower, newName);});
        user.following.forEach(function(following){  //update followers to new name
          Users.unfollow(following, current, true);
          Users.follow(newName, following);});
        req.session.name = undefined; // end session
        res.status(200).json({
         message: `User with username ${current} has been updated to ${newName}. Please log in again`,
         updatedFreets: freets,
         }).end();
      }
    }else if(update === "password"){  //attempt to update password
      let newPassword = req.body.password;
      let oldPassword = Users.find(current).password;
      if (newPassword === oldPassword){ // password is not updating
          res.status(400).json({
         error: `User with username ${current} already has that password. Please enter a new one.`,
         }).end();
      } else if ( newPassword === "") {
          res.status(400).json({
           error: `New password must be at least one character!`,
         }).end();
       }else {
        const user = Users.updatePassword(current, newPassword);
        req.session.name = undefined; // end session
        res.status(200).json({
         message: `User with username ${current} has successfully updated password. Please log in again`,
         }).end();
      }
    }else{ // trying to update something else
       res.status(404).end();
    }
  } else { //not logged in
    res.status(403).json({
       error: `Please login first...`,
       }).end();
  }
});

/**
 * View a User's feed or set of followers / people they follow
 * @name GET/users/view/:command
 * @return {Freets or Set of strings} - represents desired information
 * @throws {403} - if user is not currently signed in
 * @throws {404} - if tries to view something else
 */
router.get('/view/:command', (req, res) => {
  let current = req.session.name;
  let command = req.params.command;
  console.log("request " + current + " command " + command);
  if (current) { //currently logged in
    let found = Users.find(current);
    console.log(found);
    if (found){ //user exists
      if (command === "feed") { 
        const freets = Freets.findAuthors(found.following);
        res.status(200).json({user: found, freets:freets}).end();
      } else if (command === "follow") { 
        const follow = Users.getFollow(current);
        res.status(200).json({follow}).end();
      } else { // trying to update something else
         res.status(404).end();
      }
    } else {
        res.status(400).json({
           error: `User does not exist! Big oof.`,
         }).end();
    }
  } else { //not logged in
    res.status(403).json({
       error: `Please login first...`,
       }).end();
  }
});

/**
 * Perform User's command to uppvote / downvote or remove a vote on another User's freet by given id
 * User must be signed in.
 * @name PUT/freets/vote/:command
 * @param {string} /:command - id representing the command "add" | "removeFollow" | "removeFollower"
 * @return {user, other} - the updated user states
 * @throws {400} - if id does not exist or freet belongs to user or if action is invalid
 * @throws {403} - if user is not currently signed in
 */
router.put('/follow/:command', (req, res) => {
  let current = req.session.name;
  let command = req.params.command;
  if (current) { //currently logged in
    let other = req.body.username;
    let found = Users.find(other);
    if (found === undefined){ // user does not exist
      res.status(400).json({
      error: `User ${other} does not exist. Please enter a valid username.`,
      }).end();
    } else if (other === current) { // user cannot follow themselves
      res.status(400).json({
      error: `You cannot follow or unfollow yourself!!`,
      }).end();
    } else if (command === 'removeFollow') { // user stops following another user
      let isFollowing = Users.isFollowing(current, other);
      if (!isFollowing){
        res.status(400).json({
        error: `You have not followed user ${other}!`,
        }).end();
      }else{
        let result = Users.unfollow(current, other, false); //removing following
        res.status(200).json({
          message: `Successfully stopped following ${other}`,
          user: result[0],
          other_user: result[1],
          }).end();
      }
    } else if (command === 'removeFollower') { // user removes a follower
      let isFollower = Users.hasFollower(current, other);
      if (!isFollower){
        res.status(400).json({
        error: `You do not follower user ${other}!`,
        }).end();
      }else{
        let result = Users.unfollow(current, other, true); //removing follower
        res.status(200).json({
          message: `Successfully removed follower ${other}`,
          user: result[0],
          other_user: result[1],
          }).end();
      }
    } else if (command === 'add'){ // user wants to start following other
      let isFollowing = Users.isFollowing(current, other);
      if (isFollowing){
        res.status(400).json({
        error: `You are already following user ${other}!`,
        }).end();
      }else{
        let result = Users.follow(current, other); //start following
        res.status(200).json({
          message: `Successfully started following ${other}`,
          user: result[0],
          other_user: result[1],
          }).end();
      }
    } else{ //invalid command
      res.status(400).json({
        error: `Invalid command ${command} - must use /freet/vote/ {up, down, remove}`,
        }).end();
    } 
  } else { //not logged in
    res.status(403).json({
       error: `Please login first...`,
       }).end();
  }
});

/**
 * Delete a user, their freets, and log them out.
 * @name DELETE/users/delete
 * @return {user} - the deleted user
 * @throws {403} - if user is not currently signed in
 */
router.delete('/delete', (req, res) => {
  let current = req.session.name;
  if (current) {
    const user = Users.delete(current);
    const freets = Freets.deleteAuthor(current);  //delete all associated freets
    user.downvotes.forEach(function(id){Freets.updateVote(id, false, false);}); //downvotes, remove 1 vote per freet
    user.upvotes.forEach(function(id){Freets.updateVote(id, true, false);}); //upvotes, remove 1 vote per freet
    user.following.forEach(function(other){Users.unfollow(current,other,false)}); // remove all following
    user.followers.forEach(function(other){Users.unfollow(current,other,true)}); // remove all followers
    freets.forEach(function(freet){Users.removeVotes(freet.id);}); // remove user votes on deleted user freets
    req.session.name = undefined; // sign out
    res.status(200).json({
         message: `User with username ${current} has been deleted with all of their freets. Please log in again`,
         deletedFreets: freets,
         deletedUser: user
         }).end();
  } else {
    res.status(403).json({
     error: `Please login first...`,
    }).end();
  }
});




module.exports = router;

