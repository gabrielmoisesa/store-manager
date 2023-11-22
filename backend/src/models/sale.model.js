const dbUtils = require('./dbUtils');

const findAll = async () => dbUtils.selectByQuery(
  `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
   FROM StoreManager.sales_products sp
   JOIN StoreManager.sales s ON sp.sale_id = s.id
   ORDER BY sp.sale_id ASC, sp.product_id ASC;`, 
);

const findById = async (saleId) => dbUtils.selectById('sales', saleId);

module.exports = {
  findAll,
  findById,
};