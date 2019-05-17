class CarAdvert {
  constructor(
    id,
    model,
    manufacturer,
    color,
    transmission,
    year,
    fuelType,
    bodyType,
    state,
    price,
    status,
    createdOn,
  ) {
    this.id = id;
    this.model = model;
    this.manufacturer = manufacturer;
    this.color = color;
    this.transmission = transmission;
    this.year = year;
    this.fuelType = fuelType;
    this.bodyType = bodyType;
    this.state = state;
    this.price = price;
    this.status = status;
    this.createdOn = createdOn;
  }
}
export default CarAdvert;
