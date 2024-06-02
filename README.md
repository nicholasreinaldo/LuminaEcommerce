# Lumina E-Commerce Website

Welcome to Lumina, an e-commerce platform designed to provide a seamless skin care products shopping experience for users and robust management capabilities for admins.

This website is designed for Binar Academy Gold Challenge level project which features admin-side product listing management.

## Table of Contents

- [Features](#features)
  - [Admin Features](#admin-features)
- [Installation](#installation)
- [Admin Guideline](#admin-guideline)
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
5. **Setup the database table**
   Use this query to make t
   ```
7. **Insert template database values into the table**
   
9. **Start the Application**
   ```bash
   npm run start
   ```

## Product Management Guideline
### Add Product

### Edit Product

### Delete Product

