document.addEventListener('DOMContentLoaded', async () => {
  // Function to format price by adding periods as thousand separators
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  // Function to show notification with a given message
  function showNotification(message) {
    const notification = document.getElementById('notification')
    const notificationMessage = document.getElementById('notification-message')
    notificationMessage.textContent = message
    notification.style.display = 'block'

    // Hide the notification after 5 seconds
    setTimeout(() => {
      notification.style.display = 'none'
    }, 5000)
  }

  // Function to manually close the notification
  function closeNotification() {
    const notification = document.getElementById('notification')
    notification.style.display = 'none'
  }

  let productIdToDelete = null // Variable to store the ID of the product to be deleted

  // Event handler for editing a product
  const handleEditProduct = async (event) => {
    let productId = event.target.getAttribute('data-id')
    if (!productId && event.target.parentElement) {
      productId = event.target.parentElement.getAttribute('data-id')
    }
    if (!productId) {
      console.error('No product ID found for editing')
      return
    }

    try {
      // Fetch the product details from the API
      const response = await fetch(`/api/admin/products/${productId}`)
      if (!response.ok) {
        console.error('Error fetching product:', response.statusText)
        return
      }
      const product = await response.json()
      // Populate the edit form with the product details
      document.getElementById('edit_product_id').value = product.id
      document.getElementById('edit_brand_name').value = product.brand_name
      document.getElementById('edit_product_name').value = product.product_name
      document.getElementById('edit_stock_amount').value = product.stock_amount
      document.getElementById('edit_product_price').value =
        product.product_price
      document.getElementById('edit_product_image_url').value =
        product.product_image_url
      document.getElementById('editProductModal').style.display = 'block'
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  // Event handler for initiating product deletion
  const handleDeleteProduct = (event) => {
    productIdToDelete = event.target.getAttribute('data-id')
    if (!productIdToDelete && event.target.parentElement) {
      productIdToDelete = event.target.parentElement.getAttribute('data-id')
    }
    if (!productIdToDelete) {
      console.error('No product ID found for deleting')
      return
    }
    document.getElementById('deleteConfirmationModal').style.display = 'block'
  }

  // Function to confirm product deletion
  const confirmDeleteProduct = async () => {
    if (!productIdToDelete) {
      console.error('No product ID found for confirming deletion')
      return
    }

    try {
      // Send a DELETE request to the API
      const response = await fetch(`/api/admin/products/${productIdToDelete}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchProducts() // Re-fetch the product list after deletion
        showNotification('Product has been removed')
      } else {
        console.error('Error deleting product:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    } finally {
      productIdToDelete = null
      document.getElementById('deleteConfirmationModal').style.display = 'none'
    }
  }

  // Function to cancel product deletion
  const cancelDeleteProduct = () => {
    productIdToDelete = null
    document.getElementById('deleteConfirmationModal').style.display = 'none'
  }

  // Event handler for changing the listing status of a product
  const handleListingStatusChange = async (event) => {
    const productId = event.target.getAttribute('data-id')
    const newStatus = event.target.checked

    try {
      // Send a PUT request to update the listing status
      const response = await fetch(
        `/api/admin/products/${productId}/listing-status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listing_status: newStatus }),
        },
      )

      if (!response.ok) {
        console.error('Error updating listing status:', response.statusText)
      } else {
        const productRow = document.querySelector(`tr[data-id="${productId}"]`)
        const switchLabelOn = productRow.querySelector('.switch-label.on')
        const switchLabelOff = productRow.querySelector('.switch-label.off')
        if (newStatus) {
          switchLabelOn.style.display = 'block'
          switchLabelOff.style.display = 'none'
        } else {
          switchLabelOn.style.display = 'none'
          switchLabelOff.style.display = 'block'
        }
      }
    } catch (error) {
      console.error('Error updating listing status:', error)
    }
  }

  // Function to fetch and display the product list
  const fetchProducts = async () => {
    try {
      // Fetch products data from the API
      const response = await fetch('/api/admin/products') // Ensure this endpoint is calling the getProducts function above
      if (!response.ok) {
        console.error('Error fetching products:', response.statusText)
        return
      }
      const products = await response.json()
      const productTableBody = document.querySelector('.product-table-body')
      productTableBody.innerHTML = '' // Clear any existing rows
      products.forEach((product) => {
        const productRow = document.createElement('tr')
        productRow.setAttribute('data-id', product.id)
        // Populate the product row with product details
        productRow.innerHTML = `
          <td>${product.brand_name}</td>
          <td>${product.product_name}</td>
          <td class="align-center">${product.stock_amount}</td>
          <td class="align-right">${formatPrice(product.product_price)}</td>
          <td class="align-center"><img src="/src/assets/product-images/${
            product.product_image_url
          }" alt="${
          product.product_name
        }" style="width: 50px; height: auto;" /></td>
          <td class="align-center">
            <div class="modify-buttons">
              <label class="toggle-switch">
                <input type="checkbox" data-id="${
                  product.id
                }" class="listing-status" ${
          product.listing_status ? 'checked' : ''
        } />
                <span class="slider">
                  <span class="switch-label on" style="display: ${
                    product.listing_status ? 'block' : 'none'
                  }">ON</span>
                  <span class="switch-label off" style="display: ${
                    product.listing_status ? 'none' : 'block'
                  }">OFF</span>
                </span>
              </label>
              <button data-id="${
                product.id
              }" class="edit-btn"><i class="fas fa-edit"></i></button>
              <button data-id="${
                product.id
              }" class="delete-btn"><i class="fa fa-trash"></i></button>
            </div>
          </td>
        `
        productTableBody.appendChild(productRow)
      })
      // Attach event listeners to edit, delete, and listing status change buttons
      document.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', handleEditProduct)
      })
      document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', handleDeleteProduct)
      })
      document.querySelectorAll('.listing-status').forEach((checkbox) => {
        checkbox.addEventListener('change', handleListingStatusChange)
      })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  await fetchProducts() // Fetch and display the product list when the page loads

  const addProductForm = document.getElementById('add-product-form')
  // Event handler for adding a new product
  addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(addProductForm)
    const productData = {
      brand_name: formData.get('brand_name'),
      product_name: formData.get('product_name'),
      stock_amount: formData.get('stock_amount'),
      product_price: formData.get('product_price'),
      product_image_url: formData.get('product_image_url'),
    }
    try {
      // Send a POST request to add the new product
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      if (response.ok) {
        await fetchProducts() // Re-fetch products after adding a new one
        addProductForm.reset()
        document.getElementById('addProductModal').style.display = 'none'
        showNotification('New product created')
      } else {
        console.error('Error adding product:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding product:', error)
    }
  })

  const editProductForm = document.getElementById('edit-product-form')
  // Event handler for saving edits to a product
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
    }
    try {
      // Send a PUT request to update the product
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })
      if (response.ok) {
        await fetchProducts() // Re-fetch products after editing
        editProductForm.reset()
        document.getElementById('editProductModal').style.display = 'none'
        showNotification('Product changes saved')
      } else {
        console.error('Error editing product:', response.statusText)
      }
    } catch (error) {
      console.error('Error editing product:', error)
    }
  })

  // Event listener for closing the add product modal
  const closeAddProductModal = document.querySelector('#addProductModal .close')
  closeAddProductModal.addEventListener('click', () => {
    document.getElementById('addProductModal').style.display = 'none'
  })

  // Event listener for opening the add product modal
  const openAddProductModalButton = document.getElementById(
    'openAddProductModal',
  )
  openAddProductModalButton.addEventListener('click', () => {
    document.getElementById('addProductModal').style.display = 'block'
  })

  // Event listener for closing the edit product modal
  const closeEditProductModal = document.querySelector(
    '#editProductModal .close',
  )
  closeEditProductModal.addEventListener('click', () => {
    document.getElementById('editProductModal').style.display = 'none'
  })

  // Event listener for closing modals by clicking outside of them
  window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('addProductModal')) {
      document.getElementById('addProductModal').style.display = 'none'
    }
    if (event.target === document.getElementById('editProductModal')) {
      document.getElementById('editProductModal').style.display = 'none'
    }
    if (event.target === document.getElementById('deleteConfirmationModal')) {
      document.getElementById('deleteConfirmationModal').style.display = 'none'
    }
  })

  // Event listener for confirming product deletion
  document
    .getElementById('confirmDelete')
    .addEventListener('click', confirmDeleteProduct)
  // Event listener for canceling product deletion
  document
    .getElementById('cancelDelete')
    .addEventListener('click', cancelDeleteProduct)

  window.closeNotification = closeNotification // Make the closeNotification function accessible globally
})
