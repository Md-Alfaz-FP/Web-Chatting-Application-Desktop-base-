const express = require('express');  // javascript default declaration
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var formidable = require('formidable');

http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});
app.use('/files', express.static('files'));

app.get('/images/skype.png', (req, res) => {
    res.sendFile(__dirname + '/images/skype.png');
});
app.get('/signup/Skype.jpg', (req, res) => {
    res.sendFile(__dirname + '/signup/Skype.jpg');
});
app.get('/js/jquery-3.4.1.min.js', (req, res) => {
    res.sendFile(__dirname + '/js/jquery-3.4.1.min.js');
});
app.get('/chat/style.css', (req, res) => {
    res.sendFile(__dirname + '/chat/style.css');
});
app.get('/signup/style.css', (req, res) => {
    res.sendFile(__dirname + '/signup/style.css');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    });
});
app.post('/uploadfile', function (req, res) {
    var strFilePath = '';
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/files/' + file.name;
    });
    form.on('file', function (name, file) {
        strFilePath = '/files/' + file.name;
        res.send(JSON.stringify({ "filePath": strFilePath, "fileName": file.name }));
    });
});
