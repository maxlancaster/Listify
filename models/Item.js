/**
 * Created by phillipou on 11/20/16.
 */

/*
 * Model representing an Item
 */

var mongoose = require('mongoose');
// var User = require('/models/Users');
// var Ranking = require('/models/Consensus');

var itemSchema = mongoose.Schema({

    title: String,
    description: String,
    photo: String
});

var itemSchema = mongoose.model('Item', consensusSchema);

var itemModel = (function(itemSchema) {
    var that = {};
    Object.freeze(that);
    return that;

})(itemModel);

module.exports = itemModel;
