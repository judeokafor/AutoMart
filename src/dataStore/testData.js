export default class testData {
  static existingUser() {
    return {
      firstName: 'Jude',
      lastName: 'Okafor',
      phoneNumber: '07065383765',
      address: 'Plot 436 Arab Road Kubwa Abuja',
      gender: 'Male',
      email: 'okaforjudechukwuebuka@gmail.com',
      password: 'pass',
      avatar: 'my avatar url',
      isAdmin: true,
      role: 'none',
    };
  }

  static newUser() {
    return {
      firstName: 'Jason',
      lastName: 'Okafor',
      phoneNumber: '07062313448',
      address: 'Plot 436 Arab Road Kubwa Abuja',
      gender: 'Male',
      email: 'iamjudegodwin@gmail.com',
      password: 'pass',
      avatar: 'my avatar url',
      isAdmin: true,
      role: 'none',
    };
  }

  static signInUser() {
    return {
      email: 'iamjudegodwin@gmail.com',
      password: 'pass',
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
      password: 'pass',
    };
  }

  static resetPasswordError() {
    return {
      password: 'pass',
      cnfPassword: 'passnot',
    };
  }

  static resetPasswordTrue() {
    return {
      password: 'pass',
      cnfPassword: 'pass',
    };
  }

  static sampleExistingReport() {
    return {
      id: 3345,
      carId: 4444,
      reason: 'Weird demands',
      description: 'The seller was asking for too much',
      createdOn: 20171236,
      name: 'Annonymous Stan',
      email: 'notneeded@gmail.com',
      phone: '+2347065383765',
    };
  }

  static sampleNewReport() {
    return {
      carId: 25553,
      reason: 'Privacy policy',
      description: 'Too much hatered',
      name: 'Mendem Stan',
      email: 'selfish@gmail.com',
      phone: '+234704993933',
    };
  }

  static newOrder() {
    return {
      id: 5676,
      buyer: 3445,
      carId: 2345,
      status: 'pending',
      price: 5000000,
      priceOffered: 400000,
      oldPriceOffered: 3500000,
      newPriceOffered: 4500000,
      createdOn: new Date(),
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
}