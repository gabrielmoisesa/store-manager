const httpCodes = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
};

const httpMap = (status) => httpCodes[status] || 500;

module.exports = httpMap;