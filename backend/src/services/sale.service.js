const { saleModel, productModel } = require('../models');
const {
  handleGetData,
  handleCreate,
  handleError,
  handleDelete,
  handleUpdate,
} = require('./svUtils');
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

const update = async (saleId, productId, quantity) => {
  const { error } = schemas.quantity.validate(quantity);
  if (error) return handleError(error);

  const findSale = await saleModel.findById(saleId);
  if (!findSale || findSale.length <= 0) return handleGetData(null, 'Sale');

  const result = await saleModel.update(saleId, productId, quantity);
  const updatedSale = (await saleModel.findById(saleId)).find(
    (sale) => sale.productId === Number(productId),
  );

  const data = { ...updatedSale, saleId: Number(saleId) };
  return handleUpdate(result, 'Sale Product', data);
};

const deleteById = async (saleId) => {
  const result = await saleModel.deleteById(saleId);
  return handleDelete(result, 'Sale');
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};