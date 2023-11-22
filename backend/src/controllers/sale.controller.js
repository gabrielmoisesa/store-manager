const { saleService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const { status, data } = await saleService.getAll();
  return res.status(httpMap(status)).json(data);
};

module.exports = {
  getAll,
};