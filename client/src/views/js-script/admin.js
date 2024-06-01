document.addEventListener('DOMContentLoaded', async () => {
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

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
      const response = await fetch(`/api/admin/products/${productId}`)
      if (!response.ok) {
        console.error('Error fetching product:', response.statusText)
        return
      }
      const product = await response.json()
      document.getElementById('edit_product_id').value = product.id
      document.getElementById('edit_brand_name').value = product.brand_name
      document.getElementById('edit_product_name').value = product.product_name
      document.getElementById('edit_stock_amount').value = product.stock_amount
      document.getElementById('edit_product_price').value =
        product.product_price
      document.getElementById('edit_product_image_url').value =
        product.product_image_url
      document.getElementById('edit_listing_status').value =
        product.listing_status.toString()
      document.getElementById('editProductModal').style.display = 'block'
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  const handleDeleteProduct = async (event) => {
    let productId = event.target.getAttribute('data-id')
    if (!productId && event.target.parentElement) {
      productId = event.target.parentElement.getAttribute('data-id')
    }
    if (!productId) {
      console.error('No product ID found for deleting')
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchProducts()
      } else {
        console.error('Error deleting product:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleListingStatusChange = async (event) => {
    const productId = event.target.getAttribute('data-id')
    const newStatus = event.target.checked

    try {
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
        await fetchProducts()
      }
    } catch (error) {
      console.error('Error updating listing status:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (!response.ok) {
        console.error('Error fetching products:', response.statusText)
        return
      }
      const products = await response.json()
      const productTableBody = document.querySelector('.product-table-body')
      productTableBody.innerHTML = '' // Clear any existing rows
      products.forEach((product) => {
        const productRow = document.createElement('tr')
        productRow.innerHTML = `
          <td>${product.brand_name}</td>
          <td>${product.product_name}</td>
          <td>${product.stock_amount}</td>
          <td>${formatPrice(product.product_price)}</td>
          <td><img src="/src/assets/product-images/${
            product.product_image_url
          }" alt="${
          product.product_name
        }" style="width: 50px; height: auto;" /></td>
          <td>
            <div class="modify-buttons">
              <label class="toggle-switch">
                <input type="checkbox" data-id="${
                  product.id
                }" class="listing-status" ${
          product.listing_status ? 'checked' : ''
        } />
                <span class="slider">
                  <span class="switch-label">${
                    product.listing_status ? 'On' : 'Off'
                  }</span>
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

  await fetchProducts()

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
        await fetchProducts()
        addProductForm.reset()
        document.getElementById('addProductModal').style.display = 'none'
      } else {
        console.error('Error adding product:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding product:', error)
    }
  })

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
        await fetchProducts()
        editProductForm.reset()
        document.getElementById('editProductModal').style.display = 'none'
      } else {
        console.error('Error editing product:', response.statusText)
      }
    } catch (error) {
      console.error('Error editing product:', error)
    }
  })

  const closeAddProductModal = document.querySelector('#addProductModal .close')
  closeAddProductModal.addEventListener('click', () => {
    document.getElementById('addProductModal').style.display = 'none'
  })

  const openAddProductModalButton = document.getElementById(
    'openAddProductModal',
  )
  openAddProductModalButton.addEventListener('click', () => {
    document.getElementById('addProductModal').style.display = 'block'
  })

  const closeEditProductModal = document.querySelector(
    '#editProductModal .close',
  )
  closeEditProductModal.addEventListener('click', () => {
    document.getElementById('editProductModal').style.display = 'none'
  })

  window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('addProductModal')) {
      document.getElementById('addProductModal').style.display = 'none'
    }
    if (event.target === document.getElementById('editProductModal')) {
      document.getElementById('editProductModal').style.display = 'none'
    }
  })
})
