const { saleModel } = require('../models');
const { handleData } = require('./servicesUtils');

const getAll = async () => {
  const data = await saleModel.findAll();
  return handleData(data, 'Sales');
};

const getById = async (saleId) => {
  const data = await saleModel.findById(saleId);
  return handleData(data, 'Sale');
};

module.exports = {
  getAll,
  getById,
};