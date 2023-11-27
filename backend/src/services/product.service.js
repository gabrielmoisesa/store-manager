const { productModel } = require('../models');
const {
  handleGetData,
  handleCreate,
  handleError,
  handleUpdate,
  handleDelete,
} = require('./svUtils');
const schemas = require('./validations/schemas');

const getAll = async () => {
  const data = await productModel.findAll();
  return handleGetData(data, 'Products');
};

const getById = async (productId) => {
  const data = await productModel.findById(productId);
  return handleGetData(data, 'Product');
};

const getByName = async (productName) => {
  const data = await productModel.findByName(productName);
  return { status: 'SUCCESSFUL', data };
};

const create = async (productName) => {
  const { error } = schemas.productName.validate(productName);
  if (error) return handleError(error);

  const data = await productModel.insert(productName);
  return handleCreate(data, 'Product');
}; 

const update = async (id, productName) => {
  const { error } = schemas.productName.validate(productName);
  if (error) return handleError(error);

  const result = await productModel.update(id, productName);
  const data = { id: Number(id), name: productName };
  return handleUpdate(result, 'Product', data);
};

const deleteById = async (id) => {
  const result = await productModel.deleteById(id);
  return handleDelete(result, 'Product');
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  deleteById,
};