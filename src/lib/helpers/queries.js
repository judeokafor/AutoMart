export default class Queries {
  static get testTable() {
    return 'SELECT * FROM orders';
  }

  static get searchForEmail() {
    return 'SELECT * FROM users WHERE email = $1';
  }

  static get insertUsers() {
    return `INSERT into users (firstname, lastname, phonenumber, password, address, gender, email, avatar,isadmin, role) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING userid`;
  }

  static get existingOrder() {
    return `SELECT * FROM orders 
    WHERE car_id = $1 AND user_id = $2`;
  }

  static get createOrder() {
    return `INSERT INTO orders (status, amount, price_offered, old_price_offered, new_price_offered, user_id, car_id ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING orderid, amount, status, price_offered`;
  }

  static get pendingOrder() {
    return `SELECT * FROM orders 
    WHERE orderid = $1 AND status = $2`;
  }

  static get userOrder() {
    return `SELECT * FROM orders 
    INNER JOIN cars ON car_id = carid
    WHERE user_id = $1 AND orders.status = $2`;
  }

  static get updateOrder() {
    return `
    UPDATE orders SET price_offered = $1, new_price_offered = $1, old_price_offered = $2
    WHERE orderid = $3 AND status = $4`;
  }
}
