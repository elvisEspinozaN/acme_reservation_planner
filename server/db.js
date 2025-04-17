const pg = require("pg");
const uuid = require("uuid");
require("dotenv").config();

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_reservation_planner"
);

// dropping/creating the table
/**
 * customer { id, name }
 * restaurant { id, name }
 * reservation { id, date, party_count, restaurant_id, customer_id }
 */
async function createTables() {
  const SQL = `
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS restaurants;
    DROP TABLE IF EXISTS customers;

    CREATE TABLE customers(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE restaurants(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE reservations(
      id UUID PRIMARY KEY,
      date DATE NOT NULL,
      party_count INTEGER NOT NULL,
      restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
      customer_id UUID REFERENCES customers(id) NOT NULL
    );
  `;

  await client.query(SQL);
}

module.exports = { client, createTables };
