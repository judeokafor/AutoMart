"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Mail =
/*#__PURE__*/
function () {
  function Mail() {
    _classCallCheck(this, Mail);
  }

  _createClass(Mail, null, [{
    key: "transportOptions",
    value: function transportOptions() {
      return {
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
          user: 'automart144@gmail.com',
          pass: 'OkafoR@1993'
        },
        tls: {
          rejectUnauthorized: false
        }
      };
    }
  }, {
    key: "MailOptionsReset",
    value: function MailOptionsReset(name, url, to) {
      var text = "<!DOCTYPE html>\n      <html>\n      \n      <head>\n          <title>Forget Password Email</title>\n      </head>\n      \n      <body>\n          <div>\n              <h3>Dear ".concat(name, ",</h3>\n              <p>You requested for a password reset, kindly use this <a href=\"").concat(url, "\">link</a> to reset your password</p>\n              <br>\n              <small>Link expires after 1 hour</small>\n              <br>\n              <p>Cheers!</p>\n          </div>\n         \n      </body>\n      \n      </html>");
      return {
        from: process.env.AUTOMART_EMAIL,
        to: to,
        subject: 'Password help has arrived!',
        html: text
      };
    }
  }, {
    key: "MailOptionsConfirm",
    value: function MailOptionsConfirm(name, to) {
      var text = "<!DOCTYPE html>\n    <html>\n    \n    <head>\n        <title>Password Reset</title>\n    </head>\n    \n    <body>\n        <div>\n            <h3>Dear ".concat(name, ",</h3>\n            <p>Your password has been successful reset, you can now login with your new password.</p>\n            <br>\n            <div>\n                Cheers!\n            </div>\n        </div>\n       \n    </body>\n    \n    </html>");
      return {
        from: process.env.AUTOMART_EMAIL,
        to: to,
        subject: 'Your Password has being Updated Succesfully!',
        html: text
      };
    }
  }]);

  return Mail;
}();

exports["default"] = Mail;