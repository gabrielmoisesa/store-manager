const connection = require('./connection');

const selectAll = async (tableName) => {
  const [items] = await connection.execute(`SELECT * FROM ${tableName}`);
  return items;
};

module.exports = {
  selectAll,
};