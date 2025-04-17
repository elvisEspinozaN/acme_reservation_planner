const {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
  destroyReservation,
} = require("./db");

async function init() {
  await client.connect();
  console.log("connected to db");

  // create tables
  await createTables();
  console.log("tables created");

  // create test data
  const [elvis, sophia] = await Promise.all([
    createCustomer("Elvis Esp"),
    createCustomer("Sophia Pen"),
  ]);
  console.log("Seeded data");
  console.log(
    "Customers: ",
    [elvis, sophia].map((c) => c.name)
  );

  const [havana, nobu] = await Promise.all([
    createRestaurant("Havana"),
    createRestaurant("Nobu"),
  ]);
  console.log(
    "Restaurants: ",
    [havana, nobu].map((r) => r.name)
  );

  const reservations = await Promise.all([
    createReservation({
      date: "04/16/2025",
      party_count: 2,
      restaurant_id: havana.id,
      customer_id: elvis.id,
    }),
    createReservation({
      date: "04/29/2025",
      party_count: 4,
      restaurant_id: nobu.id,
      customer_id: sophia.id,
    }),
  ]);
  console.table(reservations, ["date", "party_count"]);

  const deleted = await destroyReservation(
    reservations[0].id,
    reservations[0].customer_id
  );
  console.log("Deleted Reservation");
  const remainingReservations = await client.query(
    `SELECT * FROM reservations`
  );
  console.log("Current reservations: ");
  console.log(remainingReservations.rows);

  await client.end();
}

init();
