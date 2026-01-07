# Express Session — Learning Example

This is a tiny learning project demonstrating a simple Express app that uses `express-session` to manage user sessions.

What this simple app does
- Starts an Express server (see `index.js`).
- Uses `express-session` to create and maintain a session for each visitor.
- Shows how session data is stored server-side while the browser keeps a session cookie.

How to run

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
node index.js
```

Open the server in your browser (usually http://localhost:3000) and observe session behaviour.

Short notes on `express-session` (and sessions generally)

- What is a session?
  - A session is server-side storage associated with a particular client. The browser stores a small session identifier (cookie) which the server uses to look up the session data.

- How `express-session` works (high level):
  - When a client connects, `express-session` creates a session object and assigns it an id.
  - That id is sent to the client in a cookie (default name: `connect.sid`).
  - The session data is kept server-side (in memory by default) keyed by the session id.
  - On subsequent requests the cookie is sent back and the server restores the session from storage.

- Important configuration options:
  - `secret`: used to sign the session ID cookie — always set this to a secure, unpredictable value.
  - `resave`: controls whether to save the session back to the store on every request — usually `false`.
  - `saveUninitialized`: controls whether to save new but unmodified sessions — set according to your needs (false is typical).
  - `store`: the session store (default is MemoryStore which is not suitable for production). Use Redis, Memcached, or a database in production.
  - `cookie.secure`: set to `true` when serving over HTTPS so cookies are only sent over secure channels.

- Security and production notes:
  - Don't use the default in-memory store in production — it leaks memory and is not shared across processes.
  - Use `cookie.httpOnly` to help mitigate XSS access to cookies.
  - Rotate secrets and consider session expiration and invalidation strategies for logout.

- Sessions vs tokens:
  - Sessions are stateful (server holds state). Tokens (e.g., JWT) are often stateless (client holds the token). Choose based on scalability, security, and architecture.

This repository is for learning only — see `express-session` docs for full configuration and production guidance.
