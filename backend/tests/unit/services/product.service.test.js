const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const { productsFromDB } = require('../mocks/product.mock');
const productService = require('../../../src/services/product.service');

describe('Product Service', function () {
  it('should return all products with success', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromDB);

    const allProducts = await productService.getAll();

    expect(allProducts).to.be.an('object');
    expect(allProducts.status).to.be.equal('SUCCESSFUL');
    expect(allProducts.data).to.be.deep.equal(productsFromDB);
  });

  it('should return a product with id 2 with success', async function () {
    sinon.stub(productModel, 'findById').resolves(productsFromDB[1]);

    const product = await productService.getById(2);

    expect(product).to.be.an('object');
    expect(product.status).to.be.equal('SUCCESSFUL');
    expect(product.data).to.be.deep.equal(productsFromDB[1]);
  });

  it('should create a product with success', async function () {
    sinon.stub(productModel, 'insert').resolves({ id: 4, name: 'Product 4' });

    const response = await productService.create('Product 4');

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('CREATED');
    expect(response.data.id).to.be.deep.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  });
});