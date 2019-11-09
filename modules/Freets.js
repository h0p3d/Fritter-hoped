//hoped
//Freet class - keeps track of all freets for current session

let freetData = [];
let count = 0;

/**
 * @typedef Freet
 * uses closure which is a more typesafe thingy
 */


/**
 * @class Freets
 * Stores all Freet.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same freetData.
 */
class Freets {
  
  static Freet(name, mess){
        let author = name;
        let id = count+"";
        count += 1;
        let message = mess;
        let time = Freets.getDate();
        let upvotes = 0;
        let downvotes = 0;
        let refreet = undefined;
        return{
          getAuthor: function(){return author;},
          getID : function(){return id;},
          getMessage : function(){return message;},
          getTime: function(){return time;},
          setAuthor: function(a){author = a;},
          setMessage: function(m){message = m;
                                  time = Freets.getDate();},
          getRefreet: function(){ //get a trimmed down version to use as a Refreet
           if (refreet === undefined){
              return {id: id, author: author, message: message};
            } else
              return {id: id, author: author, message: message, refreet: refreet};
            },
          get: function(){
            if (refreet === undefined){
              return {id: id, time: time, author: author, message: message, upvotes: upvotes, downvotes: downvotes};
            } else
              return {id: id, time: time, author: author, message: message, refreet: refreet, upvotes: upvotes, downvotes: downvotes};
            },
          setRefreet: function(freet){ refreet = freet; },
          addUpvote: function(){ upvotes += 1;},
          removeUpvote: function(){ upvotes -= 1;},
          addDownvote: function(){ downvotes += 1;},
          removeDownvote: function(){ downvotes -= 1;},
        }
 }

/*
* Get day and time in a string format.
* @return {string} day and time in string format
* source: https://tecadmin.net/get-current-date-time-javascript/
*/
 static getDate(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime;
 }

  /**
   * Add a Freet.
   * @param {string} author - Username that created freet 
   * @param {string} message - String 140 characters or fewer 
   * @param {string} refreetID - String representing ID of valid freet user wishes to refreet
   * @return {id, time, author, message} - created Freet
   */
  static create(author, message, refreetID) {
  	let freet = Freets.Freet(author, message);
    if (refreetID !== undefined){
      let refreet = freetData.filter(freet => freet.getID() === refreetID)[0].getRefreet();
      freet.setRefreet(refreet);
    }
    freetData.unshift(freet);
    return freet.get();
  }

  /**
   * Find a Freet by id.
   * @param {string} id - id string of Freet to find
   * @return {mutable Freet | undefined} - found Freet
   */
  static findID(id) {
    let freet = freetData.filter(freet => freet.getID() === id)[0];
    return freet;
  }

    /**
   * Find all freets by author.
   * @param {string} author - Username to find freets authored by
   * @return {[list of info that cannot be mutated] | undefined} - found Freets in a list
   */
  static findAuthor(author) {
    let freets = freetData.filter(freet => freet.getAuthor() === author);
    return freets.map(freet => freet.get());
  }

    /**
   * Find all freets by authors (people user is following).
   * @param {Set(string)} authors - set of usernames to find freets authored by
   * @return {[list of info that cannot be mutated] | undefined} - found Freets in a list
   */
  static findAuthors(authors) {
    authors = new Set(authors);
    let freets = freetData.filter(freet => authors.has(freet.getAuthor()));
    return freets.map(freet => freet.get());
  }

    /**
   * Find all freets
   * @return {[list of info that cannot be mutated] | undefined}
   */
  static findAll() {
    return freetData.map(freet => freet.get());
  }

  /**
   * Update a single Freet with id ID. User previously verified, id exists
   *  and new message must be of freet length.
   * @param {string} id - id of Freet to update
   * @param {string} newMessage - new Message of Freet.
   * @return {Freet immutable data | undefined} - updated Freet
   */
  static updateID(id, newMessage) {
    let freet = Freets.findID(id);
    freet.setMessage(newMessage);
    return freet.get();
  }

    /**
   * Update a single Freet's vote with id ID. User previously verified, id exists
   *  and command is valid.
   * @param {string} id - id of Freet to update
   * @param {boolean} isUp -  whether to change upvote or downvote count.
   * @param {boolean} increase - whether to change increase or decrease vote count
   * @return {Freet immutable data | undefined} - updated Freet
   */
  static updateVote(id, isUp, increase) {
    let freet = Freets.findID(id);
    if (increase && isUp){
      freet.addUpvote();
    } else if (increase && !isUp){
      freet.addDownvote();
    } else if (!increase && isUp){
      freet.removeUpvote();
    }else {
      freet.removeDownvote();
    }
    return freet.get();
  }

    /**
   * Update all Freets by author to New Author. User previously verified
   * @param {string} author - author of Freets to update
   * @param {string} newAuthor - new Author name of Freet.
   * @return {[list of info that cannot be mutated] | undefined} - updated Freets in a non mutable list
   */
  static updateAuthor(author, newAuthor) {
    let freets = (freetData.filter(freet => freet.getAuthor() === author)).map(function(f){f.setAuthor(newAuthor); return f;});
    return freets.map(freet => freet.get());
  }


  /**
   * Delete a all freets by author, given that user is verified
   * @param {string} author - author of Freets to delete
   * @return {[list of Freet immutable data] | undefined} - deleted Freets
   */
  static deleteAuthor(author) {
    const deletedFreets = Freets.findAuthor(author);
    freetData = freetData.filter(freet => freet.getAuthor() !== author);
    return deletedFreets;
  }

  /**
   * Delete a Freet, given that user is verified, and id is valid
   * @param {string} id - id of Freet to delete
   * @return {Freet immutable data | undefined} - deleted Freet
   */
  static deleteID(id) {
    const freet = freetData.filter(freet => freet.getID() === id)[0];
    freetData = freetData.filter(freet => freet.getID() !== id);
    return freet.get();
  }
}

module.exports = Freets;