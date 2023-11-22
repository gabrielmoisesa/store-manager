const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');
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

  it('should create a product with success', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const data = await productModel.insert(productWithIdOne);

    expect(data).to.be.an('object');
    expect(data).to.have.property('name');
    expect(data.id).to.be.an('number');
    expect(data.id).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});