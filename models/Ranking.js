
/*
 * Model representing a Ranking.
 * key: value pairs are key = title of the ranking and value =
 * the object representing the ranking.
 */

var mongoose = require('mongoose');
var Items = require('../models/Items');
var Consensus = require('../models/Consensus');


var rankingSchema = mongoose.Schema({

    //order in ranking is the order that it is preferred
    items: [{}],

    user: String,

    consensusRanking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consensus'
    }
});


var rankingModel = mongoose.model('Ranking', rankingSchema);

var Rankings = (function(rankingModel) {

    var that = {};

    //add an item to a ranking, item parameter should be passed in as {title: string, ranking: number}
    that.addItemToRanking = function (item, rankingId, callback) {

        rankingModel.findOne({ _id: rankingId }, function(err, ranking) {
            if (err) callback({ msg: err });
            if (ranking != null) {

                //TODO create item, add to ranking's item list

            } else {
                callback({ msg: 'The ranking does not exist!'});
            }

        });
    };

    //expect in the same form as schema above
    that.addRanking = function (ranking, callback) {

        var ranking = new rankingModel({
            items: ranking.items,
            user: ranking.user,
            consensusRanking: ranking.consensusRanking
        });

        ranking.save(function (err, newRanking) {
            if (err) callback({ msg: err});
            callback(null, newRanking);

        })
    };


    //returns the id of the Consensus object that a given ranking refers to
    that.getConsensusByRankingId = function (rankingId, callback) {
        rankingModel.findById(rankingId, function (err, ranking) {
            if (err) callback({ msg: err });
            if (ranking != null) {
                callback(null, ranking.consensusRanking);
            } else {
                callback({ msg: 'The ranking does not exist!'});
            }
        })
    };

    //get a ranking object by its ID
    that.getRankingByID = function (rankingId, callback) {
        rankingModel.findById(rankingId, function (err, ranking) {
            if (err) callback({ msg: err });
            if (ranking !== null) {
                callback(null, ranking);
            } else {
                callback({ msg: 'This ranking does not exist!' });
            }
        });
    };


    Object.freeze(that);
    return that;

})(rankingModel);

module.exports = Rankings;
