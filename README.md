# Lumina E-Commerce Website

Welcome to Lumina, an e-commerce platform designed to provide a seamless skin care products shopping experience for users and robust management capabilities for admins.

This website is designed for Binar Academy Gold Challenge level project which features admin-side product listing management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Product Management Feature Guideline](#product-guideline)

## Features

### Product Management Features
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
   As this project does not initialize knex and use knex migrations and seeds, we will manually setup the database on PostgreSQL.
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
   ```
   
5. **Insert template database values into the table**
   This is optional, but you can use this as a starting point for the product list.
   ```
   
7. **Start the Application**
   ```bash
   npm run start
   ```

## Product Management Guideline
### Add Product
1. 
* Product image uploading still need a manual process adding it to the file directory. In the dashboard type the name file instead (e.g. product-image-1.png)
** Image files is at root/client/assets/product-images
### Edit Product

### Delete Product

## Database Samples
You can use these datas for testing purposes. Other than that, you can use your own datas.
