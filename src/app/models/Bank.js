const db = require("../../config/db");

const all = function () {
  return db.query(`SELECT * FROM account ORDER BY accountnumber`);
};
const findBy = function (data) {
  const query = `SELECT * FROM account WHERE accountnumber = $1 `;
  const value = [data];

  const results = db.query(query, value);

  return results;
};
const create = async function (data) {
  const results = await all();
  const contador = results.rows.length;
  const accountNumber = new Date().getFullYear() + `${contador + 1}`;

  const queryAccount = `
    INSERT INTO account (
        accountnumber,
        name,
        cpf,
        birth
    ) VALUES ($1, $2, $3, $4) RETURNING accountnumber = $1
`;
  const valuesAccount = [accountNumber, data.name, data.cpf, data.birth];

  db.query(queryAccount, valuesAccount);

  return accountNumber;
};
const historic = function (data) {
  const query = `INSERT INTO historic (
    id_wallet,
    operation,
    value,
    created_at
  ) VALUES ($1, $2, $3, $4)`;

  const values = [
    data.accountNumber || data,
    data.transaction || 1,
    data.value || 0,
    Date.now(),
  ];

  return db.query(query, values);
};
const wallet = function (Account, Saldo) {
  const query = `
    INSERT INTO wallet (id_account, saldo) VALUES ($1, $2) RETURNING id_account = $1
  `;
  const values = [Account, Saldo];

  return db.query(query, values);
};
const saldo = function (data) {
  return db.query(`SELECT * FROM wallet WHERE id_account = $1`, [data]);
};
const updateWallet = function (Saldo, Id) {
  return db.query(
    `
    UPDATE wallet SET saldo = ($1) WHERE id_account = $2 RETURNING saldo = $1`,
    [Saldo, Id]
  );
};
const findHistoric = function (data) {
  return db.query(`SELECT * FROM historic WHERE id_wallet = $1`, [data]);
};

module.exports = {
  all,
  findBy,
  create,
  historic,
  wallet,
  saldo,
  updateWallet,
  findHistoric,
};
