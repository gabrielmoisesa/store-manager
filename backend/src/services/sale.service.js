const { saleModel } = require('../models');
const { handleGetData, handleCreate } = require('./svUtils');

const getAll = async () => {
  const data = await saleModel.findAll();
  return handleGetData(data, 'Sales');
};

const getById = async (saleId) => {
  const data = await saleModel.findById(saleId);
  return handleGetData(data, 'Sale');
};

const create = async (saleData) => {
  const data = await saleModel.insert(saleData);
  return handleCreate(data, 'Sale');
};

module.exports = {
  getAll,
  getById,
  create,
};