require('dotenv').load();

var database = require('./config/database'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'), //ORM
  passport = require('passport'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  Recipe = require('./app/models/models.recipe'),
  Recipes = require('./app/controllers/controllers.recipe'),
  User = require('./app/models/models.user'),
  routes = require('./app/routes'),
  router = express.Router(),
  methodOverride = require('method-override'),
  morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(database.database);

app.use(methodOverride());

app.use('/api', router);
routes(router);

app.get('*',Recipes.getAll);

app.listen(port);
console.log('Magic happens on port ' + port);
