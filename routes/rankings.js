var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Rankings = require('../models/Ranking');
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
router.get('/', requireAuthentication);
router.get('/:consensusID', requireAuthentication);
router.post('/lock/:consensusID', requireAuthentication);
router.post('*', requireContent);



/**
 * Get all ranking consensuses created by the currently logged in user.
 */
router.get('/', function(req, res){
    Consensus.getUserPrivateConsensuses(req.currentUser.username, function(err, consensuses){
        if(err){
            utils.sendSuccessResponse(res, { consensuses : [] });
        } else {
            utils.sendSuccessResponse(res, { consensuses : consensuses});
        }
    })
});


/**
 * Get a specific consensus by its id.
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

/**
 * Gets the consensus to allow non-creator users to post responses to
 */
router.get('/edit/:consensusID', function(req, res){
    Consensus.getConsensusById(req.params.consensusID, function(err, consensus){
        if(err){
            utils.sendErrorResponse(res, 404, 'No such consensus.');
        } else{
            if(!req.body.currentUser.username === consensus.creator){
                utils.sendSuccessResponse(res, { consensus : consensus});
            }
        }
    })
});
































