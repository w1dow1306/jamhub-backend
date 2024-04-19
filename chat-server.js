const { Server } = require('socket.io');
console.clear();
const config = require('./config/server-config.json')
const io = new Server({
    cors: {
        origin: ["http://localhost:3000","*"]
    }
});

const users = [];

io.on('connection', (socket) => {





    socket.on('register', (user) => {
        users.push(user)
        socket.join('0');
    })


    socket.on("join-room", (room,name) => {
        console.log(name, " joined to room", room);
        socket.leaveAll();
        socket.join(room);
        io.to(room).emit("message", `${name} has joined the room:${room}`);
    });


    socket.on('msg', ({ msg, room, name }) => {
        // console.log(`${name}: ${msg} in[${room}]`);
        if (msg) {
            if (room) {
                io.to(room).emit('nmsg', ({ msg: msg, name: name }));
            } else {
                io.to('0').emit('nmsg', { msg: msg, name: name });
            }
        }
    })

});


// console.clear();
console.log("Chat sever is up");

io.listen(config.chat.port)