const { Socket } = require('socket.io');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const room1Password = 12345;
var newRoomPass = [];
var tempPass = 0;
var i = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});
var roomNum = 0;
app.get('/chat_room:id', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    roomNum = req.params.id;
})

io.on('connection', (Socket) => {
    Socket.on('userNameForTerminal', username => {
        io.emit('new user', username);
        console.log(username + ' has connected to room ' + roomNum);
    })
    Socket.on('newRoom', (roomPass, roomnum) => {
        if (i % 2 == 0) {
            tempPass = roomPass;
            newRoomPass[roomnum] = roomPass;
            console.log(roomnum + ' : ' + roomPass);
            console.log(' mm ' + roomPass);
            i++;
        } else console.log('none');
        // console.log(newRoomPass[i]);
        // i++;
    })
    Socket.on('passCheck', (inputPassword, room) => {
        if (inputPassword == room1Password && room == 1) {
            io.emit('truePass');
        }
        if (newRoomPass[room] == inputPassword) io.emit('truePass');
        else io.emit('falsePass');
        console.log(room + '@' + newRoomPass[room]);
    })

});
io.on('connection', (Socket) => {
    Socket.on('create room', () => {
        io.emit('create room');
        console.log(`Room has created Successfully`);
    })
})

io.on('connection', (Socket) => {

    Socket.on('chat message', (msg, name) => {
        io.emit('chat message', msg, name);
    });
    Socket.on('userName', (name) => {

        io.emit('username', name);
    })
});

io.on('connection', (Socket) => {
    Socket.on('ss', () => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2');
    })
})
var port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log('Listening on ' + port);
});