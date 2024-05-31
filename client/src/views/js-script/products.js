// /client/views/js-script/products.js

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/products')
    const products = await response.json()

    const productContainer = document.querySelector('.product-container')
    products.forEach((product) => {
      const productCard = document.createElement('div')
      productCard.className = 'product-card'

      // Prepend the static path to the image URL
      const imageUrl = `/src/assets/product-images/${product.product_image_url}`

      productCard.innerHTML = `
          <img src="${imageUrl}" alt="${product.product_name}" />
          <h3>${product.brand_name}</h3>
          <p>${product.product_name}</p>
          <div class="product-footer">
            <span class="price">Rp ${product.product_price}</span>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        `

      productContainer.appendChild(productCard)
    })
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
