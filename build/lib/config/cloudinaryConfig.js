"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_cloudinary["default"].config({
  cloud_name: 'okaforjude',
  api_key: 996355845829939,
  api_secret: 'THgg-bLXivyGxo-uHGz4WG8Ootc'
});

var uploads = function uploads(file) {
  return new Promise(function (resolve) {
    _cloudinary["default"].uploader.upload(file, function (result) {
      resolve({
        url: result.url,
        id: result.public_id
      });
    }, {
      resource_type: 'auto'
    });
  });
};

var _default = uploads;
exports["default"] = _default;