const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const chai = require('chai');
const { saleService } = require('../../../src/services');
const { salesFromDb } = require('../mocks/sale.mock');
const { saleController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('SaleController', function () {
  const saleNotFoundString = 'Sale not found';

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
      sinon.stub(saleService, 'getById').returns({ status: 'NOT_FOUND', data: { message: saleNotFoundString } });

      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.getById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: saleNotFoundString });
    });
  });

  describe('post', function () {
    it('should create a sale with status 201', async function () {
      const body = [
        {
          productId: 1,
          quantity: 1,
        },
      ];
      sinon.stub(saleService, 'create').returns({ status: 'CREATED', data: salesFromDb[0] });

      const req = { body };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.post(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(salesFromDb[0]);
    });

    it('should return an error message and status 422 if quantity is not a number', async function () {
      const body = [
        {
          productId: 1,
          quantity: 'one',
        },
      ];
      sinon.stub(saleService, 'create').returns({ status: 'INVALID_VALUE', data: { message: '"quantity" must be a number' } });

      const req = { body };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.post(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be a number' });
    });
  });

  describe('put', function () {
    it('should update a sale with status 200', async function () {
      const saleId = 1;
      const productId = 1;
      const quantity = 2;
      sinon.stub(saleService, 'update').returns({ status: 'SUCCESSFUL', data: salesFromDb[0] });

      const req = { params: { saleId, productId }, body: { quantity } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.put(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesFromDb[0]);
    });

    it('should return an error message and status 422 if quantity is not a number', async function () {
      const saleId = 1;
      const productId = 1;
      const quantity = 'one';
      sinon.stub(saleService, 'update').returns({ status: 'INVALID_VALUE', data: { message: '"quantity" must be a number' } });

      const req = { params: { saleId, productId }, body: { quantity } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.put(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be a number' });
    });

    it('should return an error message and status 404 if no sale is found', async function () {
      const saleId = 999;
      const productId = 1;
      const quantity = 2;
      sinon.stub(saleService, 'update').returns({ status: 'NOT_FOUND', data: { message: saleNotFoundString } });

      const req = { params: { saleId, productId }, body: { quantity } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.put(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: saleNotFoundString });
    });
  });

  describe('deleteById', function () {
    it('should delete a sale with status 200', async function () {
      const id = 1;
      sinon.stub(saleService, 'deleteById').returns({ status: 'SUCCESSFUL', data: { message: 'Sale deleted successfully' } });

      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.deleteById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Sale deleted successfully' });
    });

    it('should return an error message and status 404 if no sale is found', async function () {
      const id = 999;
      sinon.stub(saleService, 'deleteById').returns({ status: 'NOT_FOUND', data: { message: saleNotFoundString } });

      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await saleController.deleteById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: saleNotFoundString });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});