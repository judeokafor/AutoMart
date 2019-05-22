import Joi from 'joi';

class Car {
  constructor(
    id,
    owner, // user id
    model,
    manufacturer,
    imageName,
    imageUrl,
    transmission, // automatic or manual
    year,
    fuelType, // disel or petrol
    bodyType,
    state, // used or new
    price,
    status, // sold and available default is available
    description,
    createdOn,
  ) {
    this.id = id;
    this.owner = owner;
    this.model = model;
    this.manufacturer = manufacturer;
    this.imageName = imageName;
    this.imageUrl = imageUrl;
    this.transmission = transmission;
    this.year = year;
    this.fuelType = fuelType;
    this.bodyType = bodyType;
    this.state = state;
    this.price = price;
    this.status = status;
    this.description = description;
    this.createdOn = createdOn;
  }

  static get carSchema() {
    return Joi.object({
      owner: Joi.number()
        .integer()
        .required(),
      model: Joi.string()
        .trim()
        .alphanum()
        .required(),
      manufacturer: Joi.string()
        .trim()
        .alphanum()
        .required(),
      imageName: Joi.string()
        .trim()
        .required(),
      transmission: Joi.string(),
      year: Joi.date(),
      fuelType: Joi.string(),
      bodyType: Joi.string(),
      state: Joi.string(),
      price: Joi.number().precision(4),
      status: Joi.string(),
      description: Joi.string().max(150),
    });
  }

  static get markAsSold() {
    return Joi.object({
      id: Joi.string().required(),
      status: Joi.string().required(),
    });
  }
}
export default Car;
