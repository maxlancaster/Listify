/*
 * Model representing a user.
 * key: value pairs are key = username of the user and value =
 * the object representing the user.
 * EXAMPLE USER:
 *   { 'username': 'bruno'
 *     'password': 'pass1' }
 * Usernames and passwords are always strings.
 */

//TODO require other models, also double check if we need a followers list and a following list

var mongoose = require('mongoose');
var Ranking = require('/models/Ranking');
var Consensus = require('/models/Consensus');

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

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});

var userModel = mongoose.model('User', userSchema);

// TODO - add functions: follow (both lists update), unfollow(both lists update), getFollowing, getAllRankings, getRankingById, getConsensusRanking, getConsensusRankingById addRanking, addConsensusRanking,removeRankingbyId, removeConsensusRankingById

var Users = (function(userModel) {
    var that = {};


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