const dbUtils = require('./dbUtils');

const findAll = async () => dbUtils.selectAll('sales');

module.exports = {
  findAll,
};