const mongoose = require('mongoose');
let { Schema} = mongoose
let passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({
  username: String,
  password: String
})
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema)
