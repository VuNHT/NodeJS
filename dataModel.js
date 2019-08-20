const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: String,
  document: String,
  price: String
});

module.exports = mongoose.model('data-1', userSchema)
