
# Express Session — Learning Example

This tiny project demonstrates a simple Express app that uses `express-session` to manage user sessions. It's intended for learning and experimentation.

What this app does
- Starts an Express server (see `index.js`).
- Uses `express-session` to create and maintain a session for each visitor.
- Demonstrates storing small pieces of user data in a session (e.g., a visit counter).

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
node index.js
```

3. Open http://localhost:3000 in your browser and interact with the example endpoints.

Tiny example (how sessions are used)

Add or check a simple counter in a route to see sessions in action:

```js
app.get('/', (req, res) => {
  if (!req.session.views) req.session.views = 0;
  req.session.views += 1;
  res.send(`Views this session: ${req.session.views}`);
});
```

Short notes on `express-session` and sessions

- What is a session?
  - A session ties server-side data to a specific client. The browser holds a small cookie with the session id; the server looks up session data using that id.

- How `express-session` works (high level):
  - Creates a session object and id for new visitors.
  - Sends the session id to the client in a cookie (default: `connect.sid`).
  - Stores session data server-side (MemoryStore by default).
  - Restores the session on subsequent requests when the cookie is presented.

- Key options to know:
  - `secret`: signs the cookie — keep it secret and unpredictable.
  - `resave`: whether to save unchanged sessions on every request (often `false`).
  - `saveUninitialized`: whether to save new but empty sessions (usually `false`).
  - `store`: replace MemoryStore in production (use Redis, etc.).
  - `cookie.secure` / `cookie.httpOnly`: use for transport and XSS protections.

- Security & production tips:
  - Do not use the default MemoryStore in production.
  - Always use HTTPS in production and set `cookie.secure: true`.
  - Use `httpOnly` to reduce XSS exposure to cookies.
  - Implement session expiration and server-side invalidation on logout.

- Sessions vs tokens:
  - Sessions are stateful (server stores data). Tokens (JWT) are typically stateless (client stores the token). Pick based on your architecture and scaling needs.

Further reading
- Official docs: https://www.npmjs.com/package/express-session

This repo is a learning exercise — adapt configuration and storage for any real application.
