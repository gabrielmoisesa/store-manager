const dbUtils = require('./dbUtils');

const findAll = () => dbUtils.selectAll('products');

const findById = (productId) => dbUtils.selectById('products', productId);

module.exports = { 
  findAll,
  findById, 
};