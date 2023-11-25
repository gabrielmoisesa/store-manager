const { expect } = require('chai');
const { handleGetData, handleCreate, handleError, handleUpdate, handleDelete } = require('../../../src/services/svUtils');

describe('svUtils', function () {
  describe('handleGetData', function () {
    it('should return NOT_FOUND when data is empty', function () {
      const data = [];
      const itemName = 'product';
      const expected = { status: 'NOT_FOUND', data: { message: `${itemName} not found` } };
      const result = handleGetData(data, itemName);
      expect(result).to.be.deep.equal(expected);
    });

    it('should return SUCCESSFUL when data is not empty', function () {
      const data = [{ id: 1, name: 'product 1' }];
      const itemName = 'product';
      const expected = { status: 'SUCCESSFUL', data };
      const result = handleGetData(data, itemName);
      expect(result).to.be.deep.equal(expected);
    });
  });

  describe('handleCreate', function () {
    it('should return CONFLICT when data.id is undefined', function () {
      const data = { name: 'product 1' };
      const itemName = 'product';
      const expected = { status: 'CONFLICT', data: { message: `${itemName} already exists` } };
      const result = handleCreate(data, itemName);
      expect(result).to.be.deep.equal(expected);
    });

    it('should return CREATED when data.id is defined', function () {
      const data = { id: 1, name: 'product 1' };
      const itemName = 'product';
      const expected = { status: 'CREATED', data };
      const result = handleCreate(data, itemName);
      expect(result).to.be.deep.equal(expected);
    });
  });

  describe('handleError', function () {
    it('should return INVALID_VALUE when error.message includes length must be at least', function () {
      const error = { message: 'length must be at least 3' };
      const expected = { status: 'INVALID_VALUE', data: { message: error.message } };
      const result = handleError(error);
      expect(result).to.be.deep.equal(expected);
    });

    it('should return INVALID_VALUE when error.message includes must be greater than', function () {
      const error = { message: 'must be greater than 0' };
      const expected = { status: 'INVALID_VALUE', data: { message: error.message } };
      const result = handleError(error);
      expect(result).to.be.deep.equal(expected);
    });

    it('should return BAD_REQUEST when error.message does not include length must be at least or must be greater than', function () {
      const error = { message: 'error message' };
      const expected = { status: 'BAD_REQUEST', data: { message: error.message } };
      const result = handleError(error);
      expect(result).to.be.deep.equal(expected);
    });
  });

  describe('handleUpdate', function () {
    it('should return NOT_FOUND when result.affectedRows is 0', function () {
      const result = { affectedRows: 0 };
      const itemName = 'product';
      const data = { id: 1, name: 'product 1' };
      const expected = { status: 'NOT_FOUND', data: { message: `${itemName} not found` } };
      const result2 = handleUpdate(result, itemName, data);
      expect(result2).to.be.deep.equal(expected);
    });

    it('should return SUCCESSFUL when result.affectedRows is not 0', function () {
      const result = { affectedRows: 1 };
      const itemName = 'product';
      const data = { id: 1, name: 'product 1' };
      const expected = { status: 'SUCCESSFUL', data };
      const result2 = handleUpdate(result, itemName, data);
      expect(result2).to.be.deep.equal(expected);
    });

    it('should return NOT_FOUND when itemName is Sale Product and result.affectedRows is 0', function () {
      const result = { affectedRows: 0 };
      const itemName = 'Sale Product';
      const data = { id: 1, name: 'product 1' };
      const expected = { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
      const result2 = handleUpdate(result, itemName, data);
      expect(result2).to.be.deep.equal(expected);
    });
  });

  describe('handleDelete', function () {
    it('should return NOT_FOUND when result.affectedRows is 0', function () {
      const result = { affectedRows: 0 };
      const itemName = 'product';
      const expected = { status: 'NOT_FOUND', data: { message: `${itemName} not found` } };
      const result2 = handleDelete(result, itemName);
      expect(result2).to.be.deep.equal(expected);
    });

    it('should return NO_CONTENT when result.affectedRows is not 0', function () {
      const result = { affectedRows: 1 };
      const itemName = 'product';
      const expected = { status: 'NO_CONTENT', data: {} };
      const result2 = handleDelete(result, itemName);
      expect(result2).to.be.deep.equal(expected);
    });
  });
});