class Order {
  constructor(
    id,
    buyer,
    carId,
    createdOn,
    status,
    amount,
    amountOffered,
    oldAmountOffered,
    newAmountOffered,
  ) {
    this.id = id;
    this.buyer = buyer;
    this.carId = carId;
    this.createdOn = createdOn;
    this.status = status;
    this.amount = amount;
    this.amountOffered = amountOffered;
    this.oldAmountOffered = oldAmountOffered;
    this.newAmountOffered = newAmountOffered;
  }
}
export default Order;
