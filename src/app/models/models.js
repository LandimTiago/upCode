const db = require("../../config/db");

const all = function () {
  return db.query(`SELECT * FROM account ORDER BY id`);
};
const create = async function (data) {
  const query = `
    INSERT INTO account (
        accountnumber,
        name,
        cpf,
        birth,
        wallet
    ) VALUES ($1, $2, $3, $4, $5) returning id
`;

  const results = await all();
  const contador = results.rows.length;

  const accountNumber = new Date().getFullYear() + `${contador + 1}`;

  const values = [
    accountNumber,
    data.name,
    data.cpf,
    data.birth,
    data.wallet || 0,
  ];

  return db.query(query, values), accountNumber;
};
const findBy = function (accountNumber) {
  return db.query(`SELECT * FROM account WHERE accountnumber = $1`, [
    accountNumber,
  ]);
};
const transaction = function (data) {
  const query = `
    UPDATE account SET (
      wallet
  ) VALUES ($1) WHERE accountnumber = $2
  `;

  const values = [data.wallet];

  return db.query(query, values);
};

module.exports = {
  all,
  create,
  findBy,
  transaction,
};
