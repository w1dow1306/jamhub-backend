console.clear()
// importing express and mongoose
const express = require("express"); // imprting express
const mongoose = require('mongoose'); //importing mongoose
const bodyparser = require("body-parser"); // bodyparser ( to allow reading formdata)
const User = require('./models/users.js') //User model import
const cors = require('cors') //importing cors


// config
const app = express()
const PORT = 8000;

// using middlewears
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/test') //conecting to database

// COdes
// 1--> User added successfully
// 2--> User removed successfully
// 3-->User already exists
// 4-->Password Incorrect


//Signup functionality


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

async function olduser(user) {
    const x = await User.find({ username: user.username }).countDocuments()
    let msg = ((x > 0) ? 0 : 1);
    return msg
}

app.post("/signup", async (req, res) => {
    let usr = req.body;
    await olduser(usr).then(e => {
        if (e == 1) {
            adduser(usr).then(id => {
                res.json({ "message": "User added successfully", "id": id, code: 1 });
                res.status(200)

            });
        } else {
            res.json({ "message": "The user already exists!", code: 3 });
            res.status(409);
        }
    })
}
);




//Sign in Functionality!!

async function login(user) {
    user = new User(user)
    const olduser = await User.findOne({ username: user.username });
    if (olduser) {
        if (olduser.password == user.password) {
            return ["User logged in!", olduser.id,olduser.username];
        } else {
            return ["Password or Username wrong"];
        }
    } else {
        return ["User is not connected to us!"];
    }
}

app.post("/login", async (req, res) => {
    let msg = await login(req.body)
    console.log(msg)
    if (msg[1]) {
        res.cookie("token", msg[1])
        res.cookie("username",msg[2])
    }
    res.json(msg[0])
    res.status(200)
})

//Logout
app.get("/logout", (req, res) => {
    res.status(200)
    res.redirect("/");
})

app.get("/", async (req, res) => {
    const l = await User.find({});
    res.send(l);
})

//start listening
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});