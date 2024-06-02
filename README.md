# Lumina E-Commerce Website

Welcome to Lumina, an e-commerce platform designed to provide a seamless skin care products shopping experience for users and robust management capabilities for admins.

This website is designed for Binar Academy Gold Challenge level project which features customer-side product listing and admin-side product listing management.

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
- **Toggle Product Listing**: Admins can toggle product displayed from the catalog to turn the display on or off in the home page "ALL PRODUCTS" section.
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
   <br/>Use this query as a starting point datas for the product list.
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
   
8. **Access the Home Page and Admin dashboard**
   You can access the website by accessing your local host:
   1. Home Page: http://localhost:3000/
   2. Admin Dashboard: http://localhost:3000/admin

## Product Management Guideline
### Add Product
1. Access the admin dashboard
2. Click the "Add New" icon button at the top right corner
3. Add the products' Brand Name, Product Name, Stock Amount, Price, and Image File Name
4. Click "Add Product"

<br/> Additional Notes for image data:
* Product image uploading still need a manual process adding it to the file directory. In this dashboard type the name file instead (e.g. product-image-1.png)
* Image directory is at root/client/assets/product-images

### Toggle Product Display
1. Access The Admin Dashboard
2. Click the Toggle button (Green/Gray) in the 'Modify' column of the product rows you want to toggle.

### Edit Product
1. Access the Admin Dashboard
2. Click the Edit icon (Blue color) in the 'Modify' column of the product rows you want to edit.
3. Modify and adjust the datas as you want
4. Click "Save Changes"

### Delete Product
1. Access the Admin Dashboard
2. Click the Delete icon (Red color) in the 'Modify' column of the product rows you want to delete.
3. Click confirmation button "Delete"
   
## Data samples
You can use these datas for testing purposes. You can use also your own datas.
<br/>*Image files below is already uploaded in the repository, if you want to add your own image you can upload it as explained in the Add Product guideline section.
| No | Brand     | Product name                              | Stock | Price          | Image file name      |
|----|-----------|-------------------------------------------|-------|----------------|----------------------|
| 1  | SKINTIFIC | 10% Vitamin C Brightening Glow Serum      | 7     |         143000 | product-image-17.png |
| 2  | SKINTIFIC | Aqua Light Daily Sunscreen SPF 35 PA +++  | 10    |          88000 | product-image-18.png |
| 3  | SKINTIFIC | Symwhite 377 Dark Spot Moisture Gel       | 5     |         138000 | product-image-19.png |
| 4  | SKINTIFIC | SymWhite 377 Dark Spot Eraser Serum       | 5     |         131000 | product-image-20.png |
| 5  | COSRX     | Pure Fit Cica Cleanser                    | 2     |         174000 | product-image-21.png |
| 6  | COSRX     | Aloe Soothing Sun Cream SPF 50+ PA+++     | 5     |         149000 | product-image-22.jpg |
| 7  | AZARINE   | Hydracool Ceraspray Sunscreen SPF50 PA+++ | 7     |          65000 | product-image-23.png |
| 8  | AZARINE   | Acne Spot Serum                           | 13    |          25000 | product-image-24.png |
