const { client, createTables } = require("./db");

async function init() {
  await client.connect();
  console.log("connected to db");

  await createTables();
  console.log("tables created");

  await client.end();
}

init();
