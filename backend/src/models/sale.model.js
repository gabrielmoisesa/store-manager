const dbUtils = require('./db/dbUtils');

const findAll = async () => dbUtils.selectByQuery(
  `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
   FROM StoreManager.sales_products sp
   JOIN StoreManager.sales s ON sp.sale_id = s.id
   ORDER BY sp.sale_id ASC, sp.product_id ASC;`, 
);

const findById = async (saleId) => dbUtils.selectByQuery(
  `SELECT s.date, sp.product_id, sp.quantity
   FROM StoreManager.sales_products sp
   JOIN StoreManager.sales s ON sp.sale_id = s.id
   WHERE sale_id = ${saleId}
   ORDER BY sp.sale_id ASC, sp.product_id ASC;`,
);

const insert = async (saleData) => {
  const saleId = await dbUtils.insertNewSaleDate();

  await saleData.forEach(async (product) => {
    dbUtils.insert(
      'sales_products',
      ['sale_id', 'product_id', 'quantity'],
      [saleId, product.productId, product.quantity],
    );
  });

  return { id: saleId, itemsSold: [...saleData] };
};

module.exports = {
  findAll,
  findById,
  insert,
};