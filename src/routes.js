const express = require("express");
const routes = express.Router();

const Bank = require("./app/controller/bank");

routes.get("/", (req, res) => {
  return res.send("Hello World");
});

routes.get("/account", Bank.index);
routes.get("/saldo", Bank.saldo);
routes.get("/extract", Bank.extract);

routes.post("/account", Bank.post);

routes.put("/wallet", Bank.moviment);

module.exports = routes;
