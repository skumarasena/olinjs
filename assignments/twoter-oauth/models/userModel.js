
var mongoose = require('mongoose');

// I love the references to the mongooseSchema of twotters in the list of twotes
// declaration, nice!
var userSchema = mongoose.Schema({
  oauthID: Number,
  name: String,
  password: String,
  twotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'twote'}]
  //inStock: Boolean,
});


userSchema.methods.verifyPassword = function(password, user) {
  if (user.password === password) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("user", userSchema); 