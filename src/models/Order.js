class Order {
  constructor(
    id,
    carId,
    createdOn,
    status,
    price,
    priceOffered,
    oldPriceOffered,
    newPriceOffered,
  ) {
    this.id = id;
    this.carId = carId;
    this.createdOn = createdOn;
    this.status = status;
    this.price = price;
    this.priceOffered = priceOffered;
    this.oldPriceOffered = oldPriceOffered;
    this.newPriceOffered = newPriceOffered;
  }
}
export default Order;
