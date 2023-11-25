const Joi = require('joi');

const productName = Joi.string().min(5).required().label('name');

const quantity = Joi.number().integer().min(1).required()
  .label('quantity');

const sale = Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity,
});

const saleData = Joi.array().items(sale);

module.exports = {
  productName,
  quantity,
  saleData,
};