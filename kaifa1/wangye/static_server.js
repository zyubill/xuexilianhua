
var path = require('path');
var express = require('express');
var app = express();

//app.use(express.static(path.join(__dirname, 'jslib')));
app.use(express.static(path.join(__dirname, '../wangye')));

var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});