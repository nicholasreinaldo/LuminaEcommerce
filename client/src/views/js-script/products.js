// /client/views/js-script/products.js

document.addEventListener('DOMContentLoaded', async () => {
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  try {
    const response = await fetch('/api/products')
    const products = await response.json()

    const productContainer = document.querySelector('.product-container')
    productContainer.innerHTML = '' // Clear existing products
    products
      .filter((product) => product.listing_status) // Only display products with listing_status set to true
      .forEach((product) => {
        const productCard = document.createElement('div')
        productCard.className = 'product-card'

        const imageUrl = `/src/assets/product-images/${product.product_image_url}`

        productCard.innerHTML = `
            <img src="${imageUrl}" alt="${product.product_name}" />
            <h3>${product.brand_name}</h3>
            <p>${product.product_name}</p>
            <div class="product-footer">
              <span class="price">Rp ${formatPrice(
                product.product_price,
              )}</span>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          `

        productContainer.appendChild(productCard)
      })
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
