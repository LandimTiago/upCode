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
const moviment = async function (req, res) {
  const data = req.body;
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send(`Please fill in the ${key} field`);
    }
  }

  let results = await Bank.findBy(data.accountNumber);
  const Account = results.rows;
  if (Account == "") return res.send("Conta bancaria não encontrada");

  results = await Bank.saldo(data.accountNumber);
  let Saldo = results.rows[0].saldo;
  console.log(`Saldo inicial de: ${Saldo}`);

  let Total = 0;
  function operação(Saldo, transação) {
    if (transação == "1") {
      const Inicial = Number(Saldo);
      const Deposito = Number(data.value);

      Total = Inicial + Deposito;

      return Total;
    } else if (transação == "2") {
      const Inicial = Number(Saldo);
      const Deposito = Number(data.value);

      Total = Inicial - Deposito;

      return Total;
    } else {
      return res.send("Operação invalida");
    }
  }
  operação(Saldo, data.transaction);

  if (Total < 0) return res.send("Saldo insuficiente");

  await Bank.updateWallet(Total, data.accountNumber);

  results = await Bank.saldo(data.accountNumber);
  const saldoNovo = results.rows[0].saldo;

  return res.send(saldoNovo);
};

module.exports = {
  index,
  post,
  moviment,
};
