/**
 * Created by spencerkim on 11/18/16.
 */

/*
 * Model representing a Consensus ranking.
 * key: value pairs are key = title of the consensus and value =
 * the object representing the consensus.
 */

var mongoose = require('mongoose');
// var User = require('/models/Users');
// var Ranking = require('/models/Consensus');


var consensusSchema = mongoose.Schema({

    creator: String,

    title: String,

    rankings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ranking'
    }],

    completed: Boolean,

    public: Boolean
});

var consensusModel = mongoose.model('Consensus', consensusSchema);

var consensusRanking = (function(consensusModel) {
    var that = {};

    //TODO functions


    Object.freeze(that);
    return that;

})(consensusModel);

module.exports = consensusRanking;