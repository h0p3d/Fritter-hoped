const express = require('express');

const router = express.Router();
const Freets = require('../modules/Freets');
const Users = require('../modules/Users').Users;

/**
 * Get all current freets. Does not require sign in.
 */
router.get('/all', (req, res) => {
  	let freets = Freets.findAll();
    let current = req.session.name;
    let found = current ? Users.find(current) : "";
	res.status(200).json({message: "all freets", user: found, freets:freets}).end(); 
});

/**
 * Get all current freets from author. Does not require sign in.
 * @name GET/freets/display/:name
 * @param {string} /:name-  author name to specifically view Freets of 
 * @throws {400} - if author does not exist
 */
router.get('/display/:name', (req, res) => {
  let author = req.params.name;
  let current = req.session.name;
  let currentUser = current ? Users.find(current) : "";
  let found = Users.find(author);
  if (found === undefined){ //username does not exist
    res.status(404).json({
      error: `User with username ${author} does not exist.`,
      }).end();
  } else{
    let freets = Freets.findAuthor(author);
    res.status(200).json({author: author, user: currentUser, freets:freets}).end(); 
  }
  
});

/**
 * Update a User's freet message, also updates the time of the freet to reflect that it has been changed
 * User must be signed in.
 * @name PUT/freets/edit/(:id)
 * @param {string} content - String 140 characters or fewer  to replace old message
 * @return {freet} - the updated freet
 * @throws {400} - if freet exceeds length or if id does not exist or freet does not belong to user
 * @throws {403} - if user is not currently signed in
 */
router.put('/edit', (req, res) => {
  let current = req.session.name;
  if (current) { //currently logged in
    let newMessage = req.body.content;
  	let id = req.body.id;
  	let found = Freets.findID(id);
    
  	if (newMessage.length > 140) { // message too long
  		res.status(400).json({
      error: `Message is ${newMessage.length-140} characters too long. Limit is 140.`,
      message: newMessage,
    }).end();
  	} else if (found === undefined){ // id invalid
  		res.status(400).json({
      error: `ID ${id} does not exist. Please enter a valid id.`,
      id: id,
      message: newMessage,}).end();
  	} else if (found.getAuthor() !== current){ // different user
  	  res.status(400).json({
      error: `Freet with ID ${id} was written by a different user. Current user: ${current}`,
      id: id,
      message: newMessage,}).end();
  	}else if (newMessage === "") { // message empty
      res.status(400).json({
      error: `Message cannot be empty!`,
    }).end();
    }else{ //valid id, user, and message-- update!
  		const freet = Freets.updateID(id, newMessage);
  		res.status(200).json(freet).end();
  	}
    
  } else { //not logged in
    res.status(403).json({
       error: `Please login first...`,
       }).end();
  }
});

/**
 * Delete a User's freet by given id
 * User must be signed in.
 * @name DELETE/freets/delete/:name
 * @param {string} /:name - id representing the freet to be deleted
 * @return {freet} - the deleted freet
 * @throws {400} - if id does not exist or freet does not belong to user
 * @throws {403} - if user is not currently signed in
 */
router.delete('/delete/:name', (req, res) => {
  let current = req.session.name;
  if (current) { //currently logged in
  	let id = req.params.name;
  	let found = Freets.findID(id);
  	if (found === undefined){ // id invalid
  		res.status(400).json({
      error: `ID ${id} does not exist. Please enter a valid id.`,
      }).end();
  	} else if (found.getAuthor() !== current){ // different user
  	  res.status(400).json({
      error: `Cannot delete. Freet with ID ${id} was written by a different user. Current user: ${current}`,
      }).end();
  	}else{ //valid id, user-- delete!
  		const freet = Freets.deleteID(id);
      Users.removeVotes(id); // remove all other user votes for that Freet
  		res.status(200).json(freet).end();
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
 * @param {string} /:command - id representing the command "up" | "down" | "remove"
 * @return {user} - the updated user state
 * @throws {400} - if id does not exist or freet belongs to user or if action is invalid
 * @throws {403} - if user is not currently signed in
 */
router.put('/vote/:command', (req, res) => {
  console.log("voting");
  let current = req.session.name;
  if (current) { //currently logged in
    let command = req.params.command;
    let id = req.body.id;
    let found = Freets.findID(id);
    let hasVoted = Users.hasVoted(current, id);
    console.log(id + " " + command +" "+ found + " "+hasVoted);
    if (found === undefined){ // id invalid
      res.status(400).json({
      error: `ID ${id} does not exist. Please enter a valid id.`,
      }).end();
    } else if (found.getAuthor() === current){ // user cannot vote on their own posts
      res.status(400).json({
      error: `You cannot vote on your own Freets!`,
      }).end();
    }else if (command === 'remove'){ // user removes vote
      if (!hasVoted){
        res.status(400).json({
        error: `You have not voted on Freet ${id}!`,
        }).end();
      }else{
        let result = Users.removeVote(current, id);
        let freet = Freets.updateVote(id, result[0], false);//remove vote from corresponding Freet
        res.status(200).json({
          message: `Successfully removed vote`,
          user: result[1],
          freet: freet,
          }).end();
      }
    }else if (hasVoted){ // user cannot vote again
      res.status(400).json({
      error: `You cannot vote multiple times on a Freet! You must remove vote first.`,
      }).end();
    }else if (command === 'up'){ // user up votes
        let result = Users.upvote(current, id);
        let freet = Freets.updateVote(id, true, true);//up vote, add 1
        res.status(200).json({
          message: `Successfully added upvote`,
          user: result,
          freet: freet,
          }).end();
      }else if (command === 'down'){ // user down votes
        let result = Users.downvote(current, id);
        let freet = Freets.updateVote(id, false, true);//down vote, add 1
        res.status(200).json({
          message: `Successfully added downvote`,
          user: result,
          freet: freet,
          }).end();
      }else{ //invalid command
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
 * Create a freet. (create a new freet quoting another user)
 * @name POST/freets/create
 * @param {string} content - String 140 characters or fewer 
 * @param {string} id - String id of freet to refreet or undefined
 * @return {freet} - the created freet
 * @throws {400} - if freet exceeds length
 * @throws {400} - if refreet does not exist
 * @throws {403} - if user is not currently signed in
 */
router.post('/create', (req, res) => {
  console.log("should be creating here");
  let current = req.session.name;
  if (current){
    let message = req.body.content;
    let id = req.body.id;
    console.log(message + "  " + id);
    let found = Freets.findID(id);
    if (message.length > 140 && message.length) { // message too long
      res.status(400).json({
      error: `Comment is ${message.length-140} characters too long. Limit is 140.`,
      message: message,
    }).end();
    } else if (message === "") { // message empty
      res.status(400).json({
      error: `Comment cannot be empty!`,
    }).end();
    }else if (id === undefined){ // create regular freet
      const freet = Freets.create(current, message);
      res.status(200).json(freet).end();
    } else if (found === undefined){ // refreet id invalid
      res.status(400).json({
      error: `ID ${id} does not exist. Please enter a valid id.`,
      }).end();
    } else if (found.getAuthor() === current){ //user cannot refreet themselves
      res.status(400).json({
      error: `Cannot refreet your own freet.`,
      }).end();
    } else { // make refreet
      const freet = Freets.create(current, message, id);
      res.status(200).json(freet).end();
    }
  }else{
    res.status(403).json({
       error: `Please login first before trying to refreet a freet...`,
       }).end();
  }
});

module.exports = router;
