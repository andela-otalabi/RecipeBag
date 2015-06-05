var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //ORM
var Recipe = require('./app/models/models.recipe');
var User = require('./app/models/models.user');
var routes = require('./app/routes');
var router = express.Router();
var morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/recipe_db');

app.use('/api', router);
routes(router);

app.listen(port);
console.log('Magic happens on port ' + port);