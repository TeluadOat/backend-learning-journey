# Cookies Demo - Express Learning

A simple Express.js application to learn and practice working with HTTP cookies, including setting, reading, and verifying signed cookies.

## Project Overview

This project demonstrates how to handle cookies in Express.js using the `cookie-parser` middleware. It covers essential cookie operations including:
- Setting cookies
- Reading cookies
- Working with signed cookies for security

## Files in the Project

### **index.js**
The main application file that sets up the Express server and defines all route handlers for cookie operations.

**Key Features:**
- Initializes Express server on port 3000
- Uses `cookie-parser` middleware with a secret key for signing cookies
- Defines multiple routes to demonstrate different cookie operations

**Routes:**
- `GET /greet` - Returns a greeting and logs all cookies from the request
- `GET /getsignedcookie` - Sets a signed cookie named "fruit" with value "apple"
- `GET /verifyfruit` - Retrieves and displays all signed cookies
- `GET /setname` - Sets a regular (unsigned) cookie named "name" with value "John Doe"

### **package.json**
Project metadata and dependency management file.

**Main Dependencies:**
- `express` (v5.2.1) - Web framework for Node.js
- `cookie-parser` (v1.4.7) - Middleware to parse cookies from incoming requests

**Configuration:**
- Entry point: `index.js`
- Module type: CommonJS

### **node_modules/**
Contains all installed dependencies. This folder is created after running `npm install`.

### **package-lock.json**
Auto-generated file that locks specific versions of dependencies for consistent installations across environments.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node index.js
   ```

3. Test the routes:
   - Visit `http://localhost:3000/greet` to see cookies in action
   - Visit `http://localhost:3000/setname` to set a cookie
   - Visit `http://localhost:3000/getsignedcookie` to set a signed cookie
   - Visit `http://localhost:3000/verifyfruit` to view signed cookies

## Key Learning Points

- **Cookies** are small files stored on the client side that are sent with every request
- **Signed Cookies** are protected with a secret key, making them tamper-proof
- **cookie-parser** middleware makes it easy to access cookies via `req.cookies` and `req.signedCookies`
- Signed cookies are stored in `req.signedCookies` instead of `req.cookies`
