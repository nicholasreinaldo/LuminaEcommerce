# Lumina E-Commerce Website

Welcome to Lumina, an e-commerce platform designed to provide a seamless skin care products shopping experience for users and robust management capabilities for admins.

This website is designed for Binar Academy Gold Challenge level project which features customer-side product listing and admin-side product listing management.

## Product Demo

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Product Management Feature Guideline](#product-guideline)

## Features

### Product Listings
Customers can see at the home page of the website all products listed available for sale.

### Product Management Features
- **See All Product Listing**: Admins can view all products from the catalog which displayed in the home page "ALL PRODUCT" section.
- **Add Product Listing**: Admins can add products from the catalog to display it to the home page "ALL PRODUCTS" section.
- **Edit Product Details**: Admins can update product details from the catalog to change its' contents it at the home page "ALL PRODUCTS" section.
- **Delete Product Listing**: Admins can delete products from the catalog to undisplay it from the home page "ALL PRODUCTS" section.

## Installation

To set up the Lumina website on your local machine, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nicholasreinaldo/24001107-44-Nir-Lumina-ChallengeGold

   ```

2. **Install dependencies**
   ```bash
   npm init
   npm install node ejs express knex pg
   npm install -D nodemon
   node index.js
   ```
3. **Connect the database**
   <br/>As this project does not initialize knex and use knex migrations and seeds, we will manually setup the database on PostgreSQL.
   Make sure your database connection  details and replace the content of root/knexfile.js according to your database credentials.  
   ``` 
   connection: {
     host: '127.0.0.1',
     port: 5432,
     database: 'your-database-name',
     user: 'postgres',
     password: 'your-database-password',
   }
4. **Setup the database table**
   <br/>Use this query to setup the products database table
   ```
   CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    product_image_url VARCHAR(255) NOT NULL,
    stock_amount INT NOT NULL,
    listing_status BOOLEAN NOT NULL DEFAULT TRUE
   );

6. **Insert template database values into the table**
   <br/>This is optional, but you can use this as a starting point for the product list.
   ```
   INSERT INTO products (brand_name, product_name, product_price, product_image_url, stock_amount, listing_status)
   VALUES 
   ('SKINTIFIC', 'MSH Niacinamide Brightening Moisture Gel', 121000, 'product-image-1.png', 10, TRUE),
   ('SKINTIFIC', '5X Ceramide Barrier Moisture Gel', 135000, 'product-image-2.jpg', 5, TRUE),
   ('SKINTIFIC', 'Cover All Perfect Cushion', 180000, 'product-image-3.png', 4, TRUE),
   ('SKINTIFIC', '5X Ceramide Serum Sunscreen', 52000, 'product-image-4.png', 3, TRUE),
   ('SKINTIFIC', 'Alaska Volcano Pore Clay Stick', 86000, 'product-image-5.png', 8, TRUE),
   ('SKINTIFIC', 'REFILL Cover All Perfect Cushion', 133000, 'product-image-6.png', 5, TRUE),
   ('SKINTIFIC', 'Mugwort Acne Clay Stick', 87000, 'product-image-7.png', 3, TRUE),
   ('SKINTIFIC', 'Truffle Biome Skin Reborn Cream Gel Moisturizer', 148000, 'product-image-8.png', 2, TRUE),
   ('COSRX', 'Salicylic Acid Daily Gentle Cleanser', 116000, 'product-image-9.jpg', 17, TRUE),
   ('COSRX', 'Hyaluronic Acid Intensive Cream', 224000, 'product-image-10.jpg', 6, TRUE),
   ('COSRX', 'Advanced Snail Mucin 96 Power Essence', 206000, 'product-image-11.jpg', 4, TRUE),
   ('COSRX', 'AHA/BHA Clarifying Treatment Toner', 150000, 'product-image-12.jpg', 13, TRUE),
   ('AZARINE', 'Skinfit Essence Toner', 40000, 'product-image-13.png', 6, TRUE),
   ('AZARINE', 'Bodyguard Moisturiser Sunscreen Serum Magical Luv', 65000, 'product-image-14.png', 7, TRUE),
   ('AZARINE', 'Bodyguard Moisturiser Sunscreen Serum Sun O Clock', 65000, 'product-image-15.png', 3, TRUE),
   ('AZARINE', 'Vitamin Lab Instant Glow Peel Off Nail Polish', 35000, 'product-image-16.png', 23, TRUE)

7. **Start the Application**
   ```bash
   npm run start
   ```

## Product Management Guideline
### Add Product
1. 
Notes:
* Product image uploading still need a manual process adding it to the file directory. In the dashboard type the name file instead (e.g. product-image-1.png)
* Image files is at root/client/assets/product-images
### Edit Product

### Delete Product

## Database Samples
You can use these datas for testing purposes. Other than that, you can use your own datas.
