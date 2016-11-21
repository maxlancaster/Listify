const uuid = require('uuid');
/**
 * Created by phillipou on 11/20/16.
 */

/*
 * Model representing an Item
 */
 var Item = function(title, description, photo) {
   var that = Object.create(Item.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
 }

module.exports = Item;
