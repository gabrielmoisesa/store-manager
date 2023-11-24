const sinon = require('sinon');
const { expect } = require('chai');
const { salesFromDb, salesWithIdOne } = require('../mocks/sale.mock');
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

    const id = await saleModel.insert(salesWithIdOne);

    expect(id).to.be.an('number');
    expect(id).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});