/**
 * Created by spencerkim on 11/18/16.
 */

/*
 * Model representing a Consensus ranking.
 * key: value pairs are key = title of the consensus and value =
 * the object representing the consensus.
 */

var mongoose = require('mongoose');
var Ranking = require('../models/Consensus');
var Items = require('../models/Items');

var consensusSchema = mongoose.Schema({

    creator: String,

    title: String,

    description: String,

    rankings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ranking'
    }],

    completed: {type: Boolean, default: false},

    public: Boolean,

    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }],

    overallRanking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }]
});

var consensusModel = mongoose.model('Consensus', consensusSchema);


var consensusRanking = (function(consensusModel) {

    var that = {};

    /**
     * Updates the consensus overallRanking (called when a ranking is submitted) according to the following algorithm:
     *
     * For a consensus, find the rankings assocaited with it, where each individual ranking is a list of items (first is the best, last is the worst).
     * Each item occurs in every list at various indices.
     * For each item, sum up the value of the indices where it is placed in each list.
     * Rank all the items by this sum, where the lowest sum is ranked first.
     * should be simple enough and will work well enough for the MVP. Thoughts?
     * @param consensusId
     * @param callback
     */
    that.updateConsensus = function (consensusId, callback) {

        //search for all the rankings with a given consensusId
        Ranking.getAllRankingsForSingleConsensus(consensusId, function (err, rankings) {
            if (err) callback({ msg: err });
            if (rankings != null) {

                //keeps track of the sums for all items
                var sums = {};

                //find the sums
                rankings.forEach(function (object) {
                    var items = object.items;
                    items.forEach(function (item) {
                        if (!(item in sums)) {
                            sums[item] = items.indexOf(item);
                        } else {
                            sums[item] += items.indexOf(item);
                        }
                    });
                });

                //create a list of the sums in increasing order
                var new_ranking = Object.keys(sums).reduce(function(a, b){ return sums[a] < sums[b] ? a : b });

                //make sure that the list is only object IDs so we can add it to the schema
                var returnRanking = [];
                new_ranking.forEach(function (item) {
                    returnRanking.push(item._id)
                });

                //assign the new list to the overallRanking field
                consensusModel.findById(consensusId, function (err, consensus) {
                    if (err) callback({ msg: err });
                    if (consensus != null) {
                        consensus.overallRanking = returnRanking;
                        callback(null, consensus);
                    } else {
                        callback({ msg: 'The consensus does not exist!'});
                    }
                });

            } else {
                callback({ msg: 'No rankings!'});
            }
        });
    };


    //pass in consensus object with same fields and same types, make sure they are the same
    //later I will add checks to make sure
    that.createConsensus = function (consensusObject, callback) {

        var newConsensus = new consensusModel({
            creator: consensusObject.creator,
            title: consensusObject.title,
            description: consensusObject.description,
            completed: false,
            public: consensusObject.public,
            items: consensusObject.items,
            overallRanking: consensusObject.items
        });

        newConsensus.save(function(err) {
            if (err) callback({ msg: err});
            callback(null);
        });
    };

    //lock a consensus by its ID
    that.lockConsensus = function (consensusId, callback) {
        consensusModel.findById(consensusId, function (err, consensus) {
            if (err) callback({ msg: err });
            if (consensus != null) {
                consensus.completed = true;
                consensus.save(function(err) {
                    if (err) callback({ msg: err});
                    callback(null);
                });


            } else {
                callback({ msg: 'The consensus does not exist!'});
            }
        });
    };

    /**
     *  Returns a public feed of consensuses.
     */
    that.getPublicConsensuses = function(callback) {
        consensusModel.find({}).find({ public: true }).exec(function(err, result) {
            if (err) callback({ msg: err });
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback({ msg: 'No public consensuses!'})
            }
        });
    };

    /**
     *  Returns a user's private consensuses.
     */
    that.getUserPrivateConsensuses = function(username, callback) {
        consensusModel.find({}).find({ creator:username, public: true }).exec(function(err, result) {
            if (err) callback({ msg: err });
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback({ msg: 'No private consensuses for this user!'})
            }
        });
    };


    /**
     * Returns a consensus from its id.
     */
    that.getConsensusById = function (consensusID, callback) {
        consensusModel.findById(consensusID, function (err, consensus) {
            if (err) callback({ msg: err });
            if (consensus != null) {
                callback(null, consensus.consensusRanking);
            } else {
                callback({ msg: 'The consensus does not exist!'});
            }
        })
    };


    Object.freeze(that);
    return that;

})(consensusModel);

module.exports = consensusRanking;