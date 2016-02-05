var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
  name: String,
  age: Number, 
  color: String
});

module.exports = mongoose.model("cat", catSchema); 
// This looks great!
// What do you think you'd do if you wanted to let cats to have multiple colors?
