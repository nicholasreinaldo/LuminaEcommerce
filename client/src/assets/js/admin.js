// client/src/assets/js/admin.js
document.addEventListener('DOMContentLoaded', async () => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const products = await response.json()

      const productTableBody = document.querySelector('.product-table-body')
      productTableBody.innerHTML = '' // Clear any existing rows

      products.forEach((product) => {
        const productRow = document.createElement('tr')

        productRow.innerHTML = `
              <td>${product.brand_name}</td>
              <td>${product.product_name}</td>
              <td>${product.stock_amount}</td>
              <td>Rp ${product.product_price}</td>
              <td><img src="/src/assets/${product.product_image_url}" alt="${
          product.product_name
        }" style="width: 50px; height: auto;" /></td>
              <td>
                <select data-id="${product.id}">
                  <option value="true" ${
                    product.listing_status ? 'selected' : ''
                  }>Yes</option>
                  <option value="false" ${
                    !product.listing_status ? 'selected' : ''
                  }>No</option>
                </select>
              </td>
              <td><button data-id="${
                product.id
              }" class="edit-button">Edit</button></td>
              <td><button data-id="${
                product.id
              }" class="delete-button">Delete</button></td>
            `

        productTableBody.appendChild(productRow)
      })

      // Add event listeners to the delete buttons
      document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click', async (event) => {
          const productId = event.target.getAttribute('data-id')
          try {
            const response = await fetch(`/api/admin/products/${productId}`, {
              method: 'DELETE',
            })
            if (response.ok) {
              // Refresh the product list after a product is deleted
              await fetchProducts()
            } else {
              console.error('Error deleting product:', response.statusText)
            }
          } catch (error) {
            console.error('Error deleting product:', error)
          }
        })
      })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Initial fetch of products
  await fetchProducts()

  // Handle form submission for adding a new product
  const addProductForm = document.getElementById('add-product-form')
  addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(addProductForm)
    const productData = {
      brand_name: formData.get('brand_name'),
      product_name: formData.get('product_name'),
      stock_amount: formData.get('stock_amount'),
      product_price: formData.get('product_price'),
      product_image_url: formData.get('product_image_url'),
      listing_status: formData.get('listing_status') === 'true',
    }

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        // Refresh the product list after a new product is added
        await fetchProducts()
        addProductForm.reset() // Clear the form
      } else {
        console.error('Error adding product:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding product:', error)
    }
  })
})
