const sinon = require('sinon');
const { expect } = require('chai');
const { saleModel } = require('../../../src/models');
const { salesFromDb, salesWithIdOne, newSale } = require('../mocks/sale.mock');
const saleService = require('../../../src/services/sale.service');

describe('Sale Service', function () {
  describe('getAll', function () {
    it('should return all sales with success', async function () {
      sinon.stub(saleModel, 'findAll').resolves(salesFromDb);
  
      const allSales = await saleService.getAll();
  
      expect(allSales).to.be.an('object');
      expect(allSales.status).to.be.equal('SUCCESSFUL');
      expect(allSales.data).to.be.deep.equal(salesFromDb);
    });

    it('should return an empty array when there are no sales', async function () {
      sinon.stub(saleModel, 'findAll').resolves([]);
  
      const allSales = await saleService.getAll();
  
      expect(allSales).to.be.an('object');
      expect(allSales.status).to.be.equal('NOT_FOUND');
      expect(allSales.data).to.be.deep.equal({ message: 'Sales not found' });
    });
  });

  describe('getById', function () {
    it('should return sales with id 1 with success', async function () {
      sinon.stub(saleModel, 'findById').resolves(salesWithIdOne);
  
      const sale = await saleService.getById(1);
  
      expect(sale).to.be.an('object');
      expect(sale.status).to.be.equal('SUCCESSFUL');
      expect(sale.data).to.be.deep.equal(salesWithIdOne);
    });

    it('should return an error when trying to get a sale with invalid id', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);
  
      const sale = await saleService.getById('invalidId');
  
      expect(sale).to.be.an('object');
      expect(sale.status).to.be.equal('NOT_FOUND');
      expect(sale.data).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('create', function () {
    it('should create a sale with success', async function () {
      sinon.stub(saleModel, 'insert').resolves({ id: 4, itemsSold: newSale });
  
      const response = await saleService.create([newSale]);
  
      expect(response).to.be.an('object');
      expect(response.status).to.be.equal('CREATED');
      expect(response.data.id).to.be.deep.equal(4);
    });
    
    it('should return an error when trying to create a sale with invalid data', async function () {
      sinon.stub(saleModel, 'insert').resolves({ id: 4, itemsSold: newSale });
  
      const response = await saleService.create([{}]);
  
      expect(response).to.be.an('object');
      expect(response.status).to.be.equal('BAD_REQUEST');
      expect(response.data).to.be.deep.equal({ message: '"productId" is required' });
    });
  });

  describe('update', function () {
    it('should update a sale with success', async function () {
      sinon.stub(saleModel, 'findById').resolves(salesWithIdOne);
      sinon.stub(saleModel, 'update').resolves({ affectedRows: 1 });
  
      const response = await saleService.update(1, 1, 10);
  
      expect(response).to.be.an('object');
      expect(response.status).to.be.equal('SUCCESSFUL');
      expect(response.data).to.be.deep.equal({ ...salesWithIdOne[0], saleId: 1 });
    });
    
    it('should return an error when trying to update a sale with invalid data', async function () {
      sinon.stub(saleModel, 'findById').resolves(salesWithIdOne);
      sinon.stub(saleModel, 'update').resolves({ id: 1, itemsSold: newSale });
  
      const response = await saleService.update(1, 1, 'invalidQuantity');
  
      expect(response).to.be.an('object');
      expect(response.status).to.be.equal('BAD_REQUEST');
      expect(response.data).to.be.deep.equal({ message: '"quantity" must be a number' });
    });
  });

  describe('deleteById', function () {
    it('should delete a sale with success', async function () {
      sinon.stub(saleModel, 'deleteById').resolves({ affectedRows: 1 });
  
      const response = await saleService.deleteById(1);
  
      expect(response).to.be.an('object');
      expect(response.status).to.be.equal('NO_CONTENT');
      expect(response.data).to.be.deep.equal({});
    });
    
    it('should return an error when trying to delete a sale with invalid id', async function () {
      sinon.stub(saleModel, 'deleteById').resolves({ affectedRows: 0 });
  
      const response = await saleService.deleteById('invalidId');
  
      expect(response).to.be.an('object');
      expect(response.status).to.be.equal('NOT_FOUND');
      expect(response.data).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});