//mostly base on marked answer from
// http://stackoverflow.com/questions/25532692/how-to-share-sessions-with-socket-io-1-x-and-express-4-x

var express = require('express');
var path = require('path');

var Server = require('http').Server;
var session = require('express-session');
var RedisStore = require("connect-redis")(session);

var app = express();

var server = Server(app);
var io = require('socket.io')(server);

var sessionMiddleware = session({
    store: new RedisStore({}),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    name: 'sess.sid',
    cookie: {
        domain: 'localhost',
        maxAge: 1000 * 60 * 60 * 172800
    }
});

app.use(sessionMiddleware);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));
// app.use('/login', require('./routes/login'));
// app.use('/logout', require('./routes/logout'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




var mongo = require('mongodb').MongoClient;
var myDb;

io.on('connection', function(socket) {
    socket.on('login', function(data) {
        //data -> login and pass to future compare with DB
        console.log(data);
        console.log("**");
        //socket.request.session - undefined
        console.log(socket.request.session);
    });

    socket.on('linkClkEvent', function(data) {
        console.log(socket.request);
        console.log("**");
        console.log(socket.request.session);
        console.log(data);
    });
});

server.listen(3000, function() {
    console.log('Listening on: ' + 3000);
    //localhost/dbName
    // mongo.connect("mongodb://localhost/test", function(err, db) {
    //     if (err) {
    //         console.warn(err.message);
    //     } else {
    //         myDb = db;
    //     }
    // });
});

module.exports = app;
