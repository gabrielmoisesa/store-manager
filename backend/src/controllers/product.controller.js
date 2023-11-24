const { productService } = require('../services');
const httpMap = require('../utils/httpMap');

const getAll = async (_req, res) => {
  const { status, data } = await productService.getAll();
  return res.status(httpMap(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.getById(id);
  return res.status(httpMap(status)).json(data);  
};

const post = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productService.create(name);
  return res.status(httpMap(status)).json(data);
};

const put = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productService.update(id, name);
  return res.status(httpMap(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  post,
  put,
};