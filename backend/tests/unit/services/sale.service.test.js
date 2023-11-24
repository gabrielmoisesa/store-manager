const sinon = require('sinon');
const { expect } = require('chai');
const { saleModel } = require('../../../src/models');
const { salesFromDb, salesWithIdOne, newSale } = require('../mocks/sale.mock');
const saleService = require('../../../src/services/sale.service');

describe('Sale Service', function () {
  it('should return all sales with success', async function () {
    sinon.stub(saleModel, 'findAll').resolves(salesFromDb);

    const allSales = await saleService.getAll();

    expect(allSales).to.be.an('object');
    expect(allSales.status).to.be.equal('SUCCESSFUL');
    expect(allSales.data).to.be.deep.equal(salesFromDb);
  });

  it('should return sales with id 1 with success', async function () {
    sinon.stub(saleModel, 'findById').resolves(salesWithIdOne);

    const sale = await saleService.getById(1);

    expect(sale).to.be.an('object');
    expect(sale.status).to.be.equal('SUCCESSFUL');
    expect(sale.data).to.be.deep.equal(salesWithIdOne);
  });

  it('should create a sale with success', async function () {
    sinon.stub(saleModel, 'insert').resolves({ id: 4, itemsSold: newSale });

    const response = await saleService.create([newSale]);

    expect(response).to.be.an('object');
    expect(response.status).to.be.equal('CREATED');
    expect(response.data.id).to.be.deep.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  });
});