document.addEventListener('DOMContentLoaded', async () => {
  const handleEditProduct = async (event) => {
    const productId = event.target.getAttribute('data-id')

    try {
      const response = await fetch(`/api/admin/products/${productId}`)
      const product = await response.json()

      if (response.ok) {
        document.getElementById('edit_product_id').value = product.id
        document.getElementById('edit_brand_name').value = product.brand_name
        document.getElementById('edit_product_name').value =
          product.product_name
        document.getElementById('edit_stock_amount').value =
          product.stock_amount
        document.getElementById('edit_product_price').value =
          product.product_price
        document.getElementById('edit_product_image_url').value =
          product.product_image_url
        document.getElementById('edit_listing_status').value =
          product.listing_status.toString()

        // Show the modal
        const modal = document.getElementById('editProductModal')
        modal.style.display = 'block'
        console.log(
          'Modal display style after setting to block:',
          modal.style.display,
        ) // Debugging
      } else {
        console.error('Error fetching product:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  const handleDeleteProduct = async (event) => {
    const productId = event.target.getAttribute('data-id')

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Refresh the product list after deletion
        await fetchProducts()
      } else {
        console.error('Error deleting product:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

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
          <td><img src="/src/assets/product-images/${
            product.product_image_url
          }" alt="${
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
          }" class="edit-btn">Edit</button></td>
          <td><button data-id="${
            product.id
          }" class="delete-btn">Delete</button></td>
        `

        productTableBody.appendChild(productRow)
      })

      // Attach event listeners to edit and delete buttons
      document.querySelectorAll('.edit-btn').forEach((button) => {
        console.log(
          'Attaching event listener to edit button with id:',
          button.getAttribute('data-id'),
        ) // Debug log
        button.addEventListener('click', handleEditProduct)
      })

      document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', handleDeleteProduct)
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

  // Handle form submission for editing a product
  const editProductForm = document.getElementById('edit-product-form')
  editProductForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(editProductForm)
    const productId = formData.get('product_id')
    const productData = {
      brand_name: formData.get('brand_name'),
      product_name: formData.get('product_name'),
      stock_amount: formData.get('stock_amount'),
      product_price: formData.get('product_price'),
      product_image_url: formData.get('product_image_url'),
      listing_status: formData.get('listing_status') === 'true',
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        // Refresh the product list after editing
        await fetchProducts()
        editProductForm.reset() // Clear the form

        // Hide the modal
        document.getElementById('editProductModal').style.display = 'none'
      } else {
        console.error('Error editing product:', response.statusText)
      }
    } catch (error) {
      console.error('Error editing product:', error)
    }
  })

  // Close the modal when the user clicks on <span> (x)
  const closeModal = document.querySelector('.close')
  closeModal.addEventListener('click', () => {
    document.getElementById('editProductModal').style.display = 'none'
  })

  // Close the modal when the user clicks outside of the modal
  window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('editProductModal')) {
      document.getElementById('editProductModal').style.display = 'none'
    }
  })
})
