const connection = require('./connection');
const dbUtils = require('./dbUtils');

const findAll = async () => dbUtils.selectAll('products');

const findById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [productId]);
  return product;
};

module.exports = { 
  findAll,
  findById, 
};