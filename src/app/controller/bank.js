const Bank = require("../models/Bank");
const { calcularIdade } = require("../../libs/date");

const index = async function (req, res) {
  const results = await Bank.all();
  const Accounts = results.rows;

  if (Accounts.length < 1) {
    return res.status(404).json("Account not found");
  }
  return res.status(200).json(Accounts);
};
const post = async function (req, res) {
  const Birth = req.body.birth;

  if (calcularIdade(Birth) < 18) {
    return res
      .status(401)
      .json(
        "Não é possível incluir uma conta bancária para clientes de menor idade"
      );
  }
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.status(401).json(`Please fill in the ${key} field`);
    }
  }
  const results = await Bank.create(req.body);
  const Account = results;
  const Saldo = 0;

  const Wallet = await Bank.wallet(Account, Saldo);
  if (!Wallet) return res.status(404).json("Wallet Fail");

  const historico = await Bank.historic(Account);
  if (!historico) return res.status(404).json("Historic fail");

  return res.status(200).json(`número da conta bancária ${Account}`);
};
const saldo = async function (req, res) {
  const results = await Bank.saldo(req.body.accountNumber);
  const Saldo = results.rows[0].saldo;

  return res.status(200).json(` Seu saldo é de: ${Saldo}`);
};
const moviment = async function (req, res) {
  const data = req.body;
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.status(401).json(`Please fill in the ${key} field`);
    }
  }

  let results = await Bank.findBy(data.accountNumber);
  const Account = results.rows;
  if (Account == "")
    return res.status(404).json("Conta bancaria não encontrada");

  results = await Bank.saldo(data.accountNumber);
  let Saldo = results.rows[0].saldo;

  let Total = 0;
  const Deposito = Number(data.value);

  if (Deposito < 1) return res.status(401).json("Entre com valor maior que 0");

  function operação(Saldo, transação) {
    if (transação == "1") {
      const Inicial = Number(Saldo);

      Total = Inicial + Deposito;

      return Total;
    } else if (transação == "2") {
      const Inicial = Number(Saldo);

      Total = Inicial - Deposito;

      return Total;
    } else {
      return res.status(400).json("Operação invalida");
    }
  }
  operação(Saldo, data.transaction);

  if (Total < 0) return res.status(401).json("Saldo insuficiente");

  await Bank.updateWallet(Total, data.accountNumber);

  results = await Bank.saldo(data.accountNumber);
  const saldoNovo = results.rows[0].saldo;

  results = await Bank.historic(data);

  return res.status(200).json(saldoNovo);
};
const extract = async function (req, res) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.status(401).json(`Please fill in the ${key} field`);
    }
  }
  const Account = req.body.id_wallet;

  const results = await Bank.findHistoric(Account);
  if (!results) return res.status(401).json("Conta invalida");

  const Accounts = results.rows;

  return res.status(200).json(Accounts);
};

module.exports = {
  index,
  post,
  saldo,
  moviment,
  extract,
};
