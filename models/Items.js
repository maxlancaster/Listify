var mongoose = require('mongoose');
// var User = require('/models/Users');
// var Consensus = require('/models/Consensus');

var itemSchema = mongoose.Schema({
    title: String,
    rank: Number
});


var itemsModel = mongoose.model('Items', itemSchema);

var Items = (function(itemsModel) {

    var that = {};

    that.createItem = function (item, callback) {
        var newItem = {
            title: item.title,
            rank: item.rank
        };

        newItem.save(function (err, itemReturned) {
            if (err) callback({ msg: err});
            callback(null, itemReturned);
        })
    };


    Object.freeze(that);
    return that;

})(itemsModel);

module.exports = Items;
