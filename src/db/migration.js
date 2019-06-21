import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from '../lib/config/dbConfig';

dotenv.config();
async function createAutoMartSchema() {
  const dropTable = 'DROP TABLE IF EXISTS users, cars, flags, orders';
  const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    userid BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
    firstname VARCHAR(200) NOT NULL,
    lastname VARCHAR(200) NOT NULL,
    phonenumber VARCHAR(200) NOT NULL,
    password VARCHAR(500) NOT NULL,
    address VARCHAR(500),
    gender VARCHAR(30),
    email VARCHAR(200) UNIQUE NOT NULL,
    avatar VARCHAR(500) NOT NULL,
    isadmin BOOLEAN,
    role VARCHAR(50)
  )`;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('password', salt);
  const addUserToUserTable = `INSERT INTO users (firstname, lastname, phonenumber, password, address, gender, email, avatar,isadmin, role) 
  VALUES ('jude', 'okafor', '08012345678','${hashedPassword}','plot 436 arab road kubwa','male', 'okaforjudechukwuebuka@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'TRUE', 'BUYER'),
  ('jason', 'okafor', '08012345678','${hashedPassword}','plot 436 arab road kubwa','male', 'jasonokafor@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'FALSE', 'SELLER'),
  ('olivia', 'okafor', '08012345678','${hashedPassword}','plot 436 arab road kubwa','female', 'oliviaokafor@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'FALSE', 'BUYER'),
  ('stephanie', 'okafor', '08012345678','${hashedPassword}','plot 436 arab road kubwa','female', 'stephanieokafor@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'FALSE', 'BUYER'),
  ('jayden', 'okafor', '08012345678','${hashedPassword}','plot 436 arab road kubwa','male', 'jaydenokafor@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'FALSE', 'SELLER'),
  ('chimdinma', 'otutu', '08012345678','${hashedPassword}','plot 436 arab road kubwa', 'female', 'chidinma@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'TRUE', 'admin'),
  ('janefrances', 'otutu', '08012345678','${hashedPassword}','plot 436 arab road kubwa','female','janefrances@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'TRUE', 'SELLER'),
  ('godwin', 'jude', '08012345678','${hashedPassword}','plot 436 arab road kubwa','male','jude@gmail.com', '//www.gravatar.com/avatar/16b7ce500621cfe1940b09d09ee42385?s=200&r=pg&d=mm', 'TRUE', 'admin')`;

  const createCarTable = `CREATE TABLE IF NOT EXISTS cars (
    carid BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
    model VARCHAR(200) NOT NULL,
    manufacturer VARCHAR(200) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_name VARCHAR(500) NOT NULL,
    transmission VARCHAR(100),
    year INT,
    fuel_type VARCHAR(20) NOT NULL,
    body_type VARCHAR(50) NOT NULL,
    state VARCHAR(20) NOT NULL,
    price BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    description VARCHAR(500),
    location VARCHAR(100),
    created_on TIMESTAMP DEFAULT NOW() NOT NULL,
    ownerid BIGINT REFERENCES users(userid) ON DELETE CASCADE
  )`;
  const addCarsToTable = `INSERT INTO cars (location, model, manufacturer, image_url, image_name, transmission, year, fuel_type, body_type, state, price, status, description, ownerid ) 
  VALUES ('Abuja', 'Rav4', 'Toyota', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXnGzYgg9zdOrWSV72UivTBgLAEkG5KekxETA3YbMOpKdHU2k','my_rav4.jpg','Automatic', 2011, 'Petrol', 'Four Wheel Drive', 'used', 2500000, 'available', 'The car seems tp be very nice and lovely, great features', 1),
  ('Lagos', 'Corolla', 'Toyota', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JBIbU-Dhw5VB4I3Hsa7a9eppkBI6FwwN722oa4SupGuL2EY8sQ','corolla.png','Automatic', 2009, 'Petrol', 'Sedan', 'new', 1800000, 'available', 'Top notch, exculsive designs', 3),
  ('Portharcourt', 'Range Sport', 'RangeRover', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjtu79VNhUc_AN20Y4CbAdikH7RAldEldJG_ka8t8Ll1r0KYJeQ','my_range.jpg','Automatic', 2016, 'Petrol', 'Four Wheel Drive', 'used', 3500000, 'sold', 'Wonderful rims, top speed awesome', 1),
  ('Ogun', 'c300', 'Mercedez', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu-mDYEKfSxl-kJdWmP-sP7UfE6Jm2j3kEhfD18Oq77JTLJb9mKA','my_benz.jpg','Manual', 2013, 'Petrol', 'Sedan', 'new', 4000000, 'available', 'Great speed simply the best', 2),
  ('Enugu', 'Matrix', 'Toyota', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnw6mLOS1N44_UcFT-Jj1VzEuN306tAzHAQJb6fw55xioQlexdg','my_matrix.jpg','Automatic', 2009, 'Petrol', 'Sedan', 'used', 2500000, 'available', 'The car seems tp be very nice and lovely, great features', 3)
  `;
  const createFlagTable = `CREATE TABLE IF NOT EXISTS flags (
    flagid BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
    reason VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_on TIMESTAMP DEFAULT NOW() NOT NULL,
    car_id BIGINT REFERENCES cars(carid) ON DELETE CASCADE)`;

  const addFlagsToTable = `INSERT INTO flags (reason, description, name, email, phone, car_id) 
VALUES ('Mistrust', 'The seller was not truthful to a certain extent fools around', 'okafor jude','jude@gmail.com','0909900087', 2)`;

  const createOrderTable = `CREATE TABLE IF NOT EXISTS orders (
        orderid BIGSERIAL PRIMARY KEY UNIQUE NOT NULL,
        status VARCHAR(50) NOT NULL,
        amount BIGINT NOT NULL,
        price_offered BIGINT NOT NULL,
        old_price_offered BIGINT,
        new_price_offered BIGINT,
        created_on TIMESTAMP DEFAULT NOW() NOT NULL,
        user_id BIGINT REFERENCES users(userid) ON DELETE CASCADE ON UPDATE CASCADE,
        car_id BIGINT REFERENCES cars(carid) ON DELETE CASCADE ON UPDATE CASCADE
      )`;
  const addOrderToTable = `INSERT INTO orders (status, amount, price_offered, old_price_offered, new_price_offered, user_id, car_id ) 
      VALUES ('pending', 10000000, 8000000, 7500000, 8500000, 2, 1),
      ('sold', 20500000, 18000000, 17500000, 22000000, 1, 2),
      ('pending', 1500000, 11000000, 9500000, 12000000, 1, 2)`;

  const client = await pool.connect();
  try {
    await client.query(dropTable);
    await client.query(createUserTable);
    await client.query(addUserToUserTable);
    await client.query(createCarTable);
    await client.query(addCarsToTable);
    await client.query(createFlagTable);
    await client.query(addFlagsToTable);
    await client.query(createOrderTable);
    await client.query(addOrderToTable);
  } catch (e) {
    console.log(e.stack);
  } finally {
    client.release();
  }
  return false;
}
createAutoMartSchema();
