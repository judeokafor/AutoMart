"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var multer = require('multer'); // multer.diskStorage() creates a storage space for storing files.


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, './files/images/');
    } else {
      cb({
        message: 'this file is neither a video or image file'
      }, false);
    }
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});
var _default = upload;
exports["default"] = _default;