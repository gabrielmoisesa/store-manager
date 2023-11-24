const { saleModel, productModel } = require('../models');
const { handleGetData, handleCreate, handleError } = require('./svUtils');
const schemas = require('./validations/schemas');

const getAll = async () => {
  const data = await saleModel.findAll();
  return handleGetData(data, 'Sales');
};

const getById = async (saleId) => {
  const data = await saleModel.findById(saleId);
  return handleGetData(data, 'Sale');
};

const create = async (saleData) => {
  const { error } = schemas.saleData.validate(saleData);
  if (error) return handleError(error);

  const findProduct = await productModel.findById(saleData[0].productId);
  if (!findProduct) return handleGetData(findProduct, 'Product');

  const data = await saleModel.insert(saleData);
  return handleCreate(data, 'Sale');
};

module.exports = {
  getAll,
  getById,
  create,
};