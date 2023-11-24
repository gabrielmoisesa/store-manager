const dbUtils = require('./db/dbUtils');

const findAll = () => dbUtils.selectAll('products');

const findById = (productId) => dbUtils.selectById('products', productId);

const insert = async (productName) => {
  const id = await dbUtils.insert('products', ['name'], [productName]);
  return { id, name: productName };
};

const update = async (id, productName) => {
  const result = await dbUtils.update('products', 'name', id, productName);
  return result;
};

const deleteById = async (id) => {
  const result = await dbUtils.deleteById('products', id);
  return result;
};

module.exports = { 
  findAll,
  findById, 
  insert,
  update,
  deleteById,
};