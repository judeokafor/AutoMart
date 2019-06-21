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
}
