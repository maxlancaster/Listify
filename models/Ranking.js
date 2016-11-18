
/*
 * Model representing a Ranking.
 * key: value pairs are key = title of the ranking and value =
 * the object representing the ranking.
 */

var mongoose = require('mongoose');
// var User = require('/models/Users');
// var Consensus = require('/models/Consensus');


var rankingSchema = mongoose.Schema({

    title : String,

    //TODO if we arent storing items in database what do i put here
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],

    user: String,

    consensusRanking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consensus'
    },

    order: {}

});

var rankingModel = mongoose.model('Ranking', rankingSchema);

var Rankings = (function(rankingModel) {
    var that = {};

    //TODO functions


    Object.freeze(that);
    return that;

})(rankingModel);

module.exports = Rankings;