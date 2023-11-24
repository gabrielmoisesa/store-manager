const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.post);
router.put('/:id', productController.put);
router.delete('/:id', productController.deleteById);

module.exports = router;