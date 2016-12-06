const uuid = require('uuid');

var Comment = function(text, username) {
   var that = Object.create(Comment.prototype);
   that.id = uuid.v1();
   that.text = text;
   that.username = username;
   Object.freeze(that);
   return that;
};

module.exports = Comment;
