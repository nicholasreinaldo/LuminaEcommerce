document.addEventListener('DOMContentLoaded', async () => {
  // Function to format price by adding periods as thousand separators
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  try {
    // Fetch products data from the API
    const response = await fetch('/api/products')
    // Parse the JSON response
    const products = await response.json()
    // Select the container where products will be displayed
    const productContainer = document.querySelector('.product-container')
    // Clear existing products in the container
    productContainer.innerHTML = '' // Clear existing products

    // Filter and display only products with listing_status set to true
    products
      .filter((product) => product.listing_status)
      .forEach((product) => {
        // Create a div element for the product card
        const productCard = document.createElement('div')
        productCard.className = 'product-card' // Assign class for styling
        // Construct the image URL for the product
        const imageUrl = `/src/assets/product-images/${product.product_image_url}`
        // Set the inner HTML of the product card with product details
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
        // Append the product card to the container
        productContainer.appendChild(productCard)
      })
  } catch (error) {
    // Log any errors that occur during fetch or processing
    console.error('Error fetching products:', error)
  }
})
