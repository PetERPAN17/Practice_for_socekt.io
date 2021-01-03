var http = require('http');
var fs = require('fs');

var app = http.createServer(function(request,response){
    var url = request.url;

    if(request.url == '/'){
        url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }

    console.log(__dirname + url);

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});

var io = require('socket.io')(app);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('change video', (data) => {
        console.log('change video');
        io.emit('change video', data);
    });
    socket.on('change text', (data) => {
        console.log('change text');
        console.log(data);
        io.emit('change text', data);
    });
});

app.listen(3000, () => {
    console.log('listening on *:3000');
});