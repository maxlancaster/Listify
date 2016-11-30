var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Rankings = require('../models/Ranking');
var Items = require('../models/Items');
var List = require('../models/List');
var Users = require('../models/Users');
// var rankingServices = require('../services/rankingServices');


/**
 * Requires authentication on all access to logged-in Listify features.
 */
var requireAuthentication = function(req, res, next) {
    if (!req.currentUser){
        utils.sendErrorResponse(res, 403, 'Please log in to use this feature.');
    } else {
        next();
    }
};


/**
 * Requires ownership whenever accessing a particular ranking.
 */
var requireRankingOwnership = function(req, res, next) {
    if (!(req.currentUser.username === req.body.ranking.user)) {
        utils.sendErrorResponse(res, 400, 'Please make well-formed requests.');
    } else{
        next();
    }
};


/**
* Requires ownership whenever accessing a particular consensus.
*/
var requireListOwnership = function(req, res, next) {
    if (!(req.currentUser.username === req.body.list.creator)) {
        utils.sendErrorResponse(res, 400, 'Please make well-formed requests.');
    } else{
        next();
    }
};

/*
 For create requests, require that the request body
 contains a 'content' field. Send error code 400 if not.
 */
var requireContent = function(req, res, next) {
    if (!req.body.content) {
        utils.sendErrorResponse(res, 400, 'Content required in request.');
    } else {
        next();
    }
};


// Register the middleware handlers above.
router.get('/', requireAuthentication);
router.get('/:listId', requireAuthentication);
router.post('/lock/:listId', requireAuthentication);
router.post('*', requireContent);

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


/**
 * Returns
 */

router.get('/:consensus_id', function(req, res){
    List.getListById(req.params.listId, function(err, list){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such list.');
        } else{
            utils.sendSuccessResponse(res, { list : list});
        }
    })
});

/**
 * Locks the consensus.
 */
router.post('/lock/:listId', function(req, res){
    List.getListById(req.params.listId, function(err, list){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such list.');
        } else{
            utils.sendSuccessResponse(res, { list : list});
        }
    })
});

// initial creation of the Consensus entry and the Ranking entry by the creator
router.post('/edit', function(req, res) {
    var listObject = {
        creator : req.session.username,
        title : req.body.content.title,
        order : req.body.content.all_items
    };
    List.createList(listObject, function(err, list) {
        if (err) {
            utils.sendErrorResponse(res, 500, err);
        } else {
            var rankingData = {
                order: req.body.content.submitted_items,
                user: req.session.username,
                list: list._id
            };
            Rankings.addRanking(rankingData, function(err, ranking){
                if (err) {
                    utils.sendErrorResponse(res, 500, err);
                } else {
                    List.updateRankingsArray(list._id, ranking._id, function(err){
                        if (err) {
                            utils.sendErrorResponse(res, 500, err);
                        } else {
                            utils.sendSuccessResponse(res);
                        }
                    })
                }
            });
        }
    });

});

/**
 * Gets the consensus to allow non-creator users to post responses to
 */
router.get('/edit/:listId', function(req, res){
    List.getListById(req.params.listId, function(err, list){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such consensus.');
        } else {
            // load the edit page
            // rankingServices.loadEditPage(consensus);
            utils.sendSuccessResponse(res, {list : consensus});

            // Tweets.findTweetsByUser(req.params.username, function(err, tweets) {
            //     if (err) {
            //       Users.findUser(req.params.username, function(err, username) {
            //         if (err) {
            //           utils.sendErrorResponse(res, 404, err.msg);
            //         } else {
            //           utils.sendSuccessResponse(res, { tweets: [] });
            //         }
            //       });
            //     } else {
            //       utils.sendSuccessResponse(res, { tweets: tweets });
            //     }
            //   });


            // if(!(req.currentUser.username === consensus.creator)){
            //     var rankingData = {
            //         items: req.body.content.submitted_items,
            //         user: req.session.username,
            //         consensusRanking: consensus._id
            //     };
            //     Rankings.addRanking(rankingData, function(err, ranking){
            //         if (err) {
            //             utils.sendErrorResponse(res, 500, err);
            //         } else {
            //             utils.sendSuccessResponse(res);
            //         }
            //     });
            // } else {
            //     console.log(req.currentUser.username);
            //     console.log(consensus.creator);
            // }
        }
    })
});

module.exports = router;