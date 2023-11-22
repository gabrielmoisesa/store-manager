const express = require('express');
const { productRoutes, saleRoutes } = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(express.json());
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);
app.use(errorHandler);

module.exports = app;
