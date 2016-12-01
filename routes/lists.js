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
    console.log(req.body.content);
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
            utils.sendSuccessResponse(res);
        }
    });

});

module.exports = router;