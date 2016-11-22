

/*
 * Model representing a Item.
 * key: value pairs are key = title of the ranking and value =
 * the object representing the item.
 */

var mongoose = require('mongoose');
// var User = require('/models/Users');
// var Consensus = require('/models/Consensus');

var itemSchema = mongoose.Schema({

    title: String

});

var itemModel = mongoose.model('Items', itemSchema);

var Items = (function(itemModel) {
    var that = {};



    Object.freeze(that);
    return that;

})(itemModel);

module.exports = Items;
