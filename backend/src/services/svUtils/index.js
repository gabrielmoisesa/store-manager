const handleGetData = (data, itemName) => {
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: `${itemName} not found` } };
  }
  return { status: 'SUCCESSFUL', data };
};

const handleCreate = (data, itemName) => {
  if (!data.id) {
    return { status: 'CONFLICT', data: { message: `${itemName} already exists` } };
  }
  return { status: 'CREATED', data };
};

const handleError = (error) => ({
  status: 'INVALID_VALUE',
  data: { message: error.message },
});

module.exports = {
  handleGetData,
  handleCreate,
  handleError,
};