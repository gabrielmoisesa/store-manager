const { saleModel } = require('../models');
const { handleData } = require('./servicesUtils');

const getAll = async () => {
  const data = await saleModel.findAll();
  return handleData(data, 'Sales');
};

module.exports = {
  getAll,
};