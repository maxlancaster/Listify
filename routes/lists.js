var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Rankings = require('../models/Ranking');
var Items = require('../models/Items');
var List = require('../models/List');
var Users = require('../models/Users');
// var rankingServices = require('../services/rankingServices');


/**
 * Get all rankings created by the currently logged in user.
 */

// /rankings should just load the createRankingsPage via clientRoutes.jsx

// router.get('/', function(req, res){
    // Consensus.getUserPrivateLists(req.currentUser.username, function(err, consensuses){
    //     if(err){
    //         utils.sendSuccessResponse(res, { rankings : [] });
    //     } else {
    //         utils.sendSuccessResponse(res, { rankings : rankings});
    //     }
    // })
// });


// initial creation of the Consensus entry and the Ranking entry by the creator
router.post('/create', function(req, res) {
    var listObject = {
        title : req.body.content.title,
        creator : req.session.username,
        items : req.body.content.items,
        rankings : [],
        isPublic : req.body.content.isPublic,
        upvotes : 0,
        locked : false,
        maxLength : 5,
        usersSharedWith : []
    };
    List.createList(listObject, function(err, list) {
        if (err) {
            console.log(err);
            utils.sendErrorResponse(res, 500, err);
        } else {
            utils.sendSuccessResponse(res, list);
        }
    });

});

/**
 * Gets the consensus to allow non-creator users to post responses to
 */
router.get('/find/:listId', function(req, res){
    List.getListById(req.params.listId, function(err, list){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such list.');
        } else {
            utils.sendSuccessResponse(res, {list : list});
        }
    })
});

router.post('/search/:searchString', function(req, res){
    List.search(req.params.searchString, function(err, lists){
      if(err){
          utils.sendErrorResponse(res, 500, err);
      } else {
          utils.sendSuccessResponse(res, {lists : lists});
      }
    })
});


router.get('/most_recent', function(req, res) {
  List.getPublicLists(function(err, lists) {
    if(err){
        utils.sendErrorResponse(res, 500, err);
    } else {
        utils.sendSuccessResponse(res, {lists : lists});
    }
  });
});


router.get('/trending', function(req, res) {
  List.getTrendingLists(function(err, lists) {
    if(err){
        utils.sendErrorResponse(res, 500, err);
    } else {
        utils.sendSuccessResponse(res, {lists : lists});
    }
  });
});


module.exports = router;
