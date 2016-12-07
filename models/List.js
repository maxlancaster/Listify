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
var ObjectId = require('mongoose').Types.ObjectId;

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

    that.upvote = function(listId,userId, callback) {
      listModel.findById(listId, function(err, list){
          if(err) callback({msg:err});
          if(list != null) {
            var downvoters = list.downvoters ? list.downvoters : [];
            var downvoteIndex = downvoters.indexOf(userId);

            if (downvoteIndex > -1) {
              downvoters.splice(downvoteIndex,1);
            }

            var upvoters = list.upvoters ? list.upvoters : [];
            var upvoteIndex = upvoters.indexOf(userId);
            if (upvoteIndex === -1) {
              upvoters.push(userId);
            }

            var upvotes = upvoters.length - downvoters.length;

            listModel.update({_id:list._id},
                            {upvoters:upvoters,downvoters:downvoters, upvotes:upvotes},
                            {upsert:true, new:true},
                            function(error, newList) {
                              if (!error) {
                                console.log(newList);
                                callback(null, newList);
                              } else {
                                console.log(error);
                                calback(error,null);
                              }
                            }
                          );
          } else{
              callback({msg: 'The list does not exist!'});
          }
      });
    }

    that.downvote = function(listId,userId, callback) {
      listModel.findById(listId, function(err, list){
          if(err) callback({msg:err});
          if(list != null) {
            var downvoters = list.downvoters ? list.downvoters : [];
            var downvoteIndex = downvoters.indexOf(userId);

            if (downvoteIndex === -1) {
              downvoters.push(userId);
            }

            var upvoters = list.upvoters ? list.upvoters : [];
            var upvoteIndex = upvoters.indexOf(userId);
            if (upvoteIndex > -1) {
              upvoters.splice(upvoteIndex,1);
            }

            var upvotes = upvoters.length - downvoters.length;

            listModel.update({_id:list._id},
                            {upvoters:upvoters,downvoters:downvoters, upvotes:upvotes},
                            {upsert:true, new:true},
                            function(error, newList) {
                              if (!error) {
                                callback(null, newList);
                              } else {
                                console.log(error);
                                calback(error,null);
                              }
                            }
                          );
          } else{
              callback({msg: 'The list does not exist!'});
          }
      });
    }

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
      listModel.find().exec(function(err, result) {
        if (err) callback({ msg: err });
        //TODO: FIND PROPER WAY TO QUERY
        var invitedLists = result.filter(function(list) {
          return list.usersSharedWith.indexOf(username) > -1;
        });
        if (invitedLists.length > 0) {
            callback(null, invitedLists);
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

    that.getRankingByUserId = function (userId, listId, callback) {
        listModel.findById(listId, function (err, list) {
            if (err) callback({ msg: err }, null);
            if (list != null) {
                var rankings = list.rankings;

            } else {
                callback({ msg: 'The list does not exist!'});
            }
        })
    }


    Object.freeze(that);
    return that;

})(listModel);

module.exports = list;
