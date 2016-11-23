var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Rankings = require('../models/Ranking');
var Items = require('../models/Items');
var Consensus = require('../models/Consensus');
var Users = require('../models/Users');


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
var requireConsensusOwnership = function(req, res, next) {
    if (!(req.currentUser.username === req.body.consensus.creator)) {
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
router.all('*', requireAuthentication);
router.post('*', requireContent);

/**
 * Get all rankings created by the currently logged in user.
 */
router.get('/', function(req, res){
    Users.getAllRankings(req.currentUser.username, function(err, rankings){
        if(err){
            utils.sendSuccessResponse(res, { rankings : [] });
        } else {
            utils.sendSuccessResponse(res, { rankings : rankings});
        }
    })
});


/**
 * Returns
 */
router.get('/:rankingId', function(req, res) {
    Rankings.getConsensusByRankingId(req.params.rankingId, function(err, ranking) {
        if (err) {
            Rankings.getRankingByID(req.params.rankingID, function(err, ranking){
                if(err){
                    utils.sendErrorResponse(res, 404, 'No such ranking.');
                } else{
                    utils.sendSuccessResponse(res, { ranking : ranking });
                }
            });
        } else {

            Users.getAllConsensusRankings(req.currentUser.username, function(err, consensus){
                if(err){
                    utils.sendErrorResponse(res, 404, 'No such consensus.');
                } else {

                    utils.sendSuccessResponse(res, { ranking : ranking });
                }
            })

        }
    });
});

router.post('/edit', function(req, res) {
    console.log(req.body.content);
    var consensusObject = {
        creator : req.session.username,
        title : req.body.content.title,
        items : req.body.content.items
    };
    Consensus.createConsensus(consensusObject, function(err) {
        if (err) {
            utils.sendErrorResponse(res, 500, err);
        } else {
        }
    });

});

module.exports = router;