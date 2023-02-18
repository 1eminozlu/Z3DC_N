const express = require("express");
const app = express();
const port = 3000;

module.exports = {
  name: "ready",
  run: async (client) => {
    app.get("/", (req, res) => {
      res.send(`${client.guilds.cache.size}`);
    });
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  },
};
