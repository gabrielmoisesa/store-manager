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

const handleError = (error) => {
  const { message } = error;

  if (message.includes('length must be at least')) {
    return { status: 'INVALID_VALUE', data: { message } };
  }

  return { status: 'BAD_REQUEST', data: { message } };
};

module.exports = {
  handleGetData,
  handleCreate,
  handleError,
};