const express = require("express");
const { readdirSync } = require("fs");
const app = express();
const port = 3000;

const main = async (client) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  // console.log(client);

  readdirSync(__dirname + "/routers/").forEach(async (file) => {
    const command = require(__dirname + `/routers/${file}`);
    // console.log(command);
    if (command) {
      await app.use(command);
      command.client = client;
    }
  });

  app.listen(port, () => {
    client.hLog(`Example app listening at http://localhost:${port}`);
  });
};

module.exports = {
  name: "express",
  run: main,
};
