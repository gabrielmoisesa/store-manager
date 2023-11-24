const Joi = require('joi');

const productName = Joi.string().min(5).required().label('name');

const saleData = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  productName,
  saleData,
};