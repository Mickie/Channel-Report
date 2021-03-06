
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
   , delegates=require('./utils/delegates')
  , http = require('http')
  , thereporter = require('./routes/getpostswithhighestscore')
  ,AnReporter = require('./routes/getchanneltweets')
  ,MoreReport=require('./routes/showmorecontent')
  ,grabBaseballReport=require('./utils/getResponse')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3002);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get("/MyUrl",thereporter.fetchResults)
app.get("/MyUrl1",AnReporter.test)
app.get("/MyUrl2",MoreReport.morereports)

app.get("/BaseballUrl",grabBaseballReport.getResponse)


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
