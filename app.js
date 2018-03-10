//local test server
var express = require('express');
var app = express();

const PORT = 8000;
app.use(express.static(__dirname + '/dist'));
app.listen(PORT);
console.log('Listening on http://127.0.0.1:' + PORT);

