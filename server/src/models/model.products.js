const knex = require('../../../db')

// Models for the product management features

const createProduct = async (productData) => {
  return await knex('products').insert(productData)
}

const deleteProduct = async (id) => {
  return await knex('products').where({ id }).del()
}

const updateProduct = async (id, productData) => {
  return await knex('products').where({ id }).update(productData)
}

const updateListingStatus = async (id, status) => {
  return await knex('products').where({ id }).update({ listing_status: status })
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  updateListingStatus,
}
