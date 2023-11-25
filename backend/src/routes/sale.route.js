const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.get('/', saleController.getAll);
router.get('/:id', saleController.getById);
router.post('/', saleController.post);
router.put('/:saleId/products/:productId/quantity', saleController.put);
router.delete('/:id', saleController.deleteById);

module.exports = router;