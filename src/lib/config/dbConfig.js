import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

let connectionString;
let ssl;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.PGELEPHANTURL;
  ssl = true;
} else {
  connectionString = process.env.PGURLDEV;
  ssl = false;
}

const pool = new Pool({
  connectionString,
  ssl,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
pool.on('connect', () => {
  console.log(`Connected to Database ${connectionString}`);
});
pool.on('error', () => {
  console.log(`Error occured while connecting to ${connectionString}`);
});

export default pool;
