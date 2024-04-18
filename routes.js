const express = require('express')
const router = express.Router()
const User = require('./models/users.js')
console.log("Routes loaded")


router.get('/', (req, res) => {
    res.send('GET /users - Get all users');
});

router.post('/signup', async (req, res) => {
    let usr = req.body;
    await olduser(usr).then(e => {
        if (e == 1) {
            adduser(usr).then(id => {
                res.cookie("u_id", id);
                res.json({ "message": "User added successfully", "id": id });
                res.status(200)
            });
        } else {
            res.clearCookie('u_id')
            res.json({ "message": "The user already exists!" });
            res.status(409);
        }
    })
})
module.exports = router




async function olduser(user) {
    const x = await User.find({ username: user.username }).countDocuments()
    let msg = ((x > 0) ? 0 : 1);
    return msg
}








async function adduser(user) {
    let n = 1;
    while (n !== 0) {
        n = await User.find({ id: user.id }).countDocuments()
        user.id = Math.floor(Math.random() * 1000).toString() + (new Date().getSeconds());
    }
    const newuser = new User(user)
    const id = await newuser.save();
    return (id.id)
}