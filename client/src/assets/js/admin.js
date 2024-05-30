// client/src/assets/js/admin.js
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/admin/products')
    const products = await response.json()

    const productTableBody = document.querySelector('.product-table-body')
    productTableBody.innerHTML = '' // Clear any existing rows

    products.forEach((product) => {
      const productRow = document.createElement('tr')
      const imageUrl = `/src/assets/${product.product_image_url}`
      productRow.innerHTML = `
          <td>${product.brand_name}</td>
          <td>${product.product_name}</td>
          <td>${product.stock_amount}</td>
          <td>${product.product_price}</td>
          <td><img src="${imageUrl}" alt="${
        product.product_name
      }" style="width: 50px; height: auto;" /></td>
          <td>
            <select data-id="${product.id}">
              <option value="true" ${
                product.display ? 'selected' : ''
              }>Yes</option>
              <option value="false" ${
                !product.display ? 'selected' : ''
              }>No</option>
            </select>
          </td>
          <td><button data-id="${product.id}">Edit</button></td>
        `

      productTableBody.appendChild(productRow)
    })
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
