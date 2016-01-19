var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var toDoRoutes = require('./routes/toDoRoutes');

app.use(function(req, res, next) {
	console.log(req.method + " : " + req.path);
	next();
});

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

//every route is prefixed by the first param.
//app.use('prefix', routeVar);
app.use('/api/v1/todo', toDoRoutes);

app.use(function(err, req, res, next) {
	console.log("ERR: " + err.err);
	res.status(400).send(err);
});

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
