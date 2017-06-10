'use strict';

var _d3nodeOutput = require('d3node-output');

var _d3nodeOutput2 = _interopRequireDefault(_d3nodeOutput);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _votingSchema = require('../models/votingSchema');

var _votingSchema2 = _interopRequireDefault(_votingSchema);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _voting = require('../routes/voting');

var _voting2 = _interopRequireDefault(_voting);

var _createnewvote = require('../routes/createnewvote');

var _createnewvote2 = _interopRequireDefault(_createnewvote);

var _removevoting = require('../routes/removevoting');

var _removevoting2 = _interopRequireDefault(_removevoting);

var _auth = require('../routes/auth/auth');

var _auth2 = _interopRequireDefault(_auth);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
//PORT
var PORT = process.env.PORT || 3000;

//MONGODB Modesl


//Routes


//mongoose DATABASE

_mongoose2.default.Promise = global.Promise;

var MONGODB_URI = void 0;

if (process.env.NODE_ENV !== 'production') {
  MONGODB_URI = 'mongodb://localhost/d3_vote';
} else {
  MONGODB_URI = process.env.MONGODB_URI;
}

var app = (0, _express2.default)();

app.use(_express2.default.static('public/css/'));
app.set('view engine', 'ejs');
app.use(_bodyParser2.default.urlencoded({ extended: false })

//Authentification
);app.use(expressSession({
  secret: 'my baby',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(_user2.default.authenticate()));
passport.serializeUser(_user2.default.serializeUser());
passport.deserializeUser(_user2.default.deserializeUser());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
}

//ROUTES
);app.use(_createnewvote2.default);
app.use(_voting2.default);
app.use(_removevoting2.default);
app.use(_auth2.default);

_mongoose2.default.connect(MONGODB_URI).then(function () {
  return console.log('connected to MONGODB server');
}).catch(function (err) {
  return console.log('Server disconnected');
});

app.listen(PORT, function () {
  return console.log('server on port: ' + PORT + ' ');
});