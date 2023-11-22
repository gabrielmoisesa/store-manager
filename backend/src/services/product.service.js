const { productModel } = require('../models');

const getAll = async () => {
  const data = await productModel.getAll();
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Products not found' } };
  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  getAll,
};