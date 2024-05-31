const express = require('express')
const router = express.Router()
const knex = require('../../../db')
const adminController = require('../controllers/controller.admin')

// Route to access products all from database for listing in index
router.get('/products', async (req, res) => {
  try {
    const products = await knex.select('*').from('products')
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Route to access products all from database for list in admin dashboard

router.get('/admin/products', async (req, res) => {
  try {
    const products = await knex.select('*').from('products')
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/admin/products', adminController.createProduct)

module.exports = router
