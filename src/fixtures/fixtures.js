export default class testData {
  static existingUser() {
    return {
      firstName: 'jude',
      lastName: 'okafor',
      phoneNumber: '12345678',
      address: 'plot 436 arab road kubwa',
      gender: 'male',
      email: 'okaforjudechukwuebuka@gmail.com',
      password: 'passsss',
      isAdmin: true,
      role: 'buyer',
    };
  }

  static invalidUser() {
    return {
      firstName: 'jude',
      lastName: 'okafor',
      phoneNumber: '123456783333333333',
      address: 'plot 436 arab road kubwa',
      gender: 'male',
      email: 'judegodwin@gmail.com',
      password: 'pa',
      isAdmin: true,
      role: 'buyer',
    };
  }

  static invalidUserSignIn() {
    return {
      email: 'judegmail',
      password: 'pass',
    };
  }

  static newUser() {
    return {
      email: 'newUser@gmail.com',
      password: 'password',
      firstName: 'jude',
      lastName: 'okafor',
      phoneNumber: '123456789',
      address: 'plot 436 arab road kubwa',
      gender: 'male',
      role: 'SELLER',
    };
  }

  static signInUser() {
    return {
      email: 'okaforjudechukwuebuka@gmail.com',
      password: 'password',
    };
  }

  static signInAdmin() {
    return {
      email: 'jude@gmail.com',
      password: 'password',
    };
  }

  static signInSeller() {
    return {
      email: 'janefrances@gmail.com',
      password: 'password',
    };
  }

  static signInUserPasswordError() {
    return {
      email: 'okaforjudechukwuebuka@gmail.com',
      password: 'errorpassword',
    };
  }

  static strangeUser() {
    return {
      email: 'userNotfound@gmail.com',
      password: 'passssssss',
    };
  }

  static resetPasswordError() {
    return {
      password: 'password123',
      cnfPassword: 'password',
    };
  }

  static resetPasswordTrue() {
    return {
      password: '12345678',
      cnfPassword: '12345678',
    };
  }

  static resetFailValidation() {
    return {
      password: '123',
      cnfPassword: '1234',
    };
  }

  static sampleExistingReport() {
    return {
      carId: 2,
      reason: 'Weird demands',
      description: 'The seller was asking for too much',
      createdOn: 20171236,
      name: 'Annonymous Stan',
      email: 'notneeded@gmail.com',
      phone: '65383765',
    };
  }

  static sampleErrorReport() {
    return {
      carId: 1,
      reason: 'Weird demands',
      description: 'The seller was asking for too much',
      name: 'Annonymous Stan',
      email: 'notneededcom',
      phone: 65383765,
    };
  }

  static sampleNewReport() {
    return {
      carId: 2,
      reason: 'Weird demands',
      description: 'The seller was asking for too much',
      name: 'Annonymous Stan',
      email: 'sameemail@gmail.com',
      phone: '9907065311',
    };
  }

  static newOrder() {
    return {
      carId: 3,
      amount: 5000000,
      priceOffered: 400000,
    };
  }

  static errorOrder() {
    return {
      carId: '2-',
      amount: '_5000000',
      priceOffered: 400000,
    };
  }

  static carAdvert() {
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
      createdOn: new Date(),
    };
  }

  static errorCarAdvert() {
    return {
      model: '',
      manufacturer: '',
      imageUrl: 'My Image url from cloudinary',
      transmission: 'Automatic',
      year: 2011,
      fuelType: 'Fuel',
      bodyType: '',
      state: '',
      price: null,
      description: '',
    };
  }
}