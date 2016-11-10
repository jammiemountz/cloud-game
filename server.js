var port;
var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT ? process.env.PORT:8080
console.log(port)

app.use(express.static('./'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);
