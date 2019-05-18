class Order {
  constructor(
    id,
    buyer,
    carId,
    createdOn,
    status,
    price,
    priceOffered,
    oldPriceOffered,
    newPriceOffered,
  ) {
    this.id = id;
    this.buyer = buyer;
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
