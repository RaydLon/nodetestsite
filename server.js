// Simple website to test node server set up on AWS or similar cloud hosting

var	express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
		helpers: {
			section: function(name,options){
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
});

// enable CORS for enable cross-origin resource sharing on api calls only
app.use('/api',require('cors')());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// define where static content will be found (e.g. CSS, client JS)
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

// website routes
app.get('/', function(req,res) {
	res.render('index', {active: {index: true}});
});

app.get('/home', function(req,res) {
	res.render('index', {active: {index: true}});
});

app.get('/features', function(req,res) {
	res.render('features', {active: {features: true}});
});

app.get('/about', function(req,res) {
	res.render('about', {active: {about: true}});
});

// 404 catch-all handler (middleware)
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// start the server
app.listen(port);
console.log( 'Server started on port:' + port +'; press Ctrl-C to terminate.');
