const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  return sales;
};

module.exports = {
  findAll,
};