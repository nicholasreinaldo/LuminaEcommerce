# Lumina E-Commerce Website

Welcome to Lumina, an e-commerce platform designed to provide a seamless skin care products shopping experience for users and robust management capabilities for admins.

This website is designed for Binar Academy Gold Challenge level project which features admin-side product listing management.

## Table of Contents

- [Features](#features)
  - [Admin Features](#admin-features)
- [Installation](#installation)
- [Admin Guideline](#admin-guideline)
  - [Admin Login](#admin-login)
  - [Product Management](#product-management)
- [Feature updates plan](#feature-updates-plan)

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
   npm install node
   node index.js
   npm install  ejs express knex pg
   npm install -D nodemon
   ```
3. **Setup the database**
   </br>As this project does not initialize knex and use knex migrations and seeds, we will manually setup the database on PostgreSQL.
   Make sure your database connection  details, replace the details according to your database credentials.
   Modify the content of root/knexfile.js
   ``` 
   connection: {
     host: '127.0.0.1',
     port: 5432,
     database: 'your-database-name',
     user: 'postgres',
     password: 'your-database-password',
   }
5. **Start the Application**
   ```bash
   npm run start
   ```

## Admin Guideline

### Admin Register

### Admin Login

### Add Product

### Edit Product

### Delete Product

## Feature updates plan (After Gold Challenge)

### Admin Features

- **Order Management**: Admins can view orders and change the status of product orders (confirmed, on-process, delivered).

### Upcoming User Features

- **User Registration and Login**: Users can register for a new account or log in to an existing account.
- **Add to Cart**: Users can add products to their shopping cart.
- **Checkout**: Users can review their cart and proceed to checkout to complete their purchase.
- **Order History**: Users can view their past orders and order status.
