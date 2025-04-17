const {
  client,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
} = require("./db");

const express = require("express");
const morgan = require("morgan");

const server = express();
client.connect();

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));

server.use(morgan("dev"));
server.use(express.json());

// routes
server.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

server.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await fetchRestaurants();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});

server.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const reservation = await createReservation({
      ...req.body,
      customer_id: req.params.id,
    });
    res.status(201).send(reservation);
  } catch (err) {
    next(err);
  }
});

server.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      await destroyReservation(req.params.id, req.params.customer_id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

// error handling
server.use((err, req, res) => {
  res.status(err.status || 500).send({ error: err.message || err });
});
