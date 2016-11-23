/**
 * Created by spencerkim on 11/18/16.
 */

/*
 * Model representing a Consensus ranking.
 * key: value pairs are key = title of the consensus and value =
 * the object representing the consensus.
 */

var mongoose = require('mongoose');
var Ranking = require('/models/Consensus');
var Items = require('/models/Items');

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

    }]

});

var consensusModel = mongoose.model('Consensus', consensusSchema);

var consensusRanking = (function(consensusModel) {

    var that = {};

    //lock a consensus by its ID
    that.lockConsensus = function (consensusId, callback) {
        consensusModel.findById(consensusId, function (err, consensus) {
            if (err) callback({ msg: err });
            if (consensus != null) {
                consensus.completed = true;
                consensus.save();
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