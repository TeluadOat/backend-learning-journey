


## Express Middleware
This are functions that run during the request/response lifecycle.

### Keypoints
- have access to request and response objects
- can end HTTP request by sending baack response with respose like res.send()
- can be chained together by calling next()

- Learnt about morgan npm package, which could be useful for debugging during development and used for HTTP request logging.

learnt the next() to call the in the app.use