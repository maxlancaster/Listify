var assert = require("assert");
var mongoose = require("mongoose");
var moment = require("moment");

var ranking = require("../models/Ranking.js");


// mongoose.connect('mongodb://localhost/tests');

var noop = function(){};
// ranking.remove({}, function() {});
// ranking.createList({}, noop); // TODO: create actual test objects.


// Test List.
describe("Ranking", function() {

    // Test addRanking.
    describe("#addRanking", function () {

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

    // Test updateRanking.
    describe("#updateRanking", function () {

    });

    // Test getRankingObjectsFromListOfIds.
    describe("#getRankingObjectsFromListOfIds", function () {

    });

    // Test getUserRankings.
    describe("#getUserRankings", function () {

    });

    // Test addItemToRanking.
    describe("#addItemToRanking", function () {

    });

    // Test getListByRankingId.
    describe("#getListByRankingId", function () {

    });

    // Test getRankingByID.
    describe("#getRankingByID", function () {

    });
});