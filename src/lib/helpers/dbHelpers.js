import pool from '../config/dbConfig';
export default class DbHelpers {
  static async Query(query, args) {
    const client = await pool.connect();
    try {
      const result = await client.query(query, args);
      return result;
    } catch (e) {
      /* istanbul ignore next */
      console.log(e.stack);
    } finally {
      /* istanbul ignore next */
      client.release();
    }
    return false;
  }
}
