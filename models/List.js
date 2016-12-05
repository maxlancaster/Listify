/**
 * Created by spencerkim on 11/18/16.
 */

/*
 * Model representing a Consensus ranking.
 * key: value pairs are key = title of the consensus and value =
 * the object representing the consensus.
 */

var mongoose = require('mongoose');
var Ranking = require('../models/Ranking');
var Items = require('../models/Items');

var listSchema = mongoose.Schema({

    title: String,

    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    creator: String,

    description: String,

    items : [],

    // giving me validation error. why?!

    // items: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Items'
    // }],

    rankings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ranking'
    }],

    isPublic: Boolean,

    upvotes: Number,

    locked: Boolean,

    maxLength: Number,

    usersSharedWith: [String]

}, { timestamps: true });

var listModel = mongoose.model('List', listSchema);


var list = (function(listModel) {

    var that = {};


    //TODO: this does not work yet, fix once max finishes ranking submissions
    /**
     * Updates the consensus overallRanking (called when a ranking is submitted) according to the following algorithm:
     *
     * For a consensus, find the rankings assocaited with it, where each individual ranking is a list of items (first is the best, last is the worst).
     * Each item occurs in every list at various indices.
     * For each item, sum up the value of the indices where it is placed in each list.
     * Rank all the items by this sum, where the lowest sum is ranked first.
     * should be simple enough and will work well enough for the MVP. Thoughts?
     * @param listId
     * @param callback
     */
    // that.updateList = function (listId, callback) {
    //
    //     //search for all the rankings with a given consensusId
    //     Ranking.getAllRankingsForSingleList(listId, function (err, rankings) {
    //         if (err) callback({ msg: err });
    //         if (rankings != null) {
    //
    //             //keeps track of the sums for all items
    //             var sums = {};
    //
    //             //find the sums
    //             rankings.forEach(function (object) {
    //                 var items = object.order;
    //                 items.forEach(function (item) {
    //                     if (!(item in sums)) {
    //                         sums[item] = items.indexOf(item);
    //                     } else {
    //                         sums[item] += items.indexOf(item);
    //                     }
    //                 });
    //             });
    //
    //             //create a list of the sums in increasing order
    //             var new_ranking = Object.keys(sums).reduce(function(a, b){ return sums[a] < sums[b] ? a : b });
    //
    //             //make sure that the list is only object IDs so we can add it to the schema
    //             var returnRanking = [];
    //             new_ranking.forEach(function (item) {
    //                 returnRanking.push(item._id)
    //             });
    //
    //             //assign the new list to the overallRanking field
    //             listModel.findById(listId, function (err, list) {
    //                 if (err) callback({ msg: err });
    //                 if (list != null) {
    //                     list.overallRanking = returnRanking;
    //                     callback(null, list);
    //                 } else {
    //                     callback({ msg: 'The consensus does not exist!'});
    //                 }
    //             });
    //
    //         } else {
    //             callback({ msg: 'No rankings!'});
    //         }
    //     });
    // };


    //pass in consensus object with same fields and same types, make sure they are the same
    //later I will add checks to make sure
    that.createList = function (listObject, callback) {
        var newList = new listModel({
            title : listObject.title,
            creator : listObject.creator,
            items : listObject.items,
            rankings : listObject.rankings,
            isPublic : listObject.isPublic,
            upvotes : listObject.upvotes,
            locked : listObject.locked,
            maxLength : listObject.maxLength,
            description : listObject.description,
            usersSharedWith : listObject.usersSharedWith
        });

        newList.save(function(err, list) {
            if (err) callback({ msg: err}, null);
            else {
                callback(null, list);
            }
        });
    };

    //lock a consensus by its ID
    that.lockList = function (listId, callback) {
        listModel.findById(listId, function (err, list) {
            if (err) callback({ msg: err });
            if (list != null) {
                list.locked = true;
                list.save(function(err) {
                    if (err) callback({ msg: err});
                    callback(null);
                });


            } else {
                callback({ msg: 'The list does not exist!'});
            }
        });
    };

    that.getPublicLists = function(callback) {
        listModel.find({}).find({ isPublic: true }).sort({createdAt: -1}).exec(function(err, result) {
            if (err) callback({ msg: err });
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback({ msg: 'No public lists!'})
            }
        });
    };

    that.getTrendingLists = function(callback) {
      listModel.find({}).find({ isPublic: true }).sort({upvotes: -1}).limit(25).exec(function(err, result) {
          if (err) callback({ msg: err });
          if (result.length > 0) {
              callback(null, result);
          } else {
              callback({ msg: 'No public lists!'})
          }
      });
    }

    /**
     *  Returns a user's private consensuses.
     */
    that.getUserPrivateLists = function(username, callback) {
        listModel.find({ creator:username, isPublic: true }).exec(function(err, result) {
            if (err) callback({ msg: err });
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback({ msg: 'No private consensuses for this user!'})
            }
        });
    };

    // add the id rankingId to the Consensus document with _id consensusId
    that.updateRankingsArray = function (listId, rankingId, callback) {
        listModel.findOneAndUpdate(
            {_id : listId}, {$push: { rankings: rankingId} }, function(err) {
                if (err) callback({msg: err});
                else {
                    callback(null);
                }
        });
    };

    that.search = function(searchString, callback) {
      listModel.find({ "title": { "$regex": new RegExp(searchString, "i")} }).exec(function(err, result) {
        if (err) callback({ msg: err });
        if (result !== null) {
            callback(null, result);
        } else {
            callback(null, []);
        }
      });
    }

    /**
     * Returns a consensus from its id.
     */
    that.getListById = function (listId, callback) {
        listModel.findById(listId, function (err, list) {
            if (err) callback({ msg: err }, null);
            if (list != null) {
                callback(null, list);
            } else {
                callback({ msg: 'The list does not exist!'});
            }
        })
    };


    Object.freeze(that);
    return that;

})(listModel);

module.exports = list;
