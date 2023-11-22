const { productModel } = require('../models');

const getAll = async () => {
  const data = await productModel.findAll();
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Products not found' } };
  return { status: 'SUCCESSFUL', data };
};

const getById = async (productId) => {
  const data = await productModel.findById(productId);
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  getAll,
  getById,
};