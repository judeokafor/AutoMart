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
}
export default Car;
