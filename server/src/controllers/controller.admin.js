// server/controllers/controller.admin.js
const knex = require('../../../db')

exports.createProduct = async (req, res) => {
  const {
    brand_name,
    product_name,
    stock_amount,
    product_price,
    product_image_url,
  } = req.body

  try {
    await knex('products').insert({
      brand_name,
      product_name,
      stock_amount,
      product_price,
      product_image_url,
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

exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const {
    brand_name,
    product_name,
    stock_amount,
    product_price,
    product_image_url,
  } = req.body

  try {
    await knex('products').where({ id }).update({
      brand_name,
      product_name,
      stock_amount,
      product_price,
      product_image_url,
    })
    res.status(200).json({ message: 'Product updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.updateListingStatus = async (req, res) => {
  const { id } = req.params
  const { listing_status } = req.body

  // Ensure listing_status is a boolean
  const status = listing_status === 'true' || listing_status === true

  try {
    await knex('products').where({ id }).update({ listing_status: status })
    res.status(200).json({ message: 'Listing status updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
