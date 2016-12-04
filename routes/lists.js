var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Rankings = require('../models/Ranking');
var Items = require('../models/Items');
var List = require('../models/List');
var Users = require('../models/Users');
// var rankingServices = require('../services/rankingServices');


// initial creation of the Consensus entry and the Ranking entry by the creator
router.post('/create', function(req, res) {
    console.log(req.session);
    var listObject = {
        title : req.body.content.title,
        creator : req.session.user.username,
        creator_id:req.session.user._id,
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
            var user_id = req.session.user._id;
            Users.hasCreatedList(user_id, list, function(err, user) {
                req.session.user.lists.push(list._id);
                utils.sendSuccessResponse(res, list);
            });
        }
    });

});

/**
 * Gets the ordering for the list based on the rankings submitted thus far
 */
router.get('/:listId', function (req, res) {
    List.updateList(req.params.listId, function (err, list) {
        if(err){
            utils.sendErrorResponse(res, 404, 'No such list.');
        } else {
            utils.sendSuccessResponse(res, {list : list});
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

router.put('/lock/:listId', function(req, res) {
    List.lockList(req.params.listId, function(err) {
        if(err){
            utils.sendErrorResponse(res, 404, 'No such list.');
        } else {
            utils.sendSuccessResponse(res);
        }
    });
});



module.exports = router;
