const knex = require('../../../db')

exports.createProduct = async (req, res) => {
  const {
    brand_name,
    product_name,
    stock_amount,
    product_price,
    product_image_url,
    listing_status,
  } = req.body

  try {
    await knex('products').insert({
      brand_name,
      product_name,
      stock_amount,
      product_price,
      product_image_url,
      listing_status,
    })
    res.status(201).json({ message: 'Product created successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    await knex('products').where({ id }).del()
    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
