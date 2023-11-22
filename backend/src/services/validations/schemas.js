const Joi = require('joi');

const productName = Joi.string().min(5).required().label('name');

module.exports = {
  productName,
};