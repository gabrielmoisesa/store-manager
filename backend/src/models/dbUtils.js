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

module.exports = {
  selectAll,
  selectById,
};