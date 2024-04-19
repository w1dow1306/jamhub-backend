/////?? User related functions
const User = require('../models/users');

exports.olduser = async function olduser(user) {
    ///checks if the user already exists;
    const x = await User.find({ username: user.username }).countDocuments()
    let msg = ((x > 0) ? 0 : 1);
    return msg
}



exports.adduser = async function adduser(user) {

    //add user function
    let n = 1;
    while (n !== 0) {
        n = await User.find({ id: user.id }).countDocuments()
        user.id = Math.floor(Math.random() * 1000).toString() + (new Date().getSeconds());
    }
    const newuser = new User(user)
    const id = await newuser.save();
    return (id.id)
}


exports.login = async function login(user) {
    //login
    user = new User(user)
    const olduser = await User.findOne({ username: user.username });
    if (olduser) {
        if (olduser.password == user.password) {
            return ["User logged in!", olduser.id, olduser.username,1];
        } else {
            return ["Password or Username wrong",2];
        }
    } else {
        return ["User is not connected to us!",2];
    }
}