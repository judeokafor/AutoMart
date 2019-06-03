"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var testData =
/*#__PURE__*/
function () {
  function testData() {
    _classCallCheck(this, testData);
  }

  _createClass(testData, null, [{
    key: "existingUser",
    value: function existingUser() {
      return {
        firstName: 'jude',
        lastName: 'okafor',
        phoneNumber: '12345678',
        address: 'plot 436 arab road kubwa',
        gender: 'male',
        email: 'judegodwin@gmail.com',
        password: 'passsss',
        isAdmin: true,
        role: 'buyer'
      };
    }
  }, {
    key: "invalidUser",
    value: function invalidUser() {
      return {
        firstName: 'jude',
        lastName: 'okafor',
        phoneNumber: '123456783333333333',
        address: 'plot 436 arab road kubwa',
        gender: 'male',
        email: 'judegodwin@gmail.com',
        password: 'pa',
        isAdmin: true,
        role: 'buyer'
      };
    }
  }, {
    key: "newUser",
    value: function newUser() {
      return {
        firstName: 'jude',
        lastName: 'okafor',
        phoneNumber: '12345678',
        address: 'plot 436 arab road kubwa',
        gender: 'male',
        email: 'judegodwin@gmail.com',
        password: 'passsss',
        isAdmin: true,
        role: 'buyer'
      };
    }
  }, {
    key: "signInUser",
    value: function signInUser() {
      return {
        email: 'okaforjudechukwuebuka@gmail.com',
        password: 'passsss'
      };
    }
  }, {
    key: "signInUserPasswordError",
    value: function signInUserPasswordError() {
      return {
        email: 'okaforjudechukwuebuka@gmail.com',
        password: 'errorpassword'
      };
    }
  }, {
    key: "strangeUser",
    value: function strangeUser() {
      return {
        email: 'userNotfound@gmail.com',
        password: 'pass'
      };
    }
  }, {
    key: "resetPasswordError",
    value: function resetPasswordError() {
      return {
        password: 'pass',
        cnfPassword: 'passnot'
      };
    }
  }, {
    key: "resetPasswordTrue",
    value: function resetPasswordTrue() {
      return {
        password: '12345678',
        cnfPassword: '12345678'
      };
    }
  }, {
    key: "sampleExistingReport",
    value: function sampleExistingReport() {
      return {
        id: 3345,
        carId: 4444,
        reason: 'Weird demands',
        description: 'The seller was asking for too much',
        createdOn: 20171236,
        name: 'Annonymous Stan',
        email: 'notneeded@gmail.com',
        phone: '65383765'
      };
    }
  }, {
    key: "sampleErrorReport",
    value: function sampleErrorReport() {
      return {
        carId: '1144',
        reason: 'Weird demands',
        description: 'The seller was asking for too much',
        name: 'Annonymous Stan',
        email: 'notneededcom',
        phone: 65383765
      };
    }
  }, {
    key: "sampleNewReport",
    value: function sampleNewReport() {
      return {
        carId: 23456,
        reason: 'Weird demands',
        description: 'The seller was asking for too much',
        name: 'Annonymous Stan',
        email: 'sameemail@gmail.com',
        phone: '99070653'
      };
    }
  }, {
    key: "newOrder",
    value: function newOrder() {
      return {
        buyer: 3445,
        carId: 2345,
        price: 5000000,
        priceOffered: 400000
      };
    }
  }, {
    key: "errorOrder",
    value: function errorOrder() {
      return {
        buyer: '3445',
        carId: '2345',
        price: '5000000',
        priceOffered: 400000
      };
    }
  }, {
    key: "carAdvert",
    value: function carAdvert() {
      return {
        owner: 5550,
        model: 'RAV 4',
        manufacturer: 'Toyota',
        imageUrl: 'My Image url from cloudinary',
        imageName: 'my_redcar.png',
        transmission: 'Automatic',
        year: 2011,
        fuelType: 'Fuel',
        bodyType: 'Suv',
        state: 'new',
        price: 4700000,
        status: 'sold',
        description: 'car ac still intact, alloy rims',
        createdOn: new Date()
      };
    }
  }, {
    key: "errorCarAdvert",
    value: function errorCarAdvert() {
      return {
        owner: '5550',
        model: 'RAV 4',
        manufacturer: 'Toyota',
        imageUrl: 'My Image url from cloudinary',
        imageName: 'my_redcar.png',
        transmission: 'Automatic',
        year: 2011,
        fuelType: 'Fuel',
        bodyType: 'Suv',
        state: 'new',
        price: '4700000',
        status: 'sold',
        description: 'car ac still intact, alloy rims',
        createdOn: new Date()
      };
    }
  }]);

  return testData;
}();

exports["default"] = testData;