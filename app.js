var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: '23A1ZKCUREqzF4hgofUF9y5S1',
    consumer_secret: 'CmRHnTar1IZgB6Apjy8MZ0RjP0YLndTEjuKdxWLHTW5QOfQwVJ',
    access_token_key: '469775685-maTbqIkUARzqIbznx09N5qPvhp1vRH9Xw4CimMrj',
    access_token_secret: '2YBHRa3gT8eIRVIAh9PBZu4rqEaly8Mnn4pooKovumZOV'
});

twit.verifyCredentials(function(data) {
        console.log(util.inspect(data));
    });


twit.stream('statuses/sample', function(stream) {
    stream.on('data', function(data) {
        console.log(util.inspect(data));
    });
});