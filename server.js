require('dotenv').load();

var database = require('./config/database'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'), //ORM
  flash = require('connect-flash'),
  consolidate = require('consolidate'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  Recipe = require('./app/models/models.recipe'),
  Recipes = require('./app/controllers/controllers.recipe'),
  User = require('./app/models/models.user'),
  routes = require('./app/routes'),
  router = express.Router(),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  multer = require('multer'),
  path = require('path'),
cloudinary = require('cloudinary');

app.use(morgan('dev'));
app.use(multer({ dest: './uploads/'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(database.database);

app.use(methodOverride());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
  next();
});

app.use('/api', router);
routes(router);

app.engine('server.view.html', consolidate['swig']);

app.set('view engine', 'server.view.html');
app.set('views', './public');
app.route('/').get(function(req, res) {
  res.render('index', {});
});
app.use(express.static(path.resolve('./public')));

// app.get('*',Recipes.getAll);

app.listen(port);
console.log('Magic happens on port ' + port);
