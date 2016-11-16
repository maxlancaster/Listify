var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var webpackDevHelper = require('./hotReload.js');

var app = express();

// Set up webpack-hot-middleware for development, express-static for production
if (process.env.NODE_ENV !== 'production'){
  console.log("DEVELOPMENT: Turning on WebPack middleware...");
  app = webpackDevHelper.useWebpackMiddleware(app);
  app.use('/css', express.static(path.join(__dirname, 'public/css')));
  app.use('/vendor', express.static(path.join(__dirname, 'public/vendor')));
} else {
  console.log("PRODUCTION: Serving static files from /public...");
  app.use(express.static(path.join(__dirname, 'public')));
}
// Set up some middleware to use.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
});
app.listen((process.env.PORT || 3000), function() {
  console.log("Listening for port");
});

// Export our app (so that tests and bin can find it)
module.exports = app;
