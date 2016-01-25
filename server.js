// server.js

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser'); //  POST
var methodOverride = require('method-override'); //  DELETE PUT

// Connect to DB
require('./lib/db');

//CONFIGURACION
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());

require('./routes/api').init(app);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

// Adding Server instance for better Handling
var server = app.listen(3000, function() {
  console.log("App en el puerto " + server.address().port);
});
