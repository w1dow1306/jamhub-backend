const { mongoose,Schema } = require("mongoose");

const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true 
    },
    id: String,
    password: String,
    email: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userschema);
module.exports = User;
