const { saleService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const { status, data } = await saleService.getAll();
  return res.status(httpMap(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.getById(id);
  return res.status(httpMap(status)).json(data);
};

const post = async (req, res) => {
  const { body } = req;
  const { status, data } = await saleService.create(body);
  return res.status(httpMap(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  post,
};