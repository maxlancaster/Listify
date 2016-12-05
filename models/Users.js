
/*
 * Model representing a user.
 * key: value pairs are key = username of the user and value =
 * the object representing the user.
 * EXAMPLE USER:
 *   { 'username': 'bruno'
 *     'password': 'pass1' }
 * Usernames and passwords are always strings.
 */

var mongoose = require('mongoose');
var Ranking = require('../models/Ranking');
var List = require('../models/List');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: {unique: true}
    },

    password: String,

    rankings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ranking'
    }],

    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }],

    last_viewed_invitations_date: {type: Date, default: Date.now}

});

userSchema.index({username: 'text'});

var userModel = mongoose.model('Users', userSchema);

var Users = (function(userModel) {
    var that = {};

    that.getAllRankings = function (username, callback) {
        userModel.findOne({ username: username }, function(err, user) {
            if (err) callback({ msg: err });
            if (user != null) {
                var rankings = user.rankings.slice();
                callback(null, rankings);
            } else {
                callback({ msg: 'The user does not exist!'});
            }
        });
    };

    that.getAllLists = function (username, callback) {
        userModel.findOne({ username: username }, function(err, user) {
            if (err) callback({ msg: err });
            if (user != null) {
                var lists = user.lists.slice();
                callback(null, lists);
            } else {
                callback({ msg: 'The user does not exist!'});
            }
        });
    };

    /**
     *  If the username is valid, returns the user object.
     *  Otherwise, returns an error message
     * @param username {String} - the username to query
     * @param callback
     */
    that.findUser = function(username, callback) {
        userModel.findOne({ username: username }, function(err, result) {
            if (err) callback({ msg: err });
            if (result !== null) {
                callback(null, result);
            } else {
                callback({ msg: 'This user does not exist!' });
            }
        });
    };

    /**
     *  If the id is valid, returns the user object.
     *  Otherwise, returns an error message
     * @param id {ObjectId} - ObjectId to query
     * @param callback
     */
    that.findById = function(user_id, callback) {
        userModel.findById(user_id, function(err, result) {
            if (err) callback({ msg: err });
            if (result !== null) {
                callback(null, result);
            } else {
                callback({ msg: 'This user does not exist!' });
            }
        });
    };

    /**
     *  Find users given a search string. If no users are found an empty array is returned
     * @param searchString {String} - the search string to query
     * @param callback
     */
    that.search = function(searchString, callback) {
        userModel.find({ "username": { "$regex": new RegExp(searchString, "i")} }).exec(function(err, result) {
            if (err) callback({ msg: err });
            if (result !== null) {
                callback(null, result);
            } else {
                callback(null, []);
            }
        });
    };


    /**
     * If the user exists and the password matches the user's real password return true.
     * Otherwise, return false (to the callback).
     * @param username {String} - the username
     * @param password {String} - the password to check
     * @param callback
     */
    that.checkPassword = function(username, password, callback) {
        userModel.findOne({ username: username }, function(err, user) {
            if (err) callback({ msg: err });
            if (user !== null && password === user.password) {
                callback(null, user);
            } else {
                callback(null, false);
            }
        });
    };

    /**mutates the list property to keep track of which lists the user has created **/
    that.hasCreatedList = function(user_id, list, callback) {
      userModel.findOneAndUpdate({_id:user_id}, {$push: {lists:list._id}}, function(error, user) {
        if (error) callback({msg:error});
        if (user !== null) {
          callback(null, user);
        } else {
          callback(null, false);
        }
      });
    }

    /**mutates the list property to keep track of which lists the user has created **/
    that.hasSubmittedRanking = function(user_id, ranking, callback) {
      userModel.findOneAndUpdate({_id:user_id}, {$push: {rankings:ranking._id}}, function(error, user) {
        if (error) callback({msg:error});
        if (user !== null) {
          callback(null, user);
        } else {
          userModel.find({_id : user_id}).exec(function(error, user) {
              console.log("user created! : " + JSON.stringify(user, null, '\t'))
          });
          callback(null, false);
        }
      });
    }

    that.updateLastViewedInvitationsDate = function(user_id, callback) {
      userModel.findOneAndUpdate({_id:user_id}, {last_viewed_invitations_date:Date.now()}, function(error ,user) {
        if (error) callback({msg:error});
        if (user !== null) {
          callback(null, user);
        } else {
          userModel.find({_id : user_id}).exec(function(error, user) {
              console.log("user updated : " + JSON.stringify(user, null, '\t'))
          });
          callback(null, false);
        }
      });

    }


    /**
     * Checks that the passed username has not been used before, and is not larger than 15 characters long.
     * If either of those conditions are not met, return with the error
     * @param username {String} - the username
     * @param password {String} - the password to check
     * @param callback
     */
    that.createUser = function(username, password, callback) {
        userModel.findOne({ username: username}, function(err, result) {
            if (err) callback({ msg: err});
            if (result !== null) {
                callback({ taken: true});
            } else if (username.length > 15) {
                callback({ msg: 'Usernames should be at most 15 characters!' });
            } else {
                var user = new userModel({ username: username,
                    password: password  });
                user.save(function(err) {
                    if (err) callback({ msg: err });
                    userModel.find({username : username}).exec(function(error, users) {
                        console.log("user created! : " + JSON.stringify(users, null, '\t'))
                    });
                    callback(null);
                });
            }
        });
    };

    Object.freeze(that);
    return that;

})(userModel);

module.exports = Users;
