const { productModel } = require('../models');
const { handleGetData, handleCreate } = require('./svUtils');

const getAll = async () => {
  const data = await productModel.findAll();
  return handleGetData(data, 'Products');
};

const getById = async (productId) => {
  const data = await productModel.findById(productId);
  return handleGetData(data, 'Product');
};

const create = async (productName) => {
  const productId = await productModel.insert(productName);
  return handleCreate(productId, 'Product');
}; 

module.exports = {
  getAll,
  getById,
  create,
};