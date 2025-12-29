# Express.js Cheatsheet

## Table of Contents
1. [Basic Setup](#basic-setup)
2. [Routes](#routes)
3. [Middlewares](#middlewares)
4. [Request (req) Methods](#request-req-methods)
5. [Response (res) Methods](#response-res-methods)
6. [Useful Combinations](#useful-combinations)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)

---

## Basic Setup

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Routes

### Route Methods

```javascript
// GET - Retrieve data
app.get('/users', (req, res) => {
  res.send('Get all users');
});

// POST - Create data
app.post('/users', (req, res) => {
  res.send('Create a new user');
});

// PUT - Replace entire resource
app.put('/users/:id', (req, res) => {
  res.send(`Update user ${req.params.id}`);
});

// PATCH - Partial update
app.patch('/users/:id', (req, res) => {
  res.send(`Partially update user ${req.params.id}`);
});

// DELETE - Remove data
app.delete('/users/:id', (req, res) => {
  res.send(`Delete user ${req.params.id}`);
});

// ALL - Match any HTTP method
app.all('/route', (req, res) => {
  res.send('This handles any HTTP method');
});
```

### Route Parameters

```javascript
// URL parameters (:id, :name)
app.get('/users/:id', (req, res) => {
  console.log(req.params.id); // Access parameter
  res.send(`User: ${req.params.id}`);
});

// Multiple parameters
app.get('/users/:id/posts/:postId', (req, res) => {
  console.log(req.params.id);     // user id
  console.log(req.params.postId); // post id
});

// Query parameters (?key=value)
app.get('/search', (req, res) => {
  console.log(req.query.q);    // Access query param
  console.log(req.query.page);
});
```

### Route Matching

```javascript
// Exact path
app.get('/users', handler);

// Pattern matching with regex
app.get(/^\/users\/(\d+)$/, handler);

// Optional segments
app.get('/users/:id?', handler);

// Wildcard
app.get('/files/*', handler);
```

---

## Middlewares

### What is Middleware?

Middleware is a function that has access to `req`, `res`, and `next`. It can:
- Modify req/res objects
- End request-response cycle
- Call the next middleware in the stack

### Global Middleware (Applied to all routes)

```javascript
// Single middleware
app.use(express.json());

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass to next middleware
});

// Multiple middlewares in order
app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
```

### Route-Specific Middleware

```javascript
// Middleware for single route
app.get('/protected', authenticate, (req, res) => {
  res.send('Protected route');
});

// Multiple middlewares for route
app.post('/users', 
  authenticate, 
  validateInput, 
  (req, res) => {
    res.send('User created');
  }
);

// Middleware for multiple routes
app.use('/admin', authenticate, adminRoutes);
```

### Common Middleware Patterns

```javascript
// Logging middleware
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }
  req.user = decodeToken(token);
  next();
};

// Validation middleware
const validateInput = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  next();
};

// Error handling middleware (4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});
```

### Middleware Order

```javascript
// Middleware executes in order
app.use(loggingMiddleware);      // 1st
app.use(authenticate);           // 2nd
app.use(validateInput);          // 3rd

app.get('/data', (req, res) => {
  // Executes after all middlewares
  res.send('Data');
});
```

---

## Request (req) Methods

### req Properties

```javascript
// URL and Path
req.url              // Full URL '/users?page=1'
req.path             // Path '/users'
req.hostname         // Hostname 'example.com'
req.protocol         // Protocol 'http' or 'https'
req.originalUrl      // Original URL with query string

// Method
req.method           // HTTP method 'GET', 'POST', etc.

// Parameters
req.params           // Route parameters { id: '123' }
req.query            // Query parameters { page: '1' }
req.body             // Request body (requires body parser)

// Headers
req.headers          // All headers object
req.get('header-name') // Get specific header
req.header('content-type')

// IP and User Agent
req.ip               // Client IP address
req.ips              // Array of IPs
req.userAgent        // User agent string
req.app              // Reference to Express app

// Custom properties
req.user             // Custom property (set by middleware)
req.custom           // Any custom property
```

### req Methods

```javascript
// Check content type
req.is('application/json')  // true/false
req.is('json')              // Shorthand

// Get header value
req.get('Authorization')
req.header('Authorization')

// Get parameter
req.param('id')             // Check params, then query

// Deprecated but useful for understanding
req.accepts('json')         // Check if client accepts JSON
req.acceptsLanguage()       // Preferred language
req.acceptsCharset()        // Preferred charset
```

---

## Response (res) Methods

### Basic Response Methods

```javascript
// Send response
res.send('text response');           // Sets content-type automatically
res.send({ message: 'json' });       // Sends JSON

// Send JSON explicitly
res.json({ status: 'success' });
res.json([1, 2, 3]);

// Send file
res.sendFile('/path/to/file');       // Send file as response
res.download('/path/to/file');       // Trigger download

// Send status only
res.sendStatus(200);                 // Sends "200"
res.sendStatus(404);
```

### Response Headers

```javascript
// Set header
res.set('Content-Type', 'application/json');
res.header('X-Custom-Header', 'value');

// Multiple headers
res.set({
  'Content-Type': 'application/json',
  'X-Custom': 'value'
});

// Set cookie
res.cookie('name', 'value');
res.cookie('name', 'value', { 
  maxAge: 3600000,      // 1 hour
  httpOnly: true,
  secure: true
});

// Clear cookie
res.clearCookie('name');

// Get header
res.get('content-type');
```

### Status and Redirects

```javascript
// Set status code
res.status(200).send('OK');
res.status(404).json({ message: 'Not found' });
res.status(500).send('Server error');

// Redirect
res.redirect('/new-path');           // 302 redirect
res.redirect(301, '/new-path');      // 301 permanent redirect
res.redirect('http://example.com');  // Absolute URL

// Redirect methods
res.redirectBack();                  // Back to referrer

// Location header (for redirects)
res.location('/path');
res.redirect(res.location);
```

### Content Type and Encoding

```javascript
// Set content type
res.type('json');
res.type('application/json');
res.type('text/html');
res.type('text/plain');
res.type('image/png');

// Set character encoding
res.charset('utf-8');

// Set content disposition (for downloads)
res.attachment('filename.pdf');      // Inline
res.download('filename.pdf');        // Force download
```

### Response Ending

```javascript
// Send and end response (all send methods end response)
res.send('Response');                // Automatically ends
res.json({});                        // Automatically ends

// End without sending body
res.end();
res.end('Final message');

// Check if response sent
res.headersSent                      // boolean
```

### Advanced Response Methods

```javascript
// Send with format (content negotiation)
res.format({
  'text/plain': () => {
    res.send('plain text');
  },
  'text/html': () => {
    res.send('<h1>HTML</h1>');
  },
  'application/json': () => {
    res.send({ message: 'JSON' });
  }
});

// Vary header (for caching)
res.vary('Accept-Encoding');

// Links (for pagination, etc.)
res.links({ next: '/page/2', last: '/page/10' });
```

---

## Useful Combinations

### 1. Authentication + Authorization

```javascript
// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Verify token and set user
  req.user = { id: 1, role: 'admin' };
  next();
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

// Usage
app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Admin page' });
});
```

### 2. CRUD Operations

```javascript
const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// CREATE
app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ (all)
app.get('/users', (req, res) => {
  res.json(users);
});

// READ (one)
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Not found' });
  Object.assign(user, req.body);
  res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});
```

### 3. Request Validation + Response

```javascript
const validateUser = (req, res, next) => {
  const { name, email, age } = req.body;
  
  const errors = [];
  if (!name) errors.push('Name is required');
  if (!email || !email.includes('@')) errors.push('Valid email required');
  if (age && age < 18) errors.push('Must be 18+');
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

app.post('/users', validateUser, (req, res) => {
  const newUser = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date()
  };
  res.status(201).json({
    status: 'success',
    message: 'User created',
    data: newUser
  });
});
```

### 4. Async/Await Routes

```javascript
// Without try-catch (error handling middleware needed)
app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// With wrapper function
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/data', asyncHandler(async (req, res) => {
  const data = await fetchData();
  res.json(data);
}));
```

### 5. Logging + Error Handling

```javascript
// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${res.statusCode} ${req.method} ${req.url} - ${duration}ms`
    );
  });
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    status,
    message,
    timestamp: new Date().toISOString()
  });
});
```

### 6. Route Grouping with Router

```javascript
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create user', data: req.body });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

// Mount router
app.use('/users', router);
// Routes: /users, /users/:id
```

### 7. Query Parameters + Pagination

```javascript
app.get('/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    // ...
  ];
  
  const paginated = products.slice(skip, skip + limit);
  
  res.json({
    page,
    limit,
    total: products.length,
    data: paginated
  });
});
// Usage: /products?page=2&limit=5
```

### 8. File Upload + Response

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }
  
  res.json({
    message: 'File uploaded',
    file: {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size
    }
  });
});
```

### 9. Conditional Response Based on Accept Header

```javascript
app.get('/data', (req, res) => {
  const data = { id: 1, message: 'Hello' };
  
  if (req.accepts('json')) {
    res.json(data);
  } else if (req.accepts('html')) {
    res.send(`<h1>${data.message}</h1>`);
  } else {
    res.type('txt').send('id: 1, message: Hello');
  }
});
```

### 10. Request Info Logging + Status Response

```javascript
app.get('/info', (req, res) => {
  const info = {
    method: req.method,
    url: req.originalUrl,
    path: req.path,
    query: req.query,
    headers: req.headers,
    ip: req.ip,
    userAgent: req.get('user-agent')
  };
  
  res.status(200).json(info);
});
```

---

## Error Handling

### Basic Error Handling

```javascript
// Route not found
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling (must be last, 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Server error',
    status: 500
  });
});
```

### Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

app.get('/user/:id', (req, res, next) => {
  try {
    const user = findUser(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

---

## Best Practices

### 1. Project Structure

```
project/
├── server.js           # Main file
├── routes/
│   ├── users.js
│   ├── products.js
│   └── auth.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── controllers/
│   ├── userController.js
│   └── productController.js
├── models/
│   ├── user.js
│   └── product.js
└── config/
    └── database.js
```

### 2. Status Code Conventions

```javascript
200 - OK                      // Successful GET, PUT, PATCH
201 - Created                 // Successful POST
204 - No Content              // Successful DELETE
400 - Bad Request             // Invalid input
401 - Unauthorized            // Missing/invalid auth
403 - Forbidden               // Authenticated but no permission
404 - Not Found               // Resource not found
500 - Internal Server Error   // Server error
```

### 3. Response Format

```javascript
// Success response
{
  status: 'success',
  code: 200,
  message: 'Data retrieved',
  data: { /* actual data */ }
}

// Error response
{
  status: 'error',
  code: 400,
  message: 'Invalid input',
  errors: [/* error details */]
}
```

### 4. Middleware Best Practices

```javascript
// DO: Specific order matters
app.use(express.json());          // Parse JSON first
app.use(authenticate);            // Then authenticate
app.use(authorize);               // Then authorize
app.use(routes);                  // Then handle routes
app.use(notFound);                // Then handle 404
app.use(errorHandler);            // Finally handle errors

// DON'T: Call next() after sending response
app.use((req, res, next) => {
  res.send('response');           // Already sent
  next();                         // Unnecessary
});
```

### 5. Avoid Memory Leaks

```javascript
// DON'T: Store request in global variable
let globalReq = null;
app.get('/route', (req, res) => {
  globalReq = req;  // Memory leak!
});

// DO: Keep scope local
app.get('/route', (req, res) => {
  const localReq = req;  // Garbage collected
  res.json({});
});
```

---

## Quick Reference

| Method | Purpose | Status |
|--------|---------|--------|
| GET | Retrieve data | 200 |
| POST | Create data | 201 |
| PUT | Replace data | 200 |
| PATCH | Partial update | 200 |
| DELETE | Remove data | 200 |

| Property | Type | Example |
|----------|------|---------|
| req.params | Object | { id: '1' } |
| req.query | Object | { page: '2' } |
| req.body | Object | { name: 'John' } |
| req.headers | Object | { authorization: '...' } |
| req.method | String | 'GET' |
| req.url | String | '/users?id=1' |

| Method | Purpose | Returns |
|--------|---------|---------|
| res.send() | Send response | Object |
| res.json() | Send JSON | JSON |
| res.status() | Set status | Response |
| res.redirect() | Redirect | void |
| res.download() | Download file | void |
| res.end() | End response | void |

---

**Created:** December 29, 2025  
**Version:** 1.0
