var assert = require("assert");
var mongoose = require("mongoose");
var moment = require("moment");

var list = require("../models/List.js");

mongmongoose.connect('mongodb://localhost/tests');

var noop = function(){};
// list.remove({}, function() {});
// list.createList({}, noop); // TODO: create actual test objects.


// Test List.
describe("List", function() {

    // Test createList.
    describe("#createList", function () {

        // Test create valid new user.
        it("Should create a new user with no issues.", function (done) {
            // TODO: Include actual tests
            userModel.createUser("Kanye", "extrathic", function(err, resUser){
                assert.deepEqual(err, null);
                assert.deepEqual(resUser.username, "Kanye");
                done();
            });
        });

    });

    // Test lockList.
    describe("#lockList", function () {

    });

    // Test getPublicLists.
    describe("#getPublicLists", function () {

    });

    // Test getTrendingLists.
    describe("#getTrendingLists", function () {

    });

    // Test getUserPrivateLists.
    describe("#getUserPrivateLists", function () {

    });

    // Test getUserLists.
    describe("#getUserLists", function () {

    });

    // Test getInvitedLists.
    describe("#getInvitedLists", function () {

    });

    // Test updateRankingsArray.
    describe("#updateRankingsArray", function () {

    });

    // Test addMoreItems.
    describe("#addMoreItems", function () {

    });

    // Test search.
    describe("#search", function () {

    });

    // Test getListById.
    describe("#getListById", function () {

    });

    // Test getRankingByUserId.
    describe("#getRankingByUserId", function () {

    });

    // Test getRankings.
    describe("#getRankings", function () {

    });

    // Test upvote.
    describe("#upvote", function () {

    });

    // Test downvote.
    describe("#downvote", function () {

    });
});