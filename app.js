var express = require('express');
var http    = require('http');
var session = require('express-session')
var app     = express();
var server  = http.createServer(app);

server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
app.use("/", express.static(__dirname + '/public'));
require('./server/router')(app, server);
