# Mongo Relationships — Example Project

A small Node.js project demonstrating MongoDB relationships (one-to-few, one-to-many) using Mongoose. This repository contains a minimal `Models/user.js` model and example code to explore referencing and embedding patterns.

**Status:** Educational sample for learning MongoDB relations.

## Features
- Example Mongoose schema(s) illustrating relationships
- Simple instructions to run locally

## Prerequisites
- Node.js (v14+ recommended)
- MongoDB running locally or a connection URI (Atlas or local)

## Setup
1. Install dependencies:

	npm install

2. Configure MongoDB connection (if required) via environment variable `MONGO_URI` or update the connection string in your app code.

## Running
Start the app (example):

```
node .\Models\user.js
```

Adjust the command to run whichever entry script you use in this project.

## Models
The `Models/user.js` file contains the user schema used for demonstration. Typical contents include fields such as `name`, `email`, and relationships to other documents (references or embedded subdocuments). Inspect `Models/user.js` to see whether it uses `ObjectId` references or nested subdocuments and how population is done.

## Farm example
The `Models/farm.js` file demonstrates a one-to-many referencing pattern between `Farm` and `Product` using Mongoose.

- `Product` schema: `name`, `price`, `season` (enum: Spring, Summer, Fall, Winter).
- `Farm` schema: `name`, `city`, `products` is an array of `ObjectId` references to `Product`.

What the script does:
- Connects to MongoDB at `mongodb://127.0.0.1:27017/relationshipDemo`.
- Defines `Product` and `Farm` models.
- Includes example operations (some commented out): `Product.insertMany(...)`, `makeFarm()` which creates a farm and adds a product, and `addProductToFarm()` which finds a farm and a product and pushes the product into the farm's `products` array.

Run the example:

```
node .\\Models\\farm.js
```

Notes & suggestions (learning tips):
- Make sure MongoDB is running and the connection string matches your environment.
- When adding a product to `farm.products`, prefer pushing the id (`watermelon._id`) rather than the whole document: `farm.products.push(watermelon._id)`.
- Add defensive checks to ensure `farm` and `product` exist before pushing and saving.
- Use `populate()` to load referenced product documents, for example: `Farm.findOne(...).populate('products')`.
- Uncomment `Product.insertMany` and `makeFarm()` to seed sample data for experimentation.

## Usage
- To test relationship behavior, create sample documents (users and related documents) and experiment with `populate()` or nested document access.
- Use MongoDB Compass or `mongosh` to inspect the stored documents and confirm relations.

## Notes
- This repo is intended for learning and experimentation — not production-ready code.
- If you want, I can add example scripts that insert sample data and demonstrate `populate()` calls.

