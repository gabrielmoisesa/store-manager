const dbUtils = require('./db/dbUtils');

const findAll = () => dbUtils.selectAll('products');

const findById = (productId) => dbUtils.selectById('products', productId);

const insert = async (productName) => {
  const id = await dbUtils.insert('products', ['name'], [productName]);
  return { id, name: productName };
}; 

module.exports = { 
  findAll,
  findById, 
  insert,
};