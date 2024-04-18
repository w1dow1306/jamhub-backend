const { Schema,default:mongoose } = require("mongoose");
const userschema = new Schema({
    name: String,
    username: String,
    id: String,
    password: String,
    email: String,
})
const User = mongoose.model('User', userschema);
module.exports = User;