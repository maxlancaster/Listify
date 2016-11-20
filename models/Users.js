
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
// var Ranking = require('/models/Ranking');
// var Consensus = require('/models/Consensus');

var userSchema = mongoose.Schema({
    username: String,

    password: String,

    rankings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ranking'
    }],

    consensusRankings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consensus'
    }],

    following: [String],

    followers: [String]

});

var userModel = mongoose.model('User', userSchema);

// TODO - add functions: getAllRankings, getRankingById, getConsensusRanking, getConsensusRankingById addRanking, addConsensusRanking,removeRankingbyId, removeConsensusRankingById

var Users = (function(userModel) {
    var that = {};

    that.getFollowingList = function (username, callback) {
        userModel.findOne({ username: username }, function(err, user) {
            if (err) callback({ msg: err });
            if (user != null) {
                //duplciate to avoid exposure
                var following_list = user.following.slice();
                callback(null, following_list);
            } else {
                callback({ msg: 'The user does not exist!'});
            }
        });
    };

    that.getFollowersList = function (username, callback) {
        userModel.findOne({ username: username }, function(err, user) {
            if (err) callback({ msg: err });
            if (user != null) {
                //duplciate to avoid exposure
                var following_list = user.followers.slice();
                callback(null, following_list);
            } else {
                callback({ msg: 'The user does not exist!'});
            }
        });
    };



    that.followUser = function(usernameOfFollower, usernameToFollow, callback) {
        if (usernameOfFollower === usernameToFollow) {
            callback({ msg: 'You cannot follow yourself' });
        } else {
            userModel.findOne({ username: usernameToFollow }, function(err, followee) {
                if (err) callback({ msg: err });
                if (followee !== null) {
                    userModel.findOne({ username: usernameOfFollower }, function(err, follower) {
                        if (err) callback({ msg: err });
                        if (follower !== null) {
                            //sufficient to do a one way check assuming implementation is correct
                            if (follower.following.indexOf(followee.username) > -1) {
                                callback({ msg: 'Already following this user!'});
                            }
                            else {
                                follower.following.push(followee.username);
                                followee.followers.push(follower.username);
                                follower.save(function(err) {
                                    if (err) callback({ msg: err });
                                    callback(null)
                                });
                            }
                        } else {
                            callback({ msg: 'The user you are trying to get to follow someone does not exist!'});
                        }
                    });
                } else {
                    callback({ msg: 'The user you want to follow does not exist!'});
                }
            });
        }
    };

    //modified to allow dual synchronization of followers and following lists
    that.unfollowUser = function (user, usernameToRemove, callback) {
        if (usernameToRemove == user) {
            callback({msg: 'You cannot unfollow yourself'});
        } else {
            userModel.findOne({username: user}, function (err, userToModify) {
                if (err) callback({ msg: err });
                if (userToModify !== null) {

                    userModel.findOne({ username: usernameToRemove }, function(err, userToRemove) {
                        if (err) callback({ msg: err });
                        if (userToRemove !== null) {
                            //because we have a two way modification, we should do robust checks before
                            //modifying any lists
                            if (userToModify.following.indexOf(userToRemove.username) > -1
                                && userToRemove.followers.indexOf(userToModify.username) > -1) {

                                var remove1 = userToRemove.followers.indexOf(userToModify.username);
                                if (remove1 > -1) {
                                    userToRemove.followers.splice(remove1, 1);
                                }
                                var remove2 = userToModify.following.indexOf(userToRemove.username);
                                if (remove2 > -1) {
                                    userToModify.following.splice(remove2, 1);
                                }

                                //TODO check this
                                userToRemove.save(function (err) {
                                    if (err) callback({msg: err});

                                    userToModify.save(function(err) {
                                        if (err) callback({msg: err});
                                        callback(null);
                                    });
                                });

                            } else {
                                callback({ msg: 'You do not follow this user, so you cannot unfollow!'});
                            }
                        }
                        else {
                            callback({ msg: 'The user to remove does not exist!'});
                        }
                        });
                    } else {
                    callback({ msg: 'The user you want to modify does not exist!'});
                }
            });
        }
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
     * If the user exists and the password matches the user's real password return true.
     * Otherwise, return false (to the callback).
     * @param username {String} - the username
     * @param password {String} - the password to check
     * @param callback
     */
    that.checkPassword = function(username, password, callback) {
        userModel.findOne({ username: username }, function(err, result) {
            if (err) callback({ msg: err });
            if (result !== null && password === result.password) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    };


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
                callback({ msg: 'Usernames can be at most 15 characters!' });
            } else {
                var user = new userModel({ username: username,
                    password: password  });
                user.save(function(err) {
                    if (err) callback({ msg: err });
                    callback(null);
                });
            }
        });
    };


    Object.freeze(that);
    return that;

})(userModel);

module.exports = Users;