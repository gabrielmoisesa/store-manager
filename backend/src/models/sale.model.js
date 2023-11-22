const dbUtils = require('./dbUtils');

const findAll = async () => dbUtils.selectAll('sales_products');

const findById = async (saleId) => dbUtils.selectById('sales', saleId);

module.exports = {
  findAll,
  findById,
};