const { client } = require("./db");

async function init() {
  await client.connect();
  console.log("connected to db");

  await client.end();
}

init();
