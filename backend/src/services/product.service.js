const { productModel } = require('../models');
const { handleGetData, handleCreate, handleError } = require('./svUtils');
const schemas = require('./validations/schemas');

const getAll = async () => {
  const data = await productModel.findAll();
  return handleGetData(data, 'Products');
};

const getById = async (productId) => {
  const data = await productModel.findById(productId);
  return handleGetData(data, 'Product');
};

const create = async (productName) => {
  const { error } = schemas.productName.validate(productName);
  if (error) return handleError(error);

  const data = await productModel.insert(productName);
  return handleCreate(data, 'Product');
}; 

module.exports = {
  getAll,
  getById,
  create,
};