const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.get('/', saleController.getAll);
router.get('/:id', saleController.getById);
router.post('/', saleController.post);

module.exports = router;