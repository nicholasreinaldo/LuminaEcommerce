// server/src/controllers/controller.admin.js
const knex = require('../../../db') // Adjust the path to your db.js

exports.createProduct = async (req, res) => {
  try {
    const {
      brand_name,
      product_name,
      stock,
      product_price,
      product_image_url,
      display,
    } = req.body

    await knex('products').insert({
      brand_name,
      product_name,
      stock,
      product_price,
      product_image_url,
      display: display === 'true', // Convert to boolean
    })

    res.status(201).json({ message: 'Product created successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
