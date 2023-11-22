const { productService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const { status, data } = await productService.getAll();
  return res.status(httpMap(status)).json(data);
};

module.exports = {
  getAll,
};