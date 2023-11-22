const { productModel } = require('../models');

const getAll = () => {
  const data = productModel.getAll();
  if (!data) return { status: 'NOT_FOUND', message: 'Products not found' };
  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  getAll,
};