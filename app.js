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

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/io', function(req, res){
  res.sendFile(__dirname + '/node_modules/socket.io/lib/client.js');
});


app.use('/users', users);

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
    twit.stream('statuses/sample', function(stream) {
        stream.on('data', function(tweet) {
            if(tweet.coordinates){
                io.emit('chat message', tweet);
            }
        });
    });
});

/* GET users listing. */
app.get('/tweets', function(req, res) {
    twit.stream('statuses/sample', function(stream) {
        stream.on('data', function(tweet) {
            if(tweet.coordinates){
                res.json(util.inspect(tweet.coordinates));
            }
        });
    });
});

module.exports = app;



http.listen(8080, function() {
    console.log('App listening on port 8080');
});
