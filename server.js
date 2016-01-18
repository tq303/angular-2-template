'use strict';

var express      = require('express'),
	path         = require('path'),
	app          = express();

app.use(express.static(path.join(__dirname, 'dist')));

var port = 8888;

if (typeof process.env.PORT !== 'undefined') {
	port = parseInt(process.env.PORT, 10);
}

app.listen(port);

console.log('listening on localhost:' + port);
