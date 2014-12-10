var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

var gm = require('googlemaps');

require('./models');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());/*
app.use(express.static(path.join(__dirname, 'public')));*/

//Setup rotuing for app
app.use(express.static(__dirname + '/public'));

/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
*/
app.get('/io', function(req, res){
  res.sendFile(__dirname + '/node_modules/socket.io/lib/client.js');
});


//app.use('/test', users);
app.use('/test2', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



var util = require('util'),
twitter = require('twitter');

var twit = new twitter({
    consumer_key: '23A1ZKCUREqzF4hgofUF9y5S1',
    consumer_secret: 'CmRHnTar1IZgB6Apjy8MZ0RjP0YLndTEjuKdxWLHTW5QOfQwVJ',
    access_token_key: '469775685-maTbqIkUARzqIbznx09N5qPvhp1vRH9Xw4CimMrj',
    access_token_secret: '2YBHRa3gT8eIRVIAh9PBZu4rqEaly8Mnn4pooKovumZOV'
});


io.on('connection', function(socket){
    
  twit.stream('statuses/filter',{locations: ['-58.00','-34.96','-57.90','-34.88'] }, function(stream) {
        stream.on('data', function(tweet) {
           if(tweet.coordinates&&tweet.place.country==='Argentina'){
           // console.log(util.inspect(tweet.coordinates));
						
	   						console.log(util.inspect(tweet));
	   						
	   						var newTweet = new db.Tweet(tweet);
	   						
	   						newTweet.save();
	   
	   						outputPoint = {"lat": tweet.coordinates.coordinates[0],"lng": tweet.coordinates.coordinates[1]};

	  							socket.broadcast.emit("twitter-stream", outputPoint);

	 			 				//Send out to web sockets channel.
	  						socket.emit('twitter-stream', outputPoint);

     			 } 
        });
    });

});

/* GET users listing. */
/*app.get('/', function(req, res) {
  
  console.log(util.inspect("ZZZZZZZZZZZZZZZZZZZ"));	
  
	twit.stream('statuses/filter',{locations: ['-58.00','-34.96','-57.90','-34.88'] }, function(stream) {
    stream.on('data', function(tweet) {
      
       console.log('App listening on port 8080');
       
      if(tweet.coordinates&&tweet.place.country==='Argentina'){
           // console.log(util.inspect(tweet.coordinates));
						
	   			console.log(util.inspect(tweet));
	   
	   		outputPoint = {"lat": twt.coordinates.coordinates[0],"lng": twt.coordinates.coordinates[1]};

	  			socket.broadcast.emit("twitter-stream", outputPoint);

	 			 //Send out to web sockets channel.
	  			socket.emit('twitter-stream', outputPoint);

      } 

    });
});  

});
*/

app.get('/test', function(req, res, next) {
  
  	 console.log("YYYYY");
});

app.get('/test2', function(req, res, next) {
  
    console.log("YYYYY");
});

//para grabar en la bd
//twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}, function(stream) {
/*twit.stream('statuses/filter',{locations: ['-58.00','-34.96','-57.90','-34.88'] }, function(stream) {
    stream.on('data', function(tweet) {
      
       console.log('App listening on port 8080');
       
      if(tweet.coordinates&&tweet.place.country==='Argentina'){
           // console.log(util.inspect(tweet.coordinates));
						
	   			console.log(util.inspect(tweet));
	   
	   	// require porque es global
	  		var newTweet = new db.Tweet(tweet);
newTweet.save();
      } 

    });
});
*/
module.exports = app;


/*http.listen(8080, function() {
    console.log('App listening on port 8080');
});*/

http.listen(process.env.PORT || 8080);
