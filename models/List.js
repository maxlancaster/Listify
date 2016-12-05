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

    //Helps with the consensus updating, TODO make sure this works!
    /**
     * Gets rankings owned by a list
     * @param listId
     * @param callback
     */
    that.getRankings = function (listId, callback) {
        listModel.findById(listId, function (err, list) {
            if (err) callback({ msg: err });
            if (list != null) {
                callback(null, list.rankings);
            } else {
                callback({ msg: 'The list does not exist!'});
            }
        });
    };



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
    };

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
