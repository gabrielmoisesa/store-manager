const dbUtils = require('./db/dbUtils');

const findAll = () => dbUtils.selectAll('products');

const findById = (productId) => dbUtils.selectById('products', productId);

module.exports = { 
  findAll,
  findById, 
};