const Bank = require("../models/models");
const { calcularIdade } = require("../../libs/utils");

const index = async function (req, res) {
  let results = await Bank.all();
  const Accounts = results.rows;

  if (Accounts.length < 1) {
    return res.send("Account not found");
  }
  console.log("Index ok");
  return res.send(Accounts);
};
const post = async function (req, res) {
  const Birth = req.body.birth;

  if (calcularIdade(Birth) < 18) {
    return res.send(
      "Não é possível incluir uma conta bancária para clientes de menor idade"
    );
  }

  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send(`Please fill in the ${key} field`);
    }
  }

  let results = await Bank.create(req.body);

  console.log(results);
  return res.send(`número da conta bancária ${results}`);
};

module.exports = {
  index,
  post,
};
