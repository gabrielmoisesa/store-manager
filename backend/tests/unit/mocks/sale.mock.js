const salesFromDb = [
  {
    saleId: 1,
    date: '2023-11-23T23:44:45.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-11-23T21:44:45.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-11-23T22:44:45.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesWithIdOne = [
  {
    date: '2023-11-23T23:44:45.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-11-23T21:44:45.000Z',
    productId: 2,
    quantity: 10,
  },
];

const salesRequest = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  salesFromDb,
  salesWithIdOne,
  salesRequest,
};