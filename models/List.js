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
var ObjectId = require('mongoose').Types.ObjectId

var listSchema = mongoose.Schema({

    title: String,

    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    upvoters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    downvoters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    upvotes: Number,

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


    /**
     * Gets the number of net upvotes the list has.
     * @param listId the id of the list.
     * @param callback
     */
    that.getNumberOfUpvotes = function(listId, callback){
        listModel.findById(listId, function(err, list){
            if(err) callback({msg:err});
            if(list != null) {
                callback(null, list.upvotes);
            } else{
                callback({msg: 'The list does not exist!'});
            }
        });
    };

    /**
     * Gets the list of user_ids that upvoted the list.
     * @param listId the id of the list.
     * @param callback
     */
    that.getUpvoters = function(listId, callback){
        listModel.findById(listId, function(err, list){
            if(err) callback({msg:err});
            if(list != null) {
                callback(null, list.upvoters);
            } else{
                callback({msg: 'The list does not exist!'});
            }
        });
    };

    /**
     * Gets the list of user_ids that downvoted the list.
     * @param listId the id of the list.
     * @param callback
     */
    that.getDownvoters = function(listId, callback){
        listModel.findById(listId, function(err, list){
            if(err) callback({msg:err});
            if(list != null) {
                callback(null, list.downvoters);
            } else{
                callback({msg: 'The list does not exist!'});
            }
        });
    };

    /**
     * Adds a user to the upvoters list of a List.
     * @param listId the id of the list.
     * @param userId the id of the user who has upvoted the List.
     * @param callback
     */
    that.addToUpvoters = function (listId, userId, callback) {
        listModel.findOneAndUpdate(
            {_id : listId}, {$push: { upvoters: userId}, $set: { upvotes: upvotes+1} }, function(err) {
                if (err) callback({msg: err});
                else {

                    callback(null);
                }
            });
    };

    /**
     * Adds a user to the downvoters list of a List.
     * @param listId the id of the list.
     * @param userId the id of the user who has downvoted the List.
     * @param callback
     */
    that.addToDownvoters = function (listId, userId, callback) {
        listModel.findOneAndUpdate(
            {_id : listId}, {$push: { downvoters: userId}, $set: { upvotes: upvotes-1} }, function(err) {
                if (err) callback({msg: err});
                else {
                    callback(null);
                }
            });
    };

    /**
     * Removes a user from the upvoters list of a List.
     * @param listId the id of the list.
     * @param userId the id of the user who has cancelled his upvote from the List.
     * @param callback
     */
    that.removeFromUpvoters = function (listId, userId, callback) {
        listModel.findOneAndUpdate(
            {_id : listId}, {$pull: { upvoters: userId}, $set: { upvotes: upvotes-1} }, function(err) {
                if (err) callback({msg: err});
                else {
                    callback(null);
                }
            });
    };

    /**
     * Removes a user from the downvoters list of a List.
     * @param listId the id of the list.
     * @param userId the id of the user who has cancelled his downvote from the List.
     * @param callback
     */
    that.removeFromDownvoters = function (listId, userId, callback) {
        listModel.findOneAndUpdate(
            {_id : listId}, {$pull: { downvoters: userId}, $set: { upvotes: upvotes+1} }, function(err) {
                if (err) callback({msg: err});
                else {
                    callback(null);
                }
            });
    };

    //pass in consensus object with same fields and same types, make sure they are the same
    //later I will add checks to make sure
    that.createList = function (listObject, callback) {
        var newList = new listModel({
            title : listObject.title,
            creator : listObject.creator,
            creator_id : listObject.creator_id,
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

    /**
     *  Returns a user's lists.
     */
    that.getUserLists = function(user_id, callback) {
        listModel.find({ creator_id:new ObjectId(user_id)}).exec(function(err, result) {
            if (err) callback({ msg: err });
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback({ msg: 'No private consensuses for this user!'})
            }
        });
    };

    /**
     *  Returns lists a user's been invited to.
     */
    that.getInvitedLists = function(username, callback) {
        //WHY WON'T THIS WORK???
        listModel.find({ usersSharedWith:  { $all: [ username] }}).exec(function(err, result) {
            if (err) callback({ msg: err });
            console.log(result);
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback({ msg: 'No lists for this user'})
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

    that.addMoreItems = function(listId, newItems, callback) {
      listModel.findOneAndUpdate(
        {_id : listId}, {$pushAll: {items:newItems} },{upsert:false}, function(err,newList) {
            if (err) callback({msg: err});
            else {
              console.log("Successfully updated");
              console.log(newItems);
              callback(null,newList);
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
