"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
describe('test', function () {
  it('should return a string', function () {
    expect('Welcome to jude app').to.equal('Welcome to jude app');
  });
});