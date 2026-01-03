# YelpCamp

A full-stack web application for discovering and reviewing campgrounds, built with Node.js, Express, and MongoDB.

## Project Overview

YelpCamp is a Yelp-inspired campground review platform where users can browse campgrounds, add new campgrounds, write reviews, and share their camping experiences. The application demonstrates full CRUD operations (Create, Read, Update, Delete) for both campgrounds and reviews.

## Features

- **Browse Campgrounds**: View all available campgrounds with details
- **Add Campgrounds**: Create new campground listings
- **Edit Campgrounds**: Update campground information
- **Delete Campgrounds**: Remove campground listings
- **Leave Reviews**: Write and submit reviews for campgrounds with ratings
- **Data Validation**: Server-side and client-side validation using Joi schema
- **Review Validation**: Enforce rating (1-5) and review body requirements
- **Error Handling**: Custom error handling and error pages
- **Responsive UI**: EJS templating with Bootstrap styling

## Tech Stack

### Backend
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Frontend
- **EJS** - Templating engine
- **ejs-mate** - EJS layout engine
- **Bootstrap** - CSS framework

### Tools & Utilities
- **method-override** - HTTP method override for REST conventions
- **Joi** - Schema validation library

## Project Structure

```
YelpCamp/
├── app.js                 # Main Express application
├── package.json          # Project dependencies
├── schemas.js            # Joi validation schemas
├── models/               # Mongoose models
│   ├── campground.js    # Campground model
│   └── review.js        # Review model
├── seeds/                # Database seeding scripts
│   ├── index.js
│   ├── cities.js
│   └── seedHelpers.js
├── utils/                # Utility functions
│   └── ExpressError.js  # Custom error class
└── views/                # EJS templates
    ├── home.ejs
    ├── campgrounds/
    │   ├── index.ejs    # List all campgrounds
    │   ├── show.ejs     # Campground details
    │   ├── new.ejs      # Create new campground
    │   ├── edit.ejs     # Edit campground
    │   └── error.ejs    # Error page
    ├── layouts/
    │   └── boilerplate.ejs
    └── partials/
        ├── navbar.ejs
        └── footer.ejs
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd YelpCamp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017`
   - The application will automatically create the `yelp-camp` database

4. **Seed the database** (optional)
   ```bash
   node seeds/index.js
   ```

## Usage

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000` (or your configured port)

## API Routes

### Campgrounds
- `GET /campgrounds` - List all campgrounds
- `GET /campgrounds/new` - Show form to create new campground
- `POST /campgrounds` - Create a new campground
- `GET /campgrounds/:id` - View campground details
- `GET /campgrounds/:id/edit` - Show form to edit campground
- `PUT /campgrounds/:id` - Update a campground
- `DELETE /campgrounds/:id` - Delete a campground

### Reviews
- `POST /campgrounds/:id/reviews` - Add review to campground
- `DELETE /campgrounds/:id/reviews/:reviewId` - Delete review

## Models

### Campground
- Title
- Image URL
- Price
- Description
- Location
- Reviews (reference to Review model)

### Review
- Rating
- Comment
- Author/User info

## Learning Goals

This project demonstrates:
- RESTful API design
- Full CRUD operations
- Database relationships with Mongoose
- Server-side form validation
- Error handling and custom middleware
- Template rendering with EJS
- MVC architecture pattern

## Future Enhancements

- User authentication and authorization
- Image upload functionality
- User profiles
- Ratings and filtering
- Geolocation features
- Real-time updates with WebSockets

## License

ISC

## Author

Temidayo
