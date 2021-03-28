const express = require("express");
const routes = express.Router();

const Bank = require("./app/controller/controller");

routes.get("/", (req, res) => {
  return res.send("Hello World");
});

routes.get("/account", Bank.index);
routes.post("/account", Bank.post);

module.exports = routes;
