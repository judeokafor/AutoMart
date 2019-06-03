"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport = _interopRequireDefault(require("passport"));

var _path = _interopRequireDefault(require("path"));

require("@babel/polyfill/noConflict");

var _user = _interopRequireDefault(require("./routes/api/user"));

var _car = _interopRequireDefault(require("./routes/api/car"));

var _order = _interopRequireDefault(require("./routes/api/order"));

var _flag = _interopRequireDefault(require("./routes/api/flag"));

var _reset = _interopRequireDefault(require("./routes/api/reset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use('/uploads', _express["default"]["static"]('uploads'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_passport["default"].initialize());

require('./lib/config/passport')(_passport["default"]);

app.use('/api/v1/auth', _user["default"]);
app.use('/api/v1/car', _car["default"]);
app.use('/api/v1/order', _order["default"]);
app.use('/api/v1/flag', _flag["default"]);
app.use('/api/v1/reset', _reset["default"]);
app.get('/', function (req, res) {
  res.send('Welcome to jude app');
});
var PORT = process.env.PORT || 8080;
var server = app.listen(PORT, function () {
  console.log("Server Started at Port : ".concat(PORT));
});
var _default = server;
exports["default"] = _default;