const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const chai = require('chai');
const { productService } = require('../../../src/services');
const { productsFromDB } = require('../mocks/product.mock');
const productController = require('../../../src/controllers/product.controller');

chai.use(sinonChai);

describe('ProductController', function () {
  describe('getAll', function () {
    it('should return all products with status 200', async function () {
      sinon.stub(productService, 'getAll').returns({ status: 'SUCCESSFUL', data: productsFromDB });
  
      const req = {};

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB);
    });

    it('should return an error message and status 404 if no products are found', async function () {
      sinon.stub(productService, 'getAll').returns({ status: 'NOT_FOUND', data: { message: 'Products not found' } });
  
      const req = {};

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Products not found' });
    });
  });
  describe('getById', function () {
    it('should return a product with status 200', async function () {
      const id = 1;
      sinon.stub(productService, 'getById').returns({ status: 'SUCCESSFUL', data: productsFromDB[0] });
  
      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsFromDB[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});