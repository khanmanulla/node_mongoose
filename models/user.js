const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  email: String
});

module.exports = model('User', userSchema);
