const handleGetData = (data, itemName) => {
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: `${itemName} not found` } };
  }
  return { status: 'SUCCESSFUL', data };
};

const handleCreate = (id, itemName) => {
  if (!id) {
    return { status: 'CONFLICT', data: { message: `${itemName} already exists` } };
  }
  return { status: 'CREATED', data: id };
};

module.exports = {
  handleGetData,
  handleCreate,
};