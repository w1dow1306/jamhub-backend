// const express = require("express");
// const { Schema } = require("mongoose");
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test')
// const bodyparser = require("body-parser");
// const app = express();
// console.clear()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));




// const userschema = new Schema({
//     name: String,
//     username: String,
//     id: String,
//     password: String,
//     email: String,
// })
// const User = mongoose.model('User', userschema);


// async function login(user){
//      user = new User(user)
//     const olduser = await User.findOne({ username: user.username });
//     // console.log(olduser.username)
//     if (olduser) {
//         if (olduser.password == user.password) {
//             return ["User logged in!", olduser.id];
//         } else {
//             return ["Password or Username wrong"];
//         }
//     } else {
//         return ["User is not connected to us!"];
//     }
// }


// app.post("/login", async (req, res) => {
//         let msg = await login(req.body)
//     console.log(msg)
//     if(msg[1]){res.cookie("u_id",msg[1])}
//     res.json(msg[0])
//     res.status(200)
// })

const data = {
    username: "as",
    email: "gmail@gmail.com",
    password: "pass",
    name: "avinash",
    id:""
}

function login() {
    fetch("http://localhost:8000/login",{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        redirect: 'follow',
        body: JSON.stringify(data),
    }
    ).then(msg=>msg.text()).then(msg=>console.log(msg))
} 
adduser()



















//     async function adduser(user) {
//         let n = 1;
//         while (n !== 0) {
//             n = await User.find({ id: user.id }).countDocuments()
//             user.id = Math.floor(Math.random() * 1000).toString() + (new Date().getSeconds());
//         }
//         const newuser = new User(user)
//         const id = await newuser.save();
//         return (id.id)
//     }

//     async function olduser(user) {
//         const x = await User.find({ username: user.username }).countDocuments()
//         let msg = ((x > 0) ? 0 : 1);
//         return msg
//     }

//     app.post("/signup", async (req, res) => {
            
//         let usr = req.body;
//         await olduser(usr).then(e => {
//             if (e == 1) {
//                 adduser(usr).then(id => {
//                     res.cookie("u_id", id);
//                     res.json({ "message": "User added successfully",  "id": id });
//                     res.status(200)
//                 });
//             } else {
//                 res.clearCookie('u_id')
//                 res.json({ "message": "The user already exists!"});
//                 res.status(409);
//             }
//         })
//     }
//     );






// //Logout
// app.post("/logout", (req, res) => {
//     res.clearCookie("u_id");
//     res.status(200)
//     res.redirect("/greet");
// })


// app.listen(8000, () => {
//     console.log("Database server running on port 8000")
// })



// const { Server } = require('socket.io');

// const io = new Server({
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

// const users = [];

// io.on('connection', (socket) => {



//     socket.on('register', (user) => {
//         users.push(user)
//         console.log(`${user.name} connected`);
//         socket.broadcast.emit("user-joined", user.name);
//     })



//     socket.on('join-room', (user) => {
//         socket.join(user.room);
//         console.log(`${user.name} connected to room ${user.room},rooms: ${Array.from(socket.rooms).join(' , ')}`);
//         const rooms = Array.from(socket.rooms).slice(1);
//         socket.emit('rooms', rooms);
//     })


//     socket.on('msg', ({ msg, room, name }) => {
//         console.log(`${name}: ${msg} in[${room}]`);
//         if (msg) {
//             if (room[0]) {
//                 socket.to(room[0]).emit('nmsg', ({ msg: msg, name: name }));
//             } else {
//                 io.emit('nmsg', { msg: msg, name: name });
//             }
//         }
//     })




// });


// // console.clear();
// console.log("Chat sever is up");

// io.listen(4000)