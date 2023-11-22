const camelize = require('camelize');
const connection = require('./connection');

const selectAll = async (tableName) => {
  const [items] = await connection.execute(`SELECT * FROM ${tableName}`);
  return camelize(items);
};

const selectById = async (tableName, id) => {
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;
  const [[item]] = await connection.execute(query, [id]);
  return item;
};

const selectByQuery = async (query) => {
  const [items] = await connection.execute(query);
  return camelize(items);
};

const insert = async (tableName, columns, values) => {
  const query = `INSERT INTO ${tableName} (${columns}) VALUES ('${values}');`;
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

module.exports = {
  selectAll,
  selectById,
  selectByQuery,
  insert,
};