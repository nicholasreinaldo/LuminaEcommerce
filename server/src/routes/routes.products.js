const express = require('express')
const router = express.Router()
const knex = require('../../../db')

router.get('/products', async (req, res) => {
  try {
    const products = await knex.select('*').from('products')
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
