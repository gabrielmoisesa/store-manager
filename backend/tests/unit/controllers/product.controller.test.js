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

  describe('post', function () {
    it('should create a product with status 201', async function () {
      const name = 'Product 1';
      sinon.stub(productService, 'create').returns({ status: 'CREATED', data: { id: 1, name } });
  
      const req = { body: { name } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.post(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 1, name });
    });

    it('should return an error message and status 422 if name is not provided', async function () {
      sinon.stub(productService, 'create').returns({ status: 'INVALID_VALUE', data: { message: 'Name is required' } });
  
      const req = { body: {} };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.post(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
    });
  });

  describe('put', function () {
    it('should update a product with status 200', async function () {
      const id = 1;
      const name = 'Product 1';
      sinon.stub(productService, 'update').returns({ status: 'SUCCESSFUL', data: { id, name } });
  
      const req = { params: { id }, body: { name } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.put(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id, name });
    });

    it('should return an error message and status 422 if name is not provided', async function () {
      const id = 1;
      sinon.stub(productService, 'update').returns({ status: 'INVALID_VALUE', data: { message: 'Name is required' } });
  
      const req = { params: { id }, body: {} };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.put(req, res);
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: 'Name is required' });
    });
  });

  describe('deleteById', function () {
    it('should delete a product with status 200', async function () {
      const id = 1;
      sinon.stub(productService, 'deleteById').returns({ status: 'SUCCESSFUL', data: { id } });
  
      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.deleteById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id });
    });

    it('should return an error message and status 404 if product is not found', async function () {
      const id = 1;
      sinon.stub(productService, 'deleteById').returns({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  
      const req = { params: { id } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productController.deleteById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});