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
    console.log("AUTHENTICATION REQUIRED!");
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
router.get('/', requireAuthentication);
router.get('/:consensusID', requireAuthentication);
router.post('/lock/:consensusID', requireAuthentication);
router.post('*', requireContent);

/**
 * Get all rankings created by the currently logged in user.
 */
router.get('/', function(req, res){
    Consensus.getUserPrivateConsensuses(req.currentUser.username, function(err, consensuses){
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

router.get('/:consensusID', function(req, res){
    Consensus.getConsensusById(req.params.consensusID, function(err, consensus){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such consensus.');
        } else{
            utils.sendSuccessResponse(res, { consensus : consensus});
        }
    })
});

/**
 * Locks the consensus.
 */
router.post('/lock/:consensusID', function(req, res){
    Consensus.getConsensusById(req.params.consensusID, function(err, consensus){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such consensus.');
        } else{
            utils.sendSuccessResponse(res, { consensus : consensus});
        }
    })
});

// initial creation of the Consensus entry and the Ranking entry by the creator
router.post('/edit', function(req, res) {
    console.log(req.body.content);
    var consensusObject = {
        creator : req.session.username,
        title : req.body.content.title,
        items : req.body.content.all_items
    };
    Consensus.createConsensus(consensusObject, function(err, consensus) {
        if (err) {
            utils.sendErrorResponse(res, 500, err);
        } else {
            var rankingData = {
                items: req.body.content.submitted_items,
                user: req.session.username,
                consensusRanking: consensus._id
            };
            Rankings.addRanking(rankingData, function(err, ranking){
                if (err) {
                    utils.sendErrorResponse(res, 500, err);
                } else {
                    Consensus.updateRankingsArray(consensus._id, ranking._id, function(err){
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
router.get('/edit/:consensusID', function(req, res){
    Consensus.getConsensusById(req.params.consensusID, function(err, consensus){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such consensus.');
        } else{
            if(!req.body.currentUser.username === consensus.creator){
                var rankingData = {
                    items: req.body.content.submitted_items,
                    user: req.session.username,
                    consensusRanking: consensus._id
                };
                Rankings.addRanking(rankingData, function(err, ranking){
                    if (err) {
                        utils.sendErrorResponse(res, 500, err);
                    } else {
                        utils.sendSuccessResponse(res);
                    }
                });
            }
        }
    })
});

module.exports = router;