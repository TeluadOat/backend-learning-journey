# Farm Stand - Express & Mongoose Learning Project

A full-stack learning project built with Express.js and Mongoose to understand database relationships and CRUD operations with MongoDB.

## Overview

This is a farm stand product management application that demonstrates core backend concepts including:
- Express.js server setup and routing
- Mongoose schema definition and validation
- RESTful API design
- CRUD operations (Create, Read, Update, Delete)
- EJS templating for dynamic HTML rendering
- Form method overriding for HTTP verbs

## Tech Stack

- **Framework**: Express.js (v5.2.1)
- **Template Engine**: EJS (v3.1.10)
- **Database**: MongoDB with Mongoose (v9.0.1)
- **Middleware**: Method Override (v3.0.0)
- **Runtime**: Node.js

## Project Structure

```
.
├── index.js              # Main server file with all routes
├── package.json          # Project dependencies
├── seeds.js              # Database seeding script
├── models/
│   ├── product.js        # Product schema definition with Farm reference
│   └── farm.js           # Farm schema definition with Product references
└── views/
    ├── farms/
    │   ├── index.ejs     # List all farms
    │   ├── show.ejs      # Display single farm with products
    │   └── new.ejs       # Create new farm form
    └── products/
        ├── index.ejs     # List all products / filter by category
        ├── show.ejs      # Display single product details
        ├── new.ejs       # Create new product form
        └── edit.ejs      # Edit existing product form
```

## Database Schema

### Farm Model

The Farm collection stores farm information with a one-to-many relationship to Products:

```javascript
{
  name: String (required),
  city: String,
  email: String (required),
  products: [ObjectId] (references to Product documents)
}
```

### Product Model

The Product collection stores farm products with the following fields:

```javascript
{
  name: String (required),
  price: Number (required, minimum: 0),
  category: String (required, enum: ["fruit", "vegetable", "dairy"], lowercase),
  farm: ObjectId (reference to Farm document)
}
```

## Database Relationships

This project demonstrates **one-to-many relationships** using Mongoose references:
- **One Farm** can have **many Products**
- Each **Product** belongs to **one Farm**
- Products are linked to farms using ObjectId references with the `ref` property

## Features

### Farms Management

- **View All Farms**: GET `/farms` - Display all farms with links to details
- **Create Farm**: POST `/farms` - Add a new farm to the database
- **View Farm Details**: GET `/farms/:id` - Display individual farm with associated products and links
- **Delete Farm**: DELETE `/farms/:id` - Remove a farm and cascade delete all associated products
- **Add Products to Farm**: GET/POST `/farms/:id/products/new` - Create products for specific farm

### Products Management

- **View All Products**: GET `/products` - Display all products with optional category filtering
- **Filter by Category**: GET `/products?category=vegetable` - Filter products by category
- **Create Product**: POST `/products` - Add a new product to the database
- **View Product Details**: GET `/products/:id` - Display individual product with farm information
- **Edit Product**: GET/PUT `/products/:id/edit` - Update product details
- **Delete Product**: DELETE `/products/:id` - Remove a product from the database

### Categories

The application supports three product categories:
- Vegetable
- Fruit
- Dairy

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure MongoDB is running on your local machine

### Running the Application

1. **Seed the database** (optional):
```bash
node seeds.js
```

This will populate the database with sample farm products.

2. **Start the server**:
```bash
node index.js
```

The server will start on `http://localhost:3000`

### Accessing the Application

- Navigate to `http://localhost:3000/products` to view all products
- Use the UI to create, update, or delete products

## Key Learning Concepts

### Mongoose Schema Validation
The schemas demonstrate:
- Required fields validation with custom error messages
- Data type constraints
- Enum validation for categories
- Number range validation (min price)
- Auto-lowercasing for category values
- Middleware hooks for data manipulation and cascading operations

### Cascade Deletes with Middleware
- Using Mongoose `post("findOneAndDelete")` middleware
- Deleting related documents when parent document is deleted
- Preventing orphaned records in the database

### One-to-Many Relationships
- Using `Schema.Types.ObjectId` and `ref` property to create relationships
- Populating referenced documents with `.populate()` to fetch full details
- Cascade deletes: deleting a farm automatically deletes all associated products
- Embedding arrays of references in parent documents
- Understanding parent-child document relationships
- Using post-middleware hooks (`post("findOneAndDelete")`) for cascade operations

### RESTful Routes
- GET requests for retrieving data
- POST requests for creating resources
- PUT requests for updating resources
- DELETE requests for removing resources
- Nested resource routes (e.g., `/farms/:id/products/new`)
- Proper route ordering: POST before GET for same base path to avoid conflicts

### Populating References
- Using `.populate()` to fetch referenced documents instead of just ObjectIds
- Selecting specific fields to populate with second parameter
- Building navigation and relationships between resources
- Displaying related data in templates (e.g., farm name in product details)

### Async/Await Pattern
Database operations use modern async/await syntax with error handling via `.catch()`

### Dynamic Template Content
- Passing complete objects to views instead of just IDs
- Rendering relationship data in EJS templates
- Using dot notation to access nested object properties
- Displaying product counts and linked resources

### Form Method Override
Uses `method-override` middleware to handle PUT and DELETE requests through HTML forms (which only support GET and POST natively)

### Database Operations
- Creating documents with constructors and `.save()`
- Querying with `.find()` and `.findById()`
- Updating with `.findByIdAndUpdate()` and validation
- Deleting with `.findByIdAndDelete()`
- Managing relationships between collections

## Future Enhancements

- Add user authentication and authorization
- Implement farm reviews and ratings system
- Add product reviews with user feedback
- Include product images and gallery
- Add inventory tracking and stock management
- Implement advanced filtering and search functionality
- Add pagination for large product/farm lists
- Create API documentation (Swagger/OpenAPI)
- Add input validation with error messages on frontend
- Implement email notifications for farm updates
- Add farm location mapping with geolocation

## Notes

- The main application database is named `farmStandTake2`
- The seeds.js file uses a different database name `farmStand` for seeding
- Server listens on port 3000
- All prices must be positive numbers
- Categories are automatically converted to lowercase
- Farm and Product models use Mongoose references (`ref`) for relationships
- Products can be created independently or linked to specific farms
- When viewing a farm, the number of associated products is displayed

## Author

Created as part of a backend learning journey with databases and object-relational mapping concepts.
