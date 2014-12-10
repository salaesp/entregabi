 
// models/Tweet.js
 
module.exports = function(mongoose) {
 
  var Schema = mongoose.Schema;
 
  // Objeto modelo de Mongoose
  var TweetSchema = new Schema({
 
    // Propiedad nombre
    created_at : Date, // tipo de dato cadena de caracteres
 
    // Propiedad fecha de nacimiento
    text : String, // tipo de dato fecha
 
    coordinates : Object, // tipo de dato buleano
    
    retweet_count : String
 
  });
 

 
  return mongoose.model('Tweet', TweetSchema);
}