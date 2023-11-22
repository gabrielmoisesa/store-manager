const { productModel } = require('../models');
const { handleData } = require('./servicesUtils');

const getAll = async () => {
  const data = await productModel.findAll();
  return handleData(data, 'Products');
};

const getById = async (productId) => {
  const data = await productModel.findById(productId);
  return handleData(data, 'Product');
};

module.exports = {
  getAll,
  getById,
};