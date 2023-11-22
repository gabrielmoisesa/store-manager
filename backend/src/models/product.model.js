const dbUtils = require('./db/dbUtils');

const findAll = () => dbUtils.selectAll('products');

const findById = (productId) => dbUtils.selectById('products', productId);

const insert = (productName) => dbUtils.insert('products', 'name', productName);

module.exports = { 
  findAll,
  findById, 
  insert,
};