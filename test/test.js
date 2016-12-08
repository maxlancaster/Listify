var assert = require('assert');
var mongoose = require('mongoose');
var app = require('../app');
var Users = require('../models/Users');
var Ranking = require('../models/Ranking');
var List = require('../models/List');

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// User Model Tests /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Users', function() {

    describe('Users', function () {

    	// drop Users table
    	mongoose.model('Users').remove({}, function(err) {
		   console.log('Users collection removed');
		});

		var test_username;
		var test_user_id;

        it('Create a valid new user', function (done) {

            Users.createUser("my_username", "password", function (err, user) {
            	assert.equal(user.username, "my_username");
            	assert.equal(user.password, "password");
            	assert.equal(user.rankings, []);
            	assert.equal(user.lists, []);

            	test_username = user.username;
            	test_user_id = user._id;
            });
            done();

        });

        it('Create an invalid user with username too short', function (done) {

            Users.createUser("hi", "password", function (err, user) {
                assert.equal(err.msg, "Usernames should be at most 15 characters and at least 3!");
            });
            done();

        });

        it('Create an invalid user with username too long', function (done) {

            Users.createUser("this_is_more_than_fifteen_characters", "password", function (err, user) {
                assert.equal(err.msg, "Usernames should be at most 15 characters and at least 3!");
            });
            done();
        });

        it('Create an invalid user with already taken username', function (done) {

            Users.createUser("my_username", "password", function (err, user) {
                assert.equal(err.msg, "That username is already taken!");
            });
            done();
        });

        it('Find a user by username', function (done) {

            Users.createUser("maxlancaster", "password", function (err, original_user) {
            	Users.findUser("maxlancaster", function(err, user){
            		assert.equal(user.username, original_user.username);
            		assert.equal(user._id, original_user._id);
            	});
            });
            done();

        });

        it('Find a non-existing user by username', function (done) {

        	Users.findUser("maxlancaster", function(err, user){
        		assert.equal(err.msg, "This user does not exist!");
        	});
            done();

        });

        it('Get all rankings by username', function (done) {
        	var rankingData = {
        		order : [],
                list : "fake_id",
                comment : "comment",
                listTitle : "title",
                listCreatorUsername : "test_username",
                user : "test_username",
    			user_id : "test_user_id"
        	}
        	Ranking.addRanking(rankingData, function(err, ranking){
	            Users.hasSubmittedRanking(test_user_id, ranking, function(err, user) {
	            	console.log("here");
	            });
		    });

        	Users.getAllRankings(test_username, function(err, rankings){
        		assert.equal(rankings.length, 1);
        	});
            done();

        });
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// Ranking Model Tests ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// mongoose.model('Ranking').remove({}, function(err) {
//    console.log('Rankings collection removed')
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// List Model Tests /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// mongoose.model('List').remove({}, function(err) {
//    console.log('List collection removed')
// });