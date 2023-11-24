const sinon = require('sinon');
const { expect } = require('chai');
const { salesFromDb, salesWithIdOne, salesRequest } = require('../mocks/sale.mock');
const connection = require('../../../src/models/db/connection');
const saleModel = require('../../../src/models/sale.model');

describe('Sale Model', function () {
  it('should return all sales with success', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);

    const sales = await saleModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesFromDb);
  });

  it('should return sales with id 1 with success', async function () {
    sinon.stub(connection, 'execute').resolves([salesWithIdOne]);

    const sales = await saleModel.findById(1);

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesWithIdOne);
  });

  it('should create a sale with success', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const data = await saleModel.insert(salesRequest);

    expect(data).to.be.an('object');
    expect(data).to.have.property('id');
    expect(data).to.have.property('itemsSold');
    expect(data.id).to.be.equal(1);
    expect(data.itemsSold).to.be.an('array');
    expect(data.itemsSold).to.be.deep.equal(salesRequest);
  });

  afterEach(function () {
    sinon.restore();
  });
});