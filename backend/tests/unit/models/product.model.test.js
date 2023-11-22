const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { productsFromDB, productWithIdOne } = require('../mocks/product.mock');
const productModel = require('../../../src/models/product.model');

describe('Product Model', function () {
  it('should return a product with id 1 with success', async function () {
    sinon.stub(connection, 'execute').resolves([[productsFromDB[0]]]);

    const product = await productModel.findById(1);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productWithIdOne);
  });

  it('should return all products with success', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(productsFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});