const { saleModel, productModel } = require('../models');
const { handleGetData, handleCreate, handleError, handleDelete } = require('./svUtils');
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

  const productPromises = saleData.map(async (sale) => {
    const findProduct = await productModel.findById(sale.productId);
    return findProduct;
  });

  const foundProducts = await Promise.all(productPromises);

  if (foundProducts.some((product) => !product)) {
    return handleGetData(null, 'Product');
  }

  const data = await saleModel.insert(saleData);
  return handleCreate(data, 'Sale');
};

const deleteById = async (saleId) => {
  const result = await saleModel.deleteById(saleId);
  return handleDelete(result, 'Sale');
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
};