/*var util = require('util'),
twitter = require('twitter');
var twit = new twitter({
	consumer_key: '23A1ZKCUREqzF4hgofUF9y5S1',
	consumer_secret: 'CmRHnTar1IZgB6Apjy8MZ0RjP0YLndTEjuKdxWLHTW5QOfQwVJ',
	access_token_key: '469775685-maTbqIkUARzqIbznx09N5qPvhp1vRH9Xw4CimMrj',
	access_token_secret: '2YBHRa3gT8eIRVIAh9PBZu4rqEaly8Mnn4pooKovumZOV'
});


*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res) {
   //console.log("222222222YYYYY");
  db.Tweet.find().limit().exec(function (error, twt) {
     // console.log(twt);
  });
});*/

router.get('/', function(req, res) {
  
  var val = req.query.search;

  console.log("criterio: "+val);
  
  //{"text": new RegExp('acme.*'+val) },
  
  db.Tweet.find( function ( err, todos, count ){
    console.log(todos);
    res.send( todos );
  });
  
 /* var result = db.Tweet.find({"text":/val/});
  console.log("resultado: "+result.toSource());
  res.send( result );
  */
});

module.exports = router;
