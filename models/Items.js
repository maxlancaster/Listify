const uuid = require('uuid');

var Items = function(title, description, photo) {
   var that = Object.create(Items.prototype);
   that.id = uuid.v1();
   that.title = title;
   that.description = description;
   that.photo = photo;
   Object.freeze(that);
   return that;
};

module.exports = Items;
