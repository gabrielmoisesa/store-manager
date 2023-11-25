const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const chai = require('chai');
const { saleService } = require('../../../src/services');
const { salesFromDb } = require('../mocks/sale.mock');
const { saleController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('SaleController', function () {
  describe('getAll', function () {
    it('should return all sales with status 200', async function () {
      sinon.stub(saleService, 'getAll').returns({ status: 'SUCCESSFUL', data: salesFromDb });

      const req = {};

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesFromDb);
    });

    it('should return an error message and status 404 if no sales are found', async function () {
      sinon.stub(saleService, 'getAll').returns({ status: 'NOT_FOUND', data: { message: 'Sales not found' } });

      const req = {};

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sales not found' });
    });
  });

  describe('getById', function () {
    it('should return a sale with status 200', async function () {
      const id = 1;
      sinon.stub(saleService, 'getById').returns({ status: 'SUCCESSFUL', data: salesFromDb[0] });

      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesFromDb[0]);
    });

    it('should return an error message and status 404 if no sale is found', async function () {
      const id = 999;
      sinon.stub(saleService, 'getById').returns({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});