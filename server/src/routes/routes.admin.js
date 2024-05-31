// /server/src/routes/routes.admin.js

const express = require('express')
const router = express.Router()
const adminController = require('../controllers/controller.admin')

// Route to access /admin
router.get('/', (req, res) => res.render('admin'))

// Route to create a new product
router.post('/products', adminController.createProduct)

// Route to delete a product
router.delete('/products/:id', adminController.deleteProduct)

module.exports = router
