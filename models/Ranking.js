
/*
 * Model representing a Ranking.
 * key: value pairs are key = title of the ranking and value =
 * the object representing the ranking.
 */

var mongoose = require('mongoose');
var Items = require('../models/Items');
var List = require('../models/List');


var rankingSchema = mongoose.Schema({

    //order in ranking is the order that it is preferred
    order: [{}],

    user: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    },

    comment: String
});


var rankingModel = mongoose.model('Ranking', rankingSchema);

var Rankings = (function(rankingModel) {

    var that = {};

    that.getAllRankingsForSingleList = function (listId, callback) {
        rankingModel.find({ list: listId })
            .exec(function (err, rankings) {
                if (err) callback({ msg: err });
                if (rankings != null) {
                    callback(null, rankings);
                } else {
                    callback({ msg: 'No rankings for this list!'})
                }
            })
    };

    //add an item to a ranking, item parameter should be passed in as {title: string, ranking: number}
    that.addItemToRanking = function (item, rankingId, callback) {

        rankingModel.findByIdAndUpdate(
            rankingId,
            {$push: {"order": {title: item.title, rank: item.rank}}},
            function (err, ranking) {
                if (err) callback({ msg: err });
                callback(null, ranking);
            }
        )
    };

    //expect in the same form as schema above
    that.addRanking = function (ranking, callback) {

        var ranking = new rankingModel({
            order: ranking.order,
            user: ranking.user,
            list: ranking.list,
            user_id: ranking.user_id,
            comment: ranking.comment
        });

        ranking.save(function (err, newRanking) {
            if (err) callback({ msg: err});
            else {
                // rankingModel.find({}).exec(function(error, ranking) {
                //     console.log("ranking created! : " + JSON.stringify(ranking, null, '\t'));
                // });
                callback(null, newRanking);
            }
        })
    };

    //returns the id of the Consensus object that a given ranking refers to
    that.getListByRankingId = function (rankingId, callback) {
        rankingModel.findById(rankingId, function (err, ranking) {
            if (err) callback({ msg: err });
            if (ranking != null) {
                callback(null, ranking.list);
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
