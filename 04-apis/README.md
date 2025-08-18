# RESTful Routes with Express

## HTTP Verbs

1. **GET**
   - Used to **retrieve information** from the server.  
   - Data can be sent via **query string** (e.g., `/search?q=term`).  
   - Information is visible in the URL.  

2. **POST**
   - Used to **send data to the server** (e.g., from a form).  
   - Typically used to **create new resources**.  
   - Data is sent in the request **body**, not the URL.  

3. **PATCH / PUT**
   - Used to **update an existing resource**.  
   - `PATCH` is for **partial updates**, while `PUT` is usually for **full replacements**.  

4. **DELETE**
   - Used to **remove a resource** from the server.  

---

## What is REST?

**REST (Representational State Transfer)** is an architectural style for designing web APIs.  
The main principle is treating **server-side data as resources** that can be manipulated using standard HTTP verbs (CRUD operations):  

- **C**reate → `POST`  
- **R**ead → `GET`  
- **U**pdate → `PATCH` or `PUT`  
- **D**elete → `DELETE`  

---

## Practice Project: Comment App

I built a small **comment app** with CRUD functionality.  
Although the app isn’t a full REST API (since it returns EJS-rendered pages instead of JSON), it follows **RESTful routing principles**.

The resource is an **array of comments** (`comments`), each being an object with `id`, `username`, and `comment`.

---

### Routes Implemented

- `GET /comments` → Display all comments.  
  Renders an **EJS template** showing all comments.  

- `GET /comments/new` → Form to create a new comment.  
  Renders a form to submit a username and comment.  

- `POST /comments` → Create a new comment.  
  Handles form submission and pushes the new comment into the `comments` array.  

- `GET /comments/:id` → Show a specific comment.  
  Finds a comment by `id` and renders it.  

- `GET /comments/:id/edit` → Form to edit an existing comment.  
  Renders a form pre-filled with the selected comment.  

- `PATCH /comments/:id` → Update a comment.  
  Updates a comment’s text. Implemented using the **method-override** package to simulate HTTP verbs in forms.  

- `DELETE /comments/:id` → Delete a comment.  
  Removes a comment from the array (also enabled with **method-override**).  

---

## Key Middleware & Setup

- `app.use(methodOverride("_method"))`  
  Allows overriding HTTP verbs using a query string (`?_method=PATCH` or `?_method=DELETE`).  

- `app.use(express.urlencoded({ extended: true }))`  
  Parses form data sent in `application/x-www-form-urlencoded` format.  

- `app.use(express.json())`  
  Parses incoming requests with JSON payloads.  

- `app.set("views", path.join(__dirname, "views"))`  
  Ensures an **absolute path** is used for the `views` folder, so Express can find your EJS templates.  
