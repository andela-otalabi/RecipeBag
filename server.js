var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'), //ORM
  Recipe = require('./app/models/models.recipe'),
  User = require('./app/models/models.user'),
  routes = require('./app/routes'),
  router = express.Router(),
  morgan = require('morgan');

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
