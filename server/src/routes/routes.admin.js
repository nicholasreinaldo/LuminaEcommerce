const express = require('express')
const router = express.Router()
const adminController = require('../controllers/controller.admin')

router.get('/', (req, res) => res.render('admin'))

// Route to create a product
router.post('/products', adminController.createProduct)

// Route to delete a product
router.delete('/products/:id', adminController.deleteProduct)

module.exports = router
