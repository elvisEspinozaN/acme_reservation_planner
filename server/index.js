const { client } = require("./db");

const express = require("express");
const morgan = require("morgan");

const server = express();
client.connect();

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));

server.use(morgan("dev"));
server.use(express.json());

// error handling
server.use((err, req, res) => {
  res.status(err.status || 500).send({ error: err.message || err });
});
