const express = require('express')
const router = express.Router()
const adminController = require('../controllers/controller.admin')

// Route to access /admin
router.get('/', (req, res) => res.render('admin'))

// Route to create a new product
router.post('/products', adminController.createProduct)

// Route to delete a product
router.delete('/products/:id', adminController.deleteProduct)

// Route to update a product
router.put('/products/:id', adminController.updateProduct)

// Route to update tweak listing status
router.put('/products/:id/listing-status', adminController.updateListingStatus)

module.exports = router
