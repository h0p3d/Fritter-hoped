//hoped
//Users class - keeps track of all users for current session

let data = [];

/**
 * @typedef User
 * uses closure which is a more typesafe thingy
 */


/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  
  static User(name, pass){
        let username = name;
        let password = pass;
        let upvotes = new Set();
        let downvotes = new Set();
        let following = new Set(); //people user is following
        let followers = new Set(); //people that follow user
        return{
          getU: function(){return username;}, //PASSWORD AND USERNAME FUNCTIONS
          getP: function(){return password;},
          setU: function(u){username = u;},
          setP: function(p){password = p;},
          hasVote: function(id){ return upvotes.has(id) || downvotes.has(id);}, //UPVOTE FUNCTIONS
          removeVote: function(id){ 
            if (upvotes.has(id)){
                upvotes.delete(id);
                return true; // upvote was deleted
            }else{
                 downvotes.delete(id);
                 return false; // downvote was deleted
               }},
          addUp: function(id){ upvotes.add(id);},
          addDown: function(id){ downvotes.add(id);},
          getUp: function(){return upvotes;},
          getDown: function(){return downvotes;},
          hasFollower: function(username){ return followers.has(username);}, //FOLLOW FUNCTIONS
          isFollowing: function(username){ return following.has(username);},
          removeFollower: function(username){ return followers.delete(username);},
          removeFollowing: function(username){ return following.delete(username);},
          addFollower: function(username){ followers.add(username);},
          addFollowing: function(username){ following.add(username);},
          getFollow: function(){ return {numFollow: followers.size, follow:Array.from(followers), 
            numFollowing:following.size, following:Array.from(following),};},
          get: function(){ return {username: username, password: password, upvotes: Array.from(upvotes),
           downvotes: Array.from(downvotes), followers: Array.from(followers), following: Array.from(following)};},
          getSecure: function(){ return {username: username, followers: Array.from(followers), following: Array.from(following)};}
        }
 }
  /**
   * Add a User.
   * @param {string} username - User's username 
   * @param {string} password - User's password
   * @return {username, password} - created user
   */
  static create(username, password) {
    let user = Users.User(username, password);
    data.push(user);
    return user.get();
  }

  /**
   * Find a User by username.
   * @param {string} name - username of User to find
   * @return {username, password | undefined} - found User
   */
  static find(name) {
    let user = data.filter(user => user.getU() === name)[0];
    if (user !== undefined) return user.get();
    else return user;
  }

  /**
   * Update a User's username.
   * @param {string} name - name of User to update
   * @param {string} newName - new Username
   * @return {User | undefined} - updated User
   */
  static updateUsername(name, newName) {
    let user = data.filter(user => user.getU() === name)[0];
    if (user){
      user.setU(newName);
      return user.get();
    } 
    else return user;
  }

    /**
   * Update a User's password.
   * @param {string} name - name of User to update
   * @param {string} newPassword - new Password
   * @return {User | undefined} - updated User
   */
  static updatePassword(name, newPassword) {
    let user = data.filter(user => user.getU() === name)[0];
    if (user !== undefined){
      user.setP(newPassword);
      return user.get();
    } 
    else return user;
  }

  /**
   * Delete a User
   * @param {string} name - name of User to delete
   * @return {User | undefined} - deleted User
   */
  static delete(name) {
    const user = data.filter(user => user.getU() === name)[0];
    if (user !== undefined){
      data = data.filter(user => user.getU() !== name);
      return user.get();
    } 
    else return user;
  }

    /**
   * Return whether a user has voted for a freet.
   * @param {string} name - name of User to update
   * @param {string} id - id of freet to check for
   * @return True | False - return true if user has voted for freet with id,false otherwise or if user does not exist 
   */
  static hasVoted(name, id) {
    let user = data.filter(user => user.getU() === name)[0];
    if (user !== undefined){
      return user.hasVote(id);
    } 
    else return false;
  }

  /**
   * Remove vote for a freet with id. Assumes user has a vote for freet.
   * @param {string} name - name of User to update
   * @param {string} id - id of freet to remove
   * @return [True|False, {User | undefined}] - tuple with true if upvote was removed, false otherwise, and updated user state 
   */
  static removeVote(name, id) {
    let user = data.filter(user => user.getU() === name)[0];
    if (user !== undefined){
      return [user.removeVote(id), user.get()];
    } 
    else return user;
  }

    /**
   * Remove all votes for a freet with id. 
   * @param {string} id - id of freet to remove votes for
   */
  static removeVotes(id) {
    data.forEach(function(user){user.removeVote(id);});
  }

    /**
   * Add upvote for a freet with id.
   * @param {string} name - name of User to update
   * @param {string} id - id of freet to add upvote
   * @return {User | undefined} - updated user state 
   */
  static upvote(name, id) {
    let user = data.filter(user => user.getU() === name)[0];
    if (user !== undefined){
      user.addUp(id);
      return user.get();
    } 
    else return user;
  }

      /**
   * Add downvote for a freet with id.
   * @param {string} name - name of User to update
   * @param {string} id - id of freet to add downvote
   * @return {User | undefined} - updated user state 
   */
  static downvote(name, id) {
    let user = data.filter(user => user.getU() === name)[0];
    if (user !== undefined){
      user.addDown(id);
      return user.get();
    } 
    else return user;
  }

      /**
   * Follow another user
   * @param {string} name - name of User
   * @param {string} nameToFollow - name of User that name wants to follow 
   * @return [{User | undefined},{User | undefined}] - updated user states for [Follower, Following]
   */
  static follow(name, nameToFollow) {
    let user = data.filter(u => u.getU() === name)[0];
    let userToFollow = data.filter(u => u.getU() === nameToFollow)[0];

    if (user !== undefined && userToFollow !== undefined){
      user.addFollowing(nameToFollow);
      userToFollow.addFollower(name);
      return [user.get(), userToFollow.getSecure()];
    } 
    else return [user, userToFollow];
  }

    /**
   * Unfollow another user or remove user from followers
   * @param {string} name - name of User
   * @param {string} nameToUnfollow - name of User that name wants to unfollow / remove from followers
   * @param {boolean} removeFollower - true if removing follower, otherwise remove following 
   * @return [{User | undefined},{User | undefined}] - updated user states for [Follower, Following]
   */
  static unfollow(name, nameToUnfollow, removeFollower) {
    let user = data.filter(u => u.getU() === name)[0];
    let userToUnfollow = data.filter(u => u.getU() === nameToUnfollow)[0];

    if (user !== undefined && userToUnfollow !== undefined){
      if (removeFollower){ //remove other user from followers
          user.removeFollower(nameToUnfollow);
          userToUnfollow.removeFollowing(name);
      }else{
        user.removeFollowing(nameToUnfollow);
        userToUnfollow.removeFollower(name);
      }
      return [user.get(), userToUnfollow.getSecure()];
    } if (user !== undefined){ // changing username
      if (removeFollower)
       user.removeFollower(nameToUnfollow);
     else
       user.removeFollowing(nameToUnfollow);
    }
    else return [user, userToUnfollow];
  }


    /**
   * Check if user is currently followed by another user
   * @param {string} name - name of User
   * @param {string} nameFollow - name of other user
   * @return {boolean} - true if user name has follower user nameFollow, false otherwise or if user doesn't exist
   */
  static hasFollower(name, nameFollow) {
    let user = data.filter(u => u.getU() === name)[0];

    if (user !== undefined){
      return user.hasFollower(nameFollow);
    } 
    else return false;
  }

      /**
   * Check if user is currently following another user
   * @param {string} name - name of User
   * @param {string} nameFollow - name of other user
   * @return {boolean} - true if user name is following user nameFollow, false otherwise or if user doesn't exist
   */
  static isFollowing(name, nameFollow) {
    let user = data.filter(u => u.getU() === name)[0];

    if (user !== undefined){
      return user.isFollowing(nameFollow);
    } 
    else return false;
  }

    /**
     * Get list of followers and following
   * @param {string} name - name of User
   * @return {follow: set of followers, following: set of following} | undefined if user not found
   */
  static getFollow(name) {
    let user = data.filter(u => u.getU() === name)[0];
    if (user !== undefined){
      return user.getFollow();
    } 
    else return user;
  }



}

module.exports.Users = Users;
