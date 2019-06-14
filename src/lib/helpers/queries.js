export default class Queries {
  static get testTable() {
    return 'SELECT * FROM orders';
  }

  static get searchForEmail() {
    return 'SELECT * FROM users WHERE email = $1';
  }
}
