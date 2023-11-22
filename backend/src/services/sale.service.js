const { saleModel } = require('../models');
const { handleGetData } = require('./svUtils');

const getAll = async () => {
  const data = await saleModel.findAll();
  return handleGetData(data, 'Sales');
};

const getById = async (saleId) => {
  const data = await saleModel.findById(saleId);
  return handleGetData(data, 'Sale');
};

module.exports = {
  getAll,
  getById,
};