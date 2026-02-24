# Node.js Interview Quiz - 40 Questions

A comprehensive Node.js quiz covering beginner to expert level topics.

---

## 🟢 Beginner Level (Questions 1-12)

### Question 1: What is Node.js?
**Difficulty**: Beginner

What is Node.js?

A) A JavaScript framework for building websites
B) A JavaScript runtime built on Chrome's V8 engine
C) A database management system
D) A front-end library

**Answer**: B

**Explanation**: Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows JavaScript to run outside the browser, enabling server-side development.

```javascript
// Node.js allows you to run JavaScript on the server
// Create a simple HTTP server

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

// Run with: node server.js
```

**Key Points**:
- Runtime (not framework) - executes JavaScript outside browser
- Built on V8 engine (same engine Chrome uses)
- Event-driven, non-blocking I/O
- Single-threaded with event loop

---

### Question 2: Node.js Architecture
**Difficulty**: Beginner

What type of architecture does Node.js use?

A) Multi-threaded, blocking I/O
B) Single-threaded, blocking I/O
C) Single-threaded, non-blocking I/O (event-driven)
D) Multi-threaded, non-blocking I/O

**Answer**: C

**Explanation**: Node.js uses a single-threaded, non-blocking, event-driven architecture. This makes it efficient for I/O-heavy operations like web servers, APIs, and real-time applications.

```javascript
// Non-blocking I/O example
const fs = require('fs');

console.log('1. Start reading file');

// Non-blocking: doesn't wait for file to be read
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  console.log('3. File read complete');
});

console.log('2. Continue executing other code');

// Output order:
// 1. Start reading file
// 2. Continue executing other code
// 3. File read complete (after file is actually read)

// Compare with blocking (synchronous):
console.log('1. Start reading file');
const data = fs.readFileSync('large-file.txt', 'utf8'); // Blocks here!
console.log('2. File read complete');
console.log('3. Continue executing');
// Output: 1, 2, 3 (in order, but blocks during read)
```

**Why Single-Threaded Works**:
- I/O operations are offloaded to system kernel
- Event loop handles callbacks when I/O completes
- Efficient for many concurrent connections
- Not ideal for CPU-intensive tasks

---

### Question 3: NPM
**Difficulty**: Beginner

What does NPM stand for?

A) Node Project Manager
B) Node Package Manager
C) New Package Manager
D) Node Program Manager

**Answer**: B

**Explanation**: NPM stands for Node Package Manager. It's the default package manager for Node.js and hosts the world's largest software registry with over 2 million packages.

```bash
# Common NPM commands

# Initialize a new project (creates package.json)
npm init
npm init -y  # Skip questions, use defaults

# Install dependencies
npm install express           # Install and add to dependencies
npm install nodemon --save-dev  # Add to devDependencies
npm install -g typescript     # Install globally
npm i lodash                  # Shorthand for install

# Remove packages
npm uninstall express
npm rm lodash                 # Shorthand

# Update packages
npm update                    # Update all packages
npm update express            # Update specific package

# View installed packages
npm list                      # Local packages
npm list -g --depth=0         # Global packages

# Run scripts from package.json
npm start                     # Runs "start" script
npm test                      # Runs "test" script
npm run dev                   # Runs custom "dev" script

# View package info
npm info express
npm view express versions     # All available versions
```

```json
// package.json example
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

### Question 4: require() Function
**Difficulty**: Beginner

What does the `require()` function do in Node.js?

A) Creates a new module
B) Exports a module
C) Imports and loads a module
D) Deletes a module

**Answer**: C

**Explanation**: The `require()` function is used to import modules, JSON files, or local files in Node.js using the CommonJS module system.

```javascript
// 1. Import built-in modules
const fs = require('fs');
const path = require('path');
const http = require('http');

// 2. Import npm packages
const express = require('express');
const lodash = require('lodash');

// 3. Import local files
const myModule = require('./myModule');       // ./myModule.js
const config = require('./config/settings');  // ./config/settings.js
const data = require('./data.json');          // JSON files work too!

// 4. Import with destructuring
const { readFile, writeFile } = require('fs');
const { Router } = require('express');

// How require() works:
// 1. Resolves the module path
// 2. Loads the module (or uses cache if already loaded)
// 3. Wraps in a function (provides module, exports, require, __filename, __dirname)
// 4. Executes the module code
// 5. Returns module.exports

// Module caching - modules are cached after first load
const mod1 = require('./myModule');  // Loads and caches
const mod2 = require('./myModule');  // Returns cached version
console.log(mod1 === mod2);  // true

// ES Modules alternative (modern Node.js)
// import express from 'express';
// import { readFile } from 'fs/promises';
```

---

### Question 5: package.json
**Difficulty**: Beginner

What is the purpose of `package.json`?

A) To store application data
B) To define project metadata and dependencies
C) To configure the database
D) To store environment variables

**Answer**: B

**Explanation**: `package.json` is the manifest file for Node.js projects. It contains metadata about the project (name, version, description) and lists all dependencies required by the application.

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A sample Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --coverage",
    "build": "tsc",
    "lint": "eslint src/"
  },
  "keywords": ["node", "api", "rest"],
  "author": "John Doe <john@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Version Symbols**:
```javascript
// Semantic Versioning: MAJOR.MINOR.PATCH
"express": "4.18.2"   // Exact version
"express": "^4.18.2"  // Compatible with 4.x.x (minor/patch updates)
"express": "~4.18.2"  // Approximately 4.18.x (patch updates only)
"express": "*"        // Any version (dangerous!)
"express": ">=4.0.0"  // 4.0.0 or higher
```

---

### Question 6: Global Objects
**Difficulty**: Beginner

Which of these is a global object in Node.js?

A) `window`
B) `document`
C) `process`
D) `alert`

**Answer**: C

**Explanation**: `process` is a global object in Node.js that provides information about the current Node.js process. Unlike browsers, Node.js doesn't have `window`, `document`, or `alert` - those are browser-specific.

```javascript
// process - information about current Node.js process
console.log(process.version);      // Node.js version: v18.17.0
console.log(process.platform);     // OS: 'darwin', 'win32', 'linux'
console.log(process.cwd());        // Current working directory
console.log(process.pid);          // Process ID
console.log(process.env.NODE_ENV); // Environment variables
console.log(process.argv);         // Command line arguments

// Exit the process
process.exit(0);  // Success
process.exit(1);  // Error

// Other Node.js globals
console.log(__dirname);   // Directory of current file
console.log(__filename);  // Full path of current file

// global object (like window in browsers)
global.myVar = 'accessible everywhere';  // Not recommended!

// Buffer - for binary data
const buf = Buffer.from('Hello');

// setTimeout, setInterval, setImmediate
setTimeout(() => console.log('delayed'), 1000);

// console
console.log('message');
console.error('error');
console.table([{a: 1}, {a: 2}]);

// NOT available in Node.js (browser-only):
// window, document, alert, localStorage, fetch (until Node 18)
```

---

### Question 7: Callback Functions
**Difficulty**: Beginner

What is a callback function in Node.js?

A) A function that calls itself
B) A function passed as an argument to be executed after an async operation
C) A function that returns immediately
D) A function that blocks execution

**Answer**: B

**Explanation**: A callback is a function passed as an argument to another function, which is then invoked when an asynchronous operation completes. Node.js heavily uses callbacks for async operations.

```javascript
const fs = require('fs');

// Callback pattern
// The callback is called AFTER the file is read
fs.readFile('file.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Error reading file:', error);
    return;
  }
  console.log('File contents:', data);
});

console.log('This runs BEFORE file is read!');

// Custom function with callback
function fetchUserData(userId, callback) {
  // Simulate async database query
  setTimeout(() => {
    const user = { id: userId, name: 'John' };
    callback(null, user);  // Error-first pattern
  }, 1000);
}

// Using the callback
fetchUserData(123, (error, user) => {
  if (error) {
    console.error('Failed to fetch user:', error);
    return;
  }
  console.log('User:', user);
});

// Callback Hell (anti-pattern)
// Nested callbacks become hard to read and maintain
fs.readFile('file1.txt', (err, data1) => {
  fs.readFile('file2.txt', (err, data2) => {
    fs.readFile('file3.txt', (err, data3) => {
      // This is "callback hell" or "pyramid of doom"
      console.log(data1, data2, data3);
    });
  });
});

// Solution: Use Promises or async/await (see later questions)
```

---

### Question 8: File System Module
**Difficulty**: Beginner

Which module is used to work with the file system in Node.js?

A) `path`
B) `fs`
C) `file`
D) `io`

**Answer**: B

**Explanation**: The `fs` (file system) module provides APIs for interacting with the file system. It includes methods for reading, writing, updating, and deleting files and directories.

```javascript
const fs = require('fs');
const fsPromises = require('fs/promises');  // Promise-based API

// ========== READING FILES ==========
// Asynchronous (non-blocking)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Synchronous (blocking)
const data = fs.readFileSync('file.txt', 'utf8');

// Promise-based
const data = await fsPromises.readFile('file.txt', 'utf8');

// ========== WRITING FILES ==========
// Overwrites existing content
fs.writeFile('output.txt', 'Hello World', (err) => {
  if (err) throw err;
  console.log('File saved!');
});

// Append to file
fs.appendFile('log.txt', 'New log entry\n', (err) => {
  if (err) throw err;
});

// ========== DIRECTORIES ==========
// Create directory
fs.mkdir('new-folder', { recursive: true }, (err) => {});

// Read directory contents
fs.readdir('./', (err, files) => {
  console.log(files);  // ['file1.txt', 'file2.txt', ...]
});

// ========== FILE INFO ==========
fs.stat('file.txt', (err, stats) => {
  console.log(stats.isFile());       // true
  console.log(stats.isDirectory());  // false
  console.log(stats.size);           // File size in bytes
});

// ========== DELETE ==========
fs.unlink('file.txt', (err) => {});      // Delete file
fs.rmdir('folder', (err) => {});          // Delete empty directory
fs.rm('folder', { recursive: true });     // Delete directory with contents

// ========== CHECK IF EXISTS ==========
fs.access('file.txt', fs.constants.F_OK, (err) => {
  console.log(err ? 'Does not exist' : 'Exists');
});
```

---

### Question 9: Creating HTTP Server
**Difficulty**: Beginner

Which module is used to create an HTTP server in Node.js?

A) `server`
B) `express`
C) `http`
D) `web`

**Answer**: C

**Explanation**: The built-in `http` module is used to create HTTP servers in Node.js. Express is a framework built on top of http that provides additional features.

```javascript
const http = require('http');

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  // req = IncomingMessage (request from client)
  // res = ServerResponse (response to send back)

  console.log(`${req.method} ${req.url}`);

  // Set response headers
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;

  // Simple routing
  if (req.url === '/' && req.method === 'GET') {
    res.end('<h1>Home Page</h1>');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.end('<h1>About Page</h1>');
  } else if (req.url === '/api/users' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([{ id: 1, name: 'John' }]));
  } else {
    res.statusCode = 404;
    res.end('<h1>404 Not Found</h1>');
  }
});

// Start listening on port 3000
server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000');
});

// Handle POST data
const server2 = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log('Received:', JSON.parse(body));
      res.end('Data received');
    });
  }
});

// Compare with Express (much simpler)
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Home'));
app.get('/about', (req, res) => res.send('About'));
app.listen(3000);
```

---

### Question 10: Environment Variables
**Difficulty**: Beginner

How do you access environment variables in Node.js?

A) `env.VARIABLE`
B) `process.env.VARIABLE`
C) `global.env.VARIABLE`
D) `system.env.VARIABLE`

**Answer**: B

**Explanation**: Environment variables are accessed through the `process.env` object. They're commonly used for configuration, secrets, and environment-specific settings.

```javascript
// Access environment variables
console.log(process.env.NODE_ENV);     // 'development', 'production', etc.
console.log(process.env.PORT);          // Server port
console.log(process.env.DATABASE_URL);  // Database connection string
console.log(process.env.API_KEY);       // API keys (keep secret!)

// Set environment variables

// Method 1: Command line
// NODE_ENV=production node app.js
// PORT=3000 node app.js

// Method 2: .env file with dotenv package
// npm install dotenv

// .env file:
// PORT=3000
// DATABASE_URL=mongodb://localhost/mydb
// API_KEY=secret123

// app.js:
require('dotenv').config();  // Load .env file
console.log(process.env.PORT);  // '3000'

// Method 3: Check and provide defaults
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// Common pattern for configuration
const config = {
  port: process.env.PORT || 3000,
  database: process.env.DATABASE_URL || 'mongodb://localhost/dev',
  jwtSecret: process.env.JWT_SECRET,
  isProduction: process.env.NODE_ENV === 'production'
};

if (!config.jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required');
}

// IMPORTANT: Never commit .env to git!
// Add .env to .gitignore
// Use .env.example for documentation
```

---

### Question 11: Asynchronous vs Synchronous
**Difficulty**: Beginner

What is the difference between `fs.readFile()` and `fs.readFileSync()`?

A) No difference
B) `readFile` is asynchronous, `readFileSync` is synchronous
C) `readFileSync` is faster
D) `readFile` only works with text files

**Answer**: B

**Explanation**: `fs.readFile()` is asynchronous and non-blocking (uses callback), while `fs.readFileSync()` is synchronous and blocks the event loop until the operation completes.

```javascript
const fs = require('fs');

// ========== SYNCHRONOUS (Blocking) ==========
console.log('1. Before sync read');

// Blocks entire thread until file is read
const dataSync = fs.readFileSync('large-file.txt', 'utf8');
console.log('2. File read (sync)');  // Waits here

console.log('3. After sync read');
// Output: 1, 2, 3 (in order)

// ========== ASYNCHRONOUS (Non-blocking) ==========
console.log('1. Before async read');

// Doesn't block - callback runs when done
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  console.log('3. File read (async)');
});

console.log('2. After async call');
// Output: 1, 2, 3 (2 comes before 3!)

// ========== WHEN TO USE EACH ==========

// ✅ Use ASYNC for:
// - Web servers (handle multiple requests)
// - Any I/O during runtime
// - File uploads/downloads
// - Database queries

// ✅ Use SYNC for:
// - Startup/initialization code
// - CLI tools
// - Scripts that run once
// - Reading config files at startup

// Example: Config at startup (sync is OK)
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Example: Web server (must use async)
const http = require('http');
http.createServer((req, res) => {
  // ❌ BAD: Blocks all other requests!
  const data = fs.readFileSync('file.txt');

  // ✅ GOOD: Non-blocking
  fs.readFile('file.txt', (err, data) => {
    res.end(data);
  });
}).listen(3000);
```

---

### Question 12: Module Exports
**Difficulty**: Beginner

How do you export a function from a module in Node.js (CommonJS)?

A) `export function myFunc() {}`
B) `module.exports = myFunc`
C) `exports.default = myFunc`
D) `return myFunc`

**Answer**: B

**Explanation**: In CommonJS (Node.js default), you use `module.exports` or `exports` to make values available to other files that `require()` your module.

```javascript
// ========== math.js (exporting) ==========

// Method 1: Export single value
function add(a, b) {
  return a + b;
}
module.exports = add;

// Usage: const add = require('./math');

// Method 2: Export multiple values
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

module.exports = { add, subtract };
// Or:
module.exports.add = add;
module.exports.subtract = subtract;

// Usage: const { add, subtract } = require('./math');

// Method 3: Using exports shorthand
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// ⚠️ IMPORTANT: Don't reassign exports directly!
exports = { add };  // ❌ This breaks the reference!
module.exports = { add };  // ✅ This works

// Method 4: Export a class
class Calculator {
  add(a, b) { return a + b; }
}
module.exports = Calculator;

// Usage: const Calculator = require('./Calculator');

// ========== app.js (importing) ==========
const add = require('./math');           // Single export
const { add, subtract } = require('./math');  // Multiple exports
const math = require('./math');          // Import all as object
const Calculator = require('./Calculator');  // Import class

// ========== ES Modules (modern, needs "type": "module" in package.json) ==========
// math.mjs or with "type": "module"
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// Importing ES Modules
import multiply, { add } from './math.js';
```

---

## 🟡 Intermediate Level (Questions 13-26)

### Question 13: Event Loop
**Difficulty**: Intermediate

What is the Event Loop in Node.js?

A) A loop that handles user input
B) A mechanism that handles asynchronous callbacks
C) A loop that iterates through arrays
D) A debugging tool

**Answer**: B

**Explanation**: The Event Loop is the core mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It continuously checks for pending callbacks and executes them.

```javascript
// Event Loop visualization
console.log('1. Synchronous');

setTimeout(() => {
  console.log('4. setTimeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise callback');
});

console.log('2. Synchronous');

// Output: 1, 2, 3, 4
// Why? Event loop phases and microtasks

/*
Event Loop Phases:
┌───────────────────────────┐
┌─>│           timers          │ (setTimeout, setInterval)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ (I/O callbacks)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ (internal use)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ (retrieve new I/O events)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ (setImmediate)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ (socket.on('close'))
   └───────────────────────────┘
*/

// Microtasks (Promises, process.nextTick) run BETWEEN phases!

// Practical example
const fs = require('fs');

fs.readFile('file.txt', () => {
  console.log('2. File read callback (poll phase)');

  setTimeout(() => {
    console.log('4. setTimeout in callback');
  }, 0);

  setImmediate(() => {
    console.log('3. setImmediate in callback');
  });
});

console.log('1. Synchronous code');

// Output: 1, 2, 3, 4
// setImmediate runs before setTimeout when inside I/O callback
```

---

### Question 14: Promises
**Difficulty**: Intermediate

What are the three states of a Promise?

A) Start, Middle, End
B) Pending, Fulfilled, Rejected
C) Open, Closed, Error
D) Init, Running, Complete

**Answer**: B

**Explanation**: A Promise can be in one of three states: Pending (initial state, neither fulfilled nor rejected), Fulfilled (operation completed successfully), or Rejected (operation failed).

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve('Operation succeeded!');  // Fulfilled
    } else {
      reject(new Error('Operation failed!'));  // Rejected
    }
  }, 1000);
});

// Consuming a Promise
myPromise
  .then(result => {
    console.log('Success:', result);
    return 'Next value';  // Chain promises
  })
  .then(nextResult => {
    console.log('Chained:', nextResult);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Always runs');
  });

// Promise states example
const pending = new Promise(() => {});  // Never resolves
console.log(pending);  // Promise { <pending> }

const fulfilled = Promise.resolve('value');
console.log(fulfilled);  // Promise { 'value' }

const rejected = Promise.reject(new Error('error'));
console.log(rejected);  // Promise { <rejected> Error: error }

// Converting callbacks to Promises (promisify)
const fs = require('fs');
const util = require('util');

// Manual promisify
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Using util.promisify
const readFile = util.promisify(fs.readFile);

// Or use fs/promises
const fsPromises = require('fs/promises');
const data = await fsPromises.readFile('file.txt', 'utf8');

// Promise utilities
Promise.all([p1, p2, p3]);      // All must succeed
Promise.allSettled([p1, p2]);   // Wait for all, get all results
Promise.race([p1, p2]);         // First to settle wins
Promise.any([p1, p2]);          // First to fulfill wins
```

---

### Question 15: async/await
**Difficulty**: Intermediate

What does the `await` keyword do?

A) Creates a new Promise
B) Pauses async function execution until the Promise resolves
C) Rejects a Promise
D) Converts sync function to async

**Answer**: B

**Explanation**: `await` pauses the execution of an async function until the Promise is resolved or rejected. It makes asynchronous code look and behave more like synchronous code.

```javascript
// async/await syntax
async function fetchUserData(userId) {
  try {
    // await pauses execution until Promise resolves
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();

    console.log('User:', user);
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Equivalent with Promises
function fetchUserDataPromise(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      console.log('User:', user);
      return user;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Sequential vs Parallel execution
async function sequential() {
  const user = await fetchUser();     // Wait
  const posts = await fetchPosts();   // Then wait
  const comments = await fetchComments();  // Then wait
  // Total time: user + posts + comments
}

async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  // Total time: max(user, posts, comments)
}

// Error handling
async function withErrorHandling() {
  try {
    const data = await riskyOperation();
    return data;
  } catch (error) {
    console.error('Failed:', error);
    return null;  // Or rethrow
  }
}

// Top-level await (Node.js 14.8+ with ES modules)
// In .mjs file or with "type": "module"
const data = await fsPromises.readFile('config.json', 'utf8');

// IIFE for top-level await in CommonJS
(async () => {
  const data = await fetchData();
  console.log(data);
})();
```

---

### Question 16: Error Handling
**Difficulty**: Intermediate

What is the standard error-first callback pattern in Node.js?

A) `callback(result, error)`
B) `callback(error, result)`
C) `callback(result)`
D) `callback({error, result})`

**Answer**: B

**Explanation**: Node.js uses an error-first callback pattern where the first argument is the error (null if no error) and the second is the result. This convention is followed throughout Node.js core modules.

```javascript
const fs = require('fs');

// Error-first callback pattern
fs.readFile('file.txt', 'utf8', (error, data) => {
  // First argument is always error (or null)
  if (error) {
    console.error('Error reading file:', error.message);
    return;  // Important: return early!
  }

  // Second argument is the result
  console.log('File contents:', data);
});

// Creating functions with error-first callbacks
function divideAsync(a, b, callback) {
  setTimeout(() => {
    if (b === 0) {
      // Pass error as first argument
      callback(new Error('Cannot divide by zero'), null);
      return;
    }
    // Pass null for error, result as second argument
    callback(null, a / b);
  }, 100);
}

// Using the function
divideAsync(10, 2, (error, result) => {
  if (error) {
    console.error('Division failed:', error.message);
    return;
  }
  console.log('Result:', result);  // 5
});

// Error handling in Express
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);  // Pass to error handling middleware
  }
});

// Global error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);  // Exit after logging
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

---

### Question 17: Buffer
**Difficulty**: Intermediate

What is a Buffer in Node.js?

A) A temporary storage for strings
B) A way to handle binary data directly
C) A caching mechanism
D) A database connection pool

**Answer**: B

**Explanation**: Buffer is a class that provides a way to work with binary data directly in Node.js. It's essential for handling streams, file operations, and network communication.

```javascript
// Creating Buffers
const buf1 = Buffer.alloc(10);           // 10 bytes, filled with zeros
const buf2 = Buffer.alloc(10, 1);        // 10 bytes, filled with 1s
const buf3 = Buffer.from('Hello');       // From string
const buf4 = Buffer.from([72, 101, 108]); // From array of bytes
const buf5 = Buffer.from('48656c6c6f', 'hex');  // From hex string

// Buffer properties
console.log(buf3.length);     // 5 (bytes)
console.log(buf3.toString()); // 'Hello'

// Converting Buffers
const str = buf3.toString('utf8');      // To string
const hex = buf3.toString('hex');       // To hex: '48656c6c6f'
const base64 = buf3.toString('base64'); // To base64: 'SGVsbG8='
const json = buf3.toJSON();             // { type: 'Buffer', data: [72, 101, ...] }

// Reading from Buffer
console.log(buf3[0]);        // 72 (ASCII code for 'H')
console.log(buf3.readInt8(0)); // Read signed integer

// Writing to Buffer
buf1.write('Hi');            // Write string
buf1[0] = 72;                // Direct byte access
buf1.writeInt8(65, 0);       // Write at offset

// Useful Buffer operations
const combined = Buffer.concat([buf3, buf4]);  // Combine buffers
const sliced = buf3.slice(0, 2);               // Slice (view, not copy)
const copied = Buffer.from(buf3);              // Copy buffer
const equal = buf3.equals(buf4);               // Compare buffers

// Common use cases
// 1. File operations
const fs = require('fs');
const fileBuffer = fs.readFileSync('image.png');
console.log(fileBuffer.length);  // File size in bytes

// 2. Network data
const net = require('net');
const server = net.createServer((socket) => {
  socket.on('data', (buffer) => {
    console.log('Received bytes:', buffer.length);
    console.log('As string:', buffer.toString());
  });
});

// 3. Crypto operations
const crypto = require('crypto');
const hash = crypto.createHash('sha256')
  .update(Buffer.from('password'))
  .digest('hex');
```

---

### Question 18: Streams
**Difficulty**: Intermediate

What are the four types of streams in Node.js?

A) Input, Output, Error, Log
B) Readable, Writable, Duplex, Transform
C) File, Network, Memory, Process
D) Sync, Async, Buffer, Cache

**Answer**: B

**Explanation**: Node.js has four types of streams: Readable (read data from), Writable (write data to), Duplex (both read and write), and Transform (modify data as it passes through).

```javascript
const fs = require('fs');
const { Transform } = require('stream');

// ========== READABLE STREAMS ==========
// Read data from a source
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024  // 64KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
});
readStream.on('end', () => console.log('Finished reading'));
readStream.on('error', (err) => console.error('Error:', err));

// ========== WRITABLE STREAMS ==========
// Write data to a destination
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello ');
writeStream.write('World!');
writeStream.end();  // Signal end of writing

writeStream.on('finish', () => console.log('Finished writing'));

// ========== PIPING (connecting streams) ==========
// Most efficient way to transfer data
const readStream2 = fs.createReadStream('source.txt');
const writeStream2 = fs.createWriteStream('destination.txt');

readStream2.pipe(writeStream2);

// ========== TRANSFORM STREAMS ==========
// Modify data as it passes through
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

fs.createReadStream('input.txt')
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream('output.txt'));

// ========== DUPLEX STREAMS ==========
// Both readable and writable (like TCP socket)
const net = require('net');
const socket = net.connect(80, 'example.com');
socket.write('GET / HTTP/1.1\r\n\r\n');  // Write
socket.on('data', (data) => {});          // Read

// ========== PRACTICAL EXAMPLE: File copy ==========
function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    const read = fs.createReadStream(source);
    const write = fs.createWriteStream(destination);

    read.on('error', reject);
    write.on('error', reject);
    write.on('finish', resolve);

    read.pipe(write);
  });
}

// Why streams? Memory efficiency!
// Without streams (loads entire file into memory):
const data = fs.readFileSync('huge-file.txt');  // 1GB in memory!

// With streams (processes in chunks):
fs.createReadStream('huge-file.txt')
  .pipe(fs.createWriteStream('copy.txt'));  // Only ~64KB at a time
```

---

### Question 19: EventEmitter
**Difficulty**: Intermediate

What is EventEmitter used for?

A) Scheduling tasks
B) Handling and emitting custom events
C) Managing HTTP requests
D) Connecting to databases

**Answer**: B

**Explanation**: EventEmitter is a class that allows objects to emit named events and register listener functions (callbacks) to handle those events. It's the foundation of Node.js event-driven architecture.

```javascript
const EventEmitter = require('events');

// Create an event emitter
const emitter = new EventEmitter();

// Register event listeners
emitter.on('userCreated', (user) => {
  console.log('User created:', user.name);
});

emitter.on('userCreated', (user) => {
  // Multiple listeners for same event
  console.log('Sending welcome email to:', user.email);
});

// Emit an event
emitter.emit('userCreated', { name: 'John', email: 'john@example.com' });

// One-time listener
emitter.once('serverStarted', () => {
  console.log('Server started - this runs only once!');
});

// Remove listeners
const callback = () => console.log('Hello');
emitter.on('greet', callback);
emitter.off('greet', callback);  // or removeListener
emitter.removeAllListeners('greet');  // Remove all

// Error handling (special 'error' event)
emitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
});
emitter.emit('error', new Error('Something went wrong'));

// ========== PRACTICAL EXAMPLE: Custom class ==========
class UserService extends EventEmitter {
  constructor() {
    super();
  }

  async createUser(userData) {
    // Simulate database operation
    const user = { id: Date.now(), ...userData };

    // Emit event after creation
    this.emit('userCreated', user);

    return user;
  }

  async deleteUser(userId) {
    // Simulate deletion
    this.emit('userDeleted', userId);
  }
}

const userService = new UserService();

// Subscribe to events
userService.on('userCreated', (user) => {
  console.log('Send welcome email to:', user.email);
});

userService.on('userCreated', (user) => {
  console.log('Log to analytics:', user.id);
});

userService.on('userDeleted', (userId) => {
  console.log('Clean up user data:', userId);
});

// Trigger events
userService.createUser({ name: 'John', email: 'john@test.com' });

// Useful methods
console.log(emitter.listenerCount('userCreated'));  // Count listeners
console.log(emitter.eventNames());  // List all event names
```

---

### Question 20: Middleware
**Difficulty**: Intermediate

In Express.js, what is middleware?

A) Database connection layer
B) Functions that have access to request, response, and next function
C) Template engine
D) Static file server

**Answer**: B

**Explanation**: Middleware functions have access to the request object (req), response object (res), and the next middleware function (next). They can execute code, modify req/res, end the request-response cycle, or call the next middleware.

```javascript
const express = require('express');
const app = express();

// ========== TYPES OF MIDDLEWARE ==========

// 1. Application-level middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();  // Call next middleware
});

// 2. Route-specific middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  req.user = verifyToken(token);  // Attach to request
  next();
};

app.get('/profile', authMiddleware, (req, res) => {
  res.json(req.user);
});

// 3. Built-in middleware
app.use(express.json());         // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded
app.use(express.static('public'));  // Serve static files

// 4. Third-party middleware
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());           // Enable CORS
app.use(helmet());         // Security headers
app.use(morgan('dev'));    // Request logging

// 5. Error-handling middleware (4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ========== MIDDLEWARE EXECUTION ORDER ==========
app.use((req, res, next) => {
  console.log('1. First middleware');
  next();
});

app.use((req, res, next) => {
  console.log('2. Second middleware');
  next();
});

app.get('/test', (req, res) => {
  console.log('3. Route handler');
  res.send('Done');
});

// Request to /test outputs: 1, 2, 3

// ========== ASYNC MIDDLEWARE ==========
const asyncMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    req.user = user;
    next();
  } catch (error) {
    next(error);  // Pass error to error handler
  }
};
```

---

### Question 21: REST API Methods
**Difficulty**: Intermediate

Which HTTP method should be used to update an existing resource?

A) GET
B) POST
C) PUT or PATCH
D) DELETE

**Answer**: C

**Explanation**: PUT is used to update/replace an entire resource, while PATCH is used for partial updates. GET retrieves data, POST creates new resources, and DELETE removes resources.

```javascript
const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'John', email: 'john@test.com' },
  { id: 2, name: 'Jane', email: 'jane@test.com' }
];

// GET - Retrieve resources
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST - Create new resource
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);  // 201 Created
});

// PUT - Replace entire resource
app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  // Replace entire object
  users[index] = {
    id: parseInt(req.params.id),
    name: req.body.name,
    email: req.body.email
  };
  res.json(users[index]);
});

// PATCH - Partial update
app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Update only provided fields
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  res.json(user);
});

// DELETE - Remove resource
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(index, 1);
  res.status(204).send();  // 204 No Content
});

/*
HTTP Methods Summary:
| Method | Purpose        | Idempotent | Safe |
|--------|---------------|------------|------|
| GET    | Read          | Yes        | Yes  |
| POST   | Create        | No         | No   |
| PUT    | Replace       | Yes        | No   |
| PATCH  | Partial Update| No         | No   |
| DELETE | Delete        | Yes        | No   |

Idempotent: Same request multiple times = same result
Safe: Doesn't modify data
*/
```

---

### Question 22: Path Module
**Difficulty**: Intermediate

What does `path.join()` do?

A) Combines URL segments
B) Joins path segments using the platform-specific separator
C) Creates a new directory
D) Validates file paths

**Answer**: B

**Explanation**: `path.join()` joins all given path segments using the platform-specific separator (/ on Unix, \\ on Windows), normalizing the resulting path.

```javascript
const path = require('path');

// ========== path.join() ==========
// Joins paths with correct separator
console.log(path.join('/users', 'john', 'documents'));
// Unix: /users/john/documents
// Windows: \users\john\documents

console.log(path.join('/users', '../admin', 'documents'));
// /admin/documents (normalizes ..)

// ========== path.resolve() ==========
// Resolves to absolute path
console.log(path.resolve('src', 'index.js'));
// /current/working/directory/src/index.js

console.log(path.resolve('/users', 'john'));
// /users/john (absolute path)

// ========== path.basename() ==========
// Get filename from path
console.log(path.basename('/users/john/file.txt'));  // 'file.txt'
console.log(path.basename('/users/john/file.txt', '.txt'));  // 'file'

// ========== path.dirname() ==========
// Get directory name
console.log(path.dirname('/users/john/file.txt'));  // '/users/john'

// ========== path.extname() ==========
// Get file extension
console.log(path.extname('file.txt'));      // '.txt'
console.log(path.extname('file.tar.gz'));   // '.gz'
console.log(path.extname('file'));          // ''

// ========== path.parse() ==========
// Parse path into components
console.log(path.parse('/users/john/file.txt'));
// {
//   root: '/',
//   dir: '/users/john',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// ========== path.format() ==========
// Create path from object
console.log(path.format({
  dir: '/users/john',
  name: 'file',
  ext: '.txt'
}));  // '/users/john/file.txt'

// ========== Common patterns ==========
// Get current directory
console.log(__dirname);  // /path/to/current/folder
console.log(__filename); // /path/to/current/file.js

// Build paths relative to current file
const configPath = path.join(__dirname, 'config', 'settings.json');
const parentPath = path.join(__dirname, '..');

// Normalize messy paths
console.log(path.normalize('/users//john/../admin/./docs'));
// '/users/admin/docs'

// Check if path is absolute
console.log(path.isAbsolute('/users/john'));  // true
console.log(path.isAbsolute('./file.txt'));    // false
```

---

### Question 23: process.nextTick()
**Difficulty**: Intermediate

When does `process.nextTick()` callback execute?

A) After the current event loop iteration
B) Before the current operation completes, after the current code
C) At the end of all operations
D) Randomly during execution

**Answer**: B

**Explanation**: `process.nextTick()` schedules a callback to be invoked in the same phase of the event loop, immediately after the current operation completes but before the event loop continues.

```javascript
// process.nextTick() vs setImmediate() vs setTimeout()

console.log('1. Start');

setTimeout(() => {
  console.log('5. setTimeout');
}, 0);

setImmediate(() => {
  console.log('4. setImmediate');
});

process.nextTick(() => {
  console.log('3. nextTick');
});

console.log('2. End');

// Output: 1, 2, 3, 4, 5
// (setTimeout and setImmediate order may vary outside I/O)

// nextTick runs BEFORE event loop continues
// setImmediate runs in "check" phase of event loop
// setTimeout runs in "timers" phase

// ========== Use cases for nextTick ==========

// 1. Defer execution but run before I/O
function MyEmitter() {
  // If we emit immediately, no listeners attached yet!
  // process.nextTick(() => this.emit('ready'));
}

// 2. Allow callbacks to be registered before execution
const EventEmitter = require('events');

class MyClass extends EventEmitter {
  constructor() {
    super();
    // Emit after constructor returns
    process.nextTick(() => {
      this.emit('ready');
    });
  }
}

const obj = new MyClass();
obj.on('ready', () => {
  console.log('Ready!');  // This works because of nextTick
});

// 3. Break up CPU-intensive work
function processArray(arr, callback) {
  let i = 0;

  function processNext() {
    if (i < arr.length) {
      // Process one item
      console.log(arr[i]);
      i++;
      // Yield to event loop, then continue
      process.nextTick(processNext);
    } else {
      callback();
    }
  }

  processNext();
}

// ⚠️ WARNING: nextTick can starve I/O!
// Too many nextTick calls prevent I/O callbacks from running

function badExample() {
  process.nextTick(badExample);  // Infinite recursion, blocks I/O!
}

// Better: use setImmediate for recursive operations
function betterExample() {
  setImmediate(betterExample);  // Allows I/O between calls
}
```

---

### Question 24: CORS
**Difficulty**: Intermediate

What is CORS?

A) A Node.js framework
B) Cross-Origin Resource Sharing - a security mechanism
C) A database type
D) A testing library

**Answer**: B

**Explanation**: CORS (Cross-Origin Resource Sharing) is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one serving the page. Servers must explicitly allow cross-origin requests.

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// ========== UNDERSTANDING CORS ==========
// Same origin: http://example.com/page1 → http://example.com/api ✅
// Cross origin: http://example.com → http://api.other.com ❌ (blocked by browser)

// ========== ENABLING CORS ==========

// Method 1: Allow all origins (not recommended for production)
app.use(cors());

// Method 2: Specific origins
app.use(cors({
  origin: 'http://localhost:3000'  // Only allow this origin
}));

// Method 3: Multiple origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com']
}));

// Method 4: Dynamic origin validation
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Method 5: Full configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  credentials: true,  // Allow cookies
  maxAge: 86400  // Cache preflight for 24 hours
}));

// Method 6: Route-specific CORS
app.get('/public', cors(), (req, res) => {
  res.json({ message: 'Public endpoint' });
});

// ========== MANUAL CORS (without cors package) ==========
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// ========== PREFLIGHT REQUESTS ==========
// Browser sends OPTIONS request before "complex" requests
// Complex = non-simple methods (PUT, DELETE) or custom headers
// Server must respond with allowed methods/headers
```

---

### Question 25: Cluster Module
**Difficulty**: Intermediate

What is the purpose of the cluster module?

A) To organize code into folders
B) To create child processes that share server ports
C) To connect to database clusters
D) To manage package dependencies

**Answer**: B

**Explanation**: The cluster module allows you to create child processes (workers) that share the same server port. This enables Node.js applications to take advantage of multi-core systems.

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...`);

  // Fork workers for each CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker...');
    cluster.fork();  // Replace dead worker
  });

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

} else {
  // Workers share the same port
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}\n`);
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}

// ========== WITH EXPRESS ==========
const express = require('express');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  app.get('/', (req, res) => {
    res.send(`Worker ${process.pid} handled this request`);
  });

  app.listen(3000);
}

// ========== PM2 (easier alternative) ==========
// PM2 handles clustering automatically
// pm2 start app.js -i max  (max = number of CPUs)
// pm2 start app.js -i 4    (4 instances)

// ========== WHEN TO USE CLUSTER ==========
// ✅ CPU-bound operations
// ✅ High-traffic web servers
// ✅ Utilizing multi-core servers

// ❌ Don't use for I/O-bound operations (Node already handles well)
// ❌ Adds complexity - consider PM2 instead
```

---

### Question 26: npm scripts
**Difficulty**: Intermediate

How do you run a custom script defined in package.json?

A) `npm start scriptname`
B) `npm run scriptname`
C) `npm execute scriptname`
D) `npm scriptname`

**Answer**: B

**Explanation**: Custom scripts are run using `npm run scriptname`. Special scripts like `start`, `test`, `stop`, and `restart` can be run directly without `run` (e.g., `npm start`).

```json
// package.json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "build": "tsc",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write .",
    "db:migrate": "prisma migrate dev",
    "db:seed": "node prisma/seed.js",
    "prestart": "npm run build",
    "postinstall": "npm run build"
  }
}
```

```bash
# Running scripts
npm start              # Runs "start" script (no 'run' needed)
npm test               # Runs "test" script (no 'run' needed)
npm run dev            # Runs custom "dev" script
npm run build          # Runs custom "build" script
npm run test:watch     # Scripts can have colons in names

# Pre/Post hooks
npm start              # Runs: prestart → start → poststart
npm install            # Runs: preinstall → install → postinstall

# Passing arguments
npm test -- --watch    # Pass --watch to test script
npm run dev -- --port 4000

# Run multiple scripts
npm run lint && npm run test  # Sequential
npm run lint & npm run test   # Parallel (Unix)

# Using npx for one-off commands
npx eslint .           # Run without installing globally
npx create-react-app   # Run package binary

# Environment variables in scripts
{
  "scripts": {
    "start:prod": "NODE_ENV=production node server.js",
    "start:dev": "NODE_ENV=development nodemon server.js"
  }
}

# Cross-platform env vars (use cross-env package)
{
  "scripts": {
    "start:prod": "cross-env NODE_ENV=production node server.js"
  }
}

# List available scripts
npm run     # Shows all available scripts
```

---

## 🟠 Advanced Level (Questions 27-35)

### Question 27: Event Loop Phases
**Difficulty**: Advanced

What is the correct order of Event Loop phases?

A) Poll, Check, Timers, I/O Callbacks
B) Timers, Pending Callbacks, Poll, Check, Close Callbacks
C) Check, Timers, Poll, Close
D) I/O, Timers, Check, Poll

**Answer**: B

**Explanation**: The Event Loop phases execute in order: Timers → Pending Callbacks → Idle/Prepare → Poll → Check → Close Callbacks. Understanding this helps predict code execution order.

```javascript
/*
┌───────────────────────────┐
│           timers          │  ← setTimeout, setInterval callbacks
└─────────────┬─────────────┘
              │
┌─────────────┴─────────────┐
│     pending callbacks     │  ← I/O callbacks deferred from previous loop
└─────────────┬─────────────┘
              │
┌─────────────┴─────────────┐
│       idle, prepare       │  ← Internal use only
└─────────────┬─────────────┘
              │
┌─────────────┴─────────────┐
│           poll            │  ← Retrieve new I/O events; execute I/O callbacks
└─────────────┬─────────────┘
              │
┌─────────────┴─────────────┐
│           check           │  ← setImmediate callbacks
└─────────────┬─────────────┘
              │
┌─────────────┴─────────────┐
│      close callbacks      │  ← socket.on('close'), cleanup
└───────────────────────────┘

MICROTASKS (process.nextTick, Promises) run between EVERY phase!
*/

const fs = require('fs');

// Example demonstrating phases
fs.readFile(__filename, () => {
  // Inside I/O callback (poll phase)

  setTimeout(() => {
    console.log('3. setTimeout');  // Next timers phase
  }, 0);

  setImmediate(() => {
    console.log('2. setImmediate');  // Check phase (comes first!)
  });

  process.nextTick(() => {
    console.log('1. nextTick');  // Before check phase
  });
});

// Output: 1, 2, 3

// At top level (not in I/O callback), order is non-deterministic:
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
// Could be either order! Depends on system performance

// Microtasks always run first
Promise.resolve().then(() => console.log('1. Promise'));
process.nextTick(() => console.log('2. nextTick'));
setTimeout(() => console.log('4. setTimeout'), 0);
console.log('0. Sync');

// Output: 0, 2, 1, 4
// nextTick has higher priority than Promises
```

---

### Question 28: Memory Leaks
**Difficulty**: Advanced

Which of these commonly causes memory leaks in Node.js?

A) Using const instead of let
B) Uncleared intervals/timeouts, event listeners not removed, closures holding references
C) Using async/await
D) Reading files synchronously

**Answer**: B

**Explanation**: Memory leaks commonly occur from uncleared timers/intervals, event listeners not properly removed, global variables, closures holding references to large objects, and accumulating data structures.

```javascript
// ========== COMMON MEMORY LEAK PATTERNS ==========

// 1. Uncleared intervals/timeouts
function leakyTimer() {
  setInterval(() => {
    // This runs forever, holding references
    processData(largeData);
  }, 1000);
}
// ✅ Fix: Store reference and clear
const interval = setInterval(() => {}, 1000);
clearInterval(interval);

// 2. Event listeners not removed
const EventEmitter = require('events');
const emitter = new EventEmitter();

function addListener() {
  emitter.on('data', (data) => {
    console.log(data);
  });
}
// Called multiple times = multiple listeners!
addListener();
addListener();
addListener();
// ✅ Fix: Remove listeners or use once()
emitter.removeListener('data', callback);
emitter.once('data', callback);

// 3. Closures holding references
function createLeak() {
  const hugeArray = new Array(1000000).fill('x');

  return function() {
    // This closure keeps hugeArray in memory!
    console.log(hugeArray.length);
  };
}
const leak = createLeak();  // hugeArray never garbage collected

// 4. Growing data structures
const cache = {};
function addToCache(key, value) {
  cache[key] = value;  // Grows forever!
}
// ✅ Fix: Use LRU cache with size limits
const LRU = require('lru-cache');
const cache = new LRU({ max: 500 });

// 5. Circular references
function createCircular() {
  const obj1 = {};
  const obj2 = { ref: obj1 };
  obj1.ref = obj2;  // Circular!
}

// ========== DETECTING MEMORY LEAKS ==========

// Monitor memory usage
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    heapUsed: Math.round(used.heapUsed / 1024 / 1024) + 'MB',
    external: Math.round(used.external / 1024 / 1024) + 'MB'
  });
}, 5000);

// Force garbage collection (for testing)
// node --expose-gc app.js
global.gc();

// Tools for debugging:
// - Chrome DevTools (node --inspect)
// - clinic.js
// - heapdump package
```

---

### Question 29: Worker Threads
**Difficulty**: Advanced

What is the purpose of Worker Threads in Node.js?

A) To handle HTTP requests
B) To run JavaScript in parallel threads for CPU-intensive tasks
C) To manage database connections
D) To serve static files

**Answer**: B

**Explanation**: Worker Threads allow running JavaScript code in parallel threads. Unlike the main thread, they're ideal for CPU-intensive tasks that would otherwise block the event loop.

```javascript
// ========== MAIN FILE (main.js) ==========
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // This is the main thread
  console.log('Main thread started');

  // Create a worker
  const worker = new Worker(__filename, {
    workerData: { start: 0, end: 1000000 }
  });

  worker.on('message', (result) => {
    console.log('Result from worker:', result);
  });

  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });

  worker.on('exit', (code) => {
    console.log('Worker exited with code:', code);
  });

} else {
  // This is a worker thread
  const { start, end } = workerData;

  // CPU-intensive task
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += i;
  }

  // Send result back to main thread
  parentPort.postMessage(sum);
}

// ========== PRACTICAL EXAMPLE: Image Processing ==========
// main.js
const { Worker } = require('worker_threads');

function processImage(imagePath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./image-worker.js', {
      workerData: { imagePath }
    });

    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

// image-worker.js
const { parentPort, workerData } = require('worker_threads');
const sharp = require('sharp');

async function process() {
  const { imagePath } = workerData;

  const result = await sharp(imagePath)
    .resize(800, 600)
    .toBuffer();

  parentPort.postMessage(result);
}

process();

// ========== WORKER POOL ==========
const { StaticPool } = require('node-worker-threads-pool');

const pool = new StaticPool({
  size: 4,  // 4 workers
  task: './cpu-task.js'
});

async function runTasks() {
  const results = await Promise.all([
    pool.exec(1000000),
    pool.exec(2000000),
    pool.exec(3000000)
  ]);
  console.log(results);
}

// When to use Worker Threads:
// ✅ CPU-intensive calculations
// ✅ Image/video processing
// ✅ Encryption/compression
// ✅ Complex algorithms

// When NOT to use:
// ❌ I/O operations (Node already handles efficiently)
// ❌ Simple tasks (overhead not worth it)
```

---

### Question 30: Child Processes
**Difficulty**: Advanced

What's the difference between `spawn()` and `exec()` in child_process?

A) No difference
B) `spawn` streams data, `exec` buffers output; `spawn` is better for large data
C) `exec` is faster
D) `spawn` only works on Linux

**Answer**: B

**Explanation**: `spawn()` streams data and is better for large outputs or long-running processes, while `exec()` buffers the entire output in memory and is better for short commands with small output.

```javascript
const { spawn, exec, execFile, fork } = require('child_process');

// ========== exec() - Buffered output ==========
// Best for: Short commands with small output
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Output:', stdout);
});

// With options
exec('npm install', {
  cwd: '/path/to/project',
  maxBuffer: 1024 * 1024 * 10,  // 10MB max
  timeout: 60000
}, callback);

// ========== spawn() - Streamed output ==========
// Best for: Large output, long-running processes
const ls = spawn('ls', ['-la']);

ls.stdout.on('data', (data) => {
  console.log('stdout:', data.toString());
});

ls.stderr.on('data', (data) => {
  console.error('stderr:', data.toString());
});

ls.on('close', (code) => {
  console.log('Process exited with code:', code);
});

// Piping streams
const grep = spawn('grep', ['pattern']);
spawn('cat', ['file.txt']).stdout.pipe(grep.stdin);

// ========== execFile() - Direct executable ==========
// More efficient than exec() for executables (no shell)
execFile('/usr/bin/node', ['--version'], (error, stdout) => {
  console.log('Node version:', stdout);
});

// ========== fork() - Node.js processes ==========
// Best for: Running Node.js scripts with IPC
const child = fork('child-script.js');

// Send message to child
child.send({ hello: 'world' });

// Receive message from child
child.on('message', (msg) => {
  console.log('From child:', msg);
});

// child-script.js
process.on('message', (msg) => {
  console.log('From parent:', msg);
  process.send({ reply: 'received' });
});

// ========== COMPARISON ==========
/*
| Method    | Shell | Buffered | Streams | IPC | Use Case              |
|-----------|-------|----------|---------|-----|-----------------------|
| exec      | Yes   | Yes      | No      | No  | Shell commands        |
| execFile  | No    | Yes      | No      | No  | Executables           |
| spawn     | No*   | No       | Yes     | No  | Large output/streams  |
| fork      | No    | No       | Yes     | Yes | Node.js child scripts |

*spawn can use shell with { shell: true }
*/
```

---

### Question 31: Microservices
**Difficulty**: Advanced

Which of these is NOT a benefit of microservices architecture?

A) Independent deployment of services
B) Technology flexibility per service
C) Simpler debugging and testing
D) Better scalability

**Answer**: C

**Explanation**: Microservices make debugging HARDER due to their distributed nature. Benefits include independent deployment, technology flexibility, scalability, fault isolation, and team autonomy. Challenges include debugging complexity, network latency, and data consistency.

```javascript
// ========== MICROSERVICES ARCHITECTURE ==========

// Monolith:
// One large app handles everything
// [User Auth + Products + Orders + Payments]

// Microservices:
// [User Service] → [Product Service] → [Order Service] → [Payment Service]

// ========== EXAMPLE: USER SERVICE ==========
// user-service/index.js
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.json(user);
});

app.listen(3001, () => {
  console.log('User service on port 3001');
});

// ========== EXAMPLE: ORDER SERVICE ==========
// order-service/index.js
const axios = require('axios');

app.post('/orders', async (req, res) => {
  // Call User Service
  const user = await axios.get(`http://user-service:3001/users/${req.body.userId}`);

  // Call Product Service
  const product = await axios.get(`http://product-service:3002/products/${req.body.productId}`);

  // Create order
  const order = await OrderModel.create({
    userId: user.data.id,
    productId: product.data.id,
    total: product.data.price
  });

  res.json(order);
});

// ========== SERVICE COMMUNICATION ==========

// 1. REST APIs (HTTP)
const user = await axios.get('http://user-service/users/1');

// 2. Message Queues (async)
const amqp = require('amqplib');
const channel = await connection.createChannel();
channel.sendToQueue('orders', Buffer.from(JSON.stringify(order)));

// 3. gRPC (high performance)
const grpc = require('@grpc/grpc-js');
// Define protobuf, create client...

// ========== CHALLENGES ==========

// 1. Distributed tracing (debugging)
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('my-service');

// 2. Service discovery
// Use Kubernetes, Consul, or service mesh

// 3. Data consistency
// Use Saga pattern or event sourcing

// 4. Circuit breaker pattern
const CircuitBreaker = require('opossum');
const breaker = new CircuitBreaker(asyncFunction, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});
```

---

### Question 32: Connection Pooling
**Difficulty**: Advanced

Why is database connection pooling important?

A) It makes queries faster
B) It reuses connections, reducing overhead of creating new connections
C) It encrypts data
D) It backs up data automatically

**Answer**: B

**Explanation**: Connection pooling maintains a cache of database connections that can be reused, avoiding the expensive overhead of establishing new connections for each request. This significantly improves performance and resource utilization.

```javascript
// ========== WITHOUT POOLING (BAD) ==========
const mysql = require('mysql2');

// Creates NEW connection for every request!
app.get('/users', async (req, res) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

  const [rows] = await connection.query('SELECT * FROM users');
  await connection.end();  // Connection discarded!

  res.json(rows);
});

// Problems:
// - Connection overhead (~20-50ms each)
// - Can exhaust database connections
// - Memory waste

// ========== WITH POOLING (GOOD) ==========
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,     // Max connections in pool
  queueLimit: 0,           // Unlimited queue
  idleTimeout: 60000,      // Close idle connections after 60s
  enableKeepAlive: true
});

app.get('/users', async (req, res) => {
  // Get connection from pool (fast!)
  const [rows] = await pool.query('SELECT * FROM users');
  // Connection automatically returned to pool
  res.json(rows);
});

// ========== POSTGRESQL WITH PG ==========
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                 // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Automatic pool management
const result = await pool.query('SELECT * FROM users');

// Or manual for transactions
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('INSERT INTO users...');
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
} finally {
  client.release();  // Return to pool!
}

// ========== MONGOOSE (MONGODB) ==========
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb', {
  maxPoolSize: 10,         // Default is 100
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});

// Connections are pooled automatically
const users = await User.find();

// ========== MONITORING POOL ==========
pool.on('acquire', (connection) => {
  console.log('Connection acquired');
});

pool.on('release', (connection) => {
  console.log('Connection released');
});

console.log({
  total: pool.totalCount,
  idle: pool.idleCount,
  waiting: pool.waitingCount
});
```

---

### Question 33: Garbage Collection
**Difficulty**: Advanced

Which garbage collection algorithm does V8 primarily use?

A) Reference counting
B) Mark-and-Sweep with generational collection
C) Copy collection only
D) Manual memory management

**Answer**: B

**Explanation**: V8 uses a generational garbage collector with Mark-and-Sweep algorithm. It divides objects into "young generation" (short-lived) and "old generation" (long-lived) for efficient memory management.

```javascript
// ========== V8 MEMORY STRUCTURE ==========
/*
┌─────────────────────────────────────────────────────┐
│                     V8 Heap                          │
├─────────────────────────────────────────────────────┤
│  Young Generation (Scavenger)                        │
│  ┌─────────────────┬─────────────────┐              │
│  │   From Space    │    To Space     │              │
│  │   (Active)      │   (Inactive)    │              │
│  └─────────────────┴─────────────────┘              │
├─────────────────────────────────────────────────────┤
│  Old Generation (Mark-Sweep-Compact)                 │
│  ┌─────────────────────────────────────┐            │
│  │  Long-lived objects                  │            │
│  │  (survived multiple GC cycles)       │            │
│  └─────────────────────────────────────┘            │
└─────────────────────────────────────────────────────┘
*/

// ========== YOUNG GENERATION (Scavenger) ==========
// - Small, frequent collections (~1-10ms)
// - Most objects die young
// - Uses copying algorithm (From → To space)
// - Objects surviving 2 collections promoted to Old

// ========== OLD GENERATION (Mark-Sweep-Compact) ==========
// - Larger, less frequent collections
// - Mark: Find all reachable objects
// - Sweep: Remove unmarked objects
// - Compact: Defragment memory

// ========== MONITORING GC ==========
const v8 = require('v8');

console.log(v8.getHeapStatistics());
// {
//   total_heap_size: 4800000,
//   used_heap_size: 2400000,
//   heap_size_limit: 2000000000,
//   ...
// }

// Force GC (for testing only!)
// Run with: node --expose-gc app.js
if (global.gc) {
  global.gc();
}

// ========== GC FLAGS ==========
// node --max-old-space-size=4096 app.js  // 4GB heap
// node --max-semi-space-size=64 app.js   // Young gen size
// node --trace-gc app.js                  // Log GC events

// ========== WRITING GC-FRIENDLY CODE ==========

// 1. Avoid creating unnecessary objects
// ❌ Bad
function processItems(items) {
  return items.map(item => ({ ...item, processed: true }));
}

// ✅ Better (mutate if possible)
function processItems(items) {
  items.forEach(item => item.processed = true);
  return items;
}

// 2. Object pooling for frequent allocations
class ObjectPool {
  constructor(createFn, size = 100) {
    this.pool = Array(size).fill(null).map(() => createFn());
    this.available = [...this.pool];
  }

  acquire() {
    return this.available.pop() || this.createFn();
  }

  release(obj) {
    this.reset(obj);
    this.available.push(obj);
  }
}

// 3. Avoid memory leaks (see Question 28)
```

---

### Question 34: Libuv
**Difficulty**: Advanced

What is libuv in Node.js?

A) A JavaScript library
B) A C library that provides async I/O and event loop
C) A package manager
D) A testing framework

**Answer**: B

**Explanation**: libuv is a C library that provides Node.js with its event loop, asynchronous I/O operations, thread pool for blocking operations, and cross-platform abstractions for networking, file system, and more.

```javascript
// ========== LIBUV ARCHITECTURE ==========
/*
┌───────────────────────────────────────────────────┐
│                   Node.js                          │
├───────────────────────────────────────────────────┤
│  JavaScript Code  ←→  Node.js Bindings (C++)      │
├───────────────────────────────────────────────────┤
│                     libuv (C)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │ Event Loop  │  │ Thread Pool │  │ OS Async  │ │
│  │             │  │ (4 threads) │  │   APIs    │ │
│  └─────────────┘  └─────────────┘  └───────────┘ │
├───────────────────────────────────────────────────┤
│          Operating System (Linux/Windows/macOS)    │
└───────────────────────────────────────────────────┘
*/

// ========== WHAT LIBUV HANDLES ==========

// 1. Event Loop
// - Timer scheduling
// - I/O polling
// - Callback execution

// 2. Thread Pool (Default: 4 threads)
// Used for blocking operations:
const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');

// These use thread pool:
fs.readFile('file.txt', callback);       // File I/O
crypto.pbkdf2('pass', 'salt', 100000);   // Crypto
zlib.gzip(data, callback);               // Compression
dns.lookup('google.com', callback);       // DNS lookup

// Change thread pool size:
// UV_THREADPOOL_SIZE=8 node app.js

// 3. Network I/O (uses OS async APIs, NOT thread pool)
const http = require('http');
const net = require('net');
// These use epoll(Linux)/kqueue(macOS)/IOCP(Windows)

// ========== THREAD POOL EXAMPLE ==========
const crypto = require('crypto');

console.time('hash');

// Each pbkdf2 uses one thread from pool
// With 4 threads, first 4 run in parallel
for (let i = 0; i < 8; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log(`Hash ${i} done`);
  });
}

// Output timing shows batches of 4:
// Hash 0-3: ~1000ms (parallel)
// Hash 4-7: ~2000ms (second batch)

// ========== LIBUV HANDLES & REQUESTS ==========
// Handles: Long-lived objects (timers, sockets)
// Requests: Short-lived operations (file read, dns lookup)

// Examples of handles:
// - uv_tcp_t (TCP socket)
// - uv_timer_t (Timer)
// - uv_fs_event_t (File watcher)

// Examples of requests:
// - uv_fs_t (File system operation)
// - uv_getaddrinfo_t (DNS lookup)
// - uv_work_t (Thread pool work)
```

---

### Question 35: N-API
**Difficulty**: Advanced

What is N-API (Node-API)?

A) A REST API framework
B) An ABI-stable API for building native addons
C) A Node.js web framework
D) A database API

**Answer**: B

**Explanation**: N-API (Node-API) is an API for building native addons that is ABI (Application Binary Interface) stable across Node.js versions. This means native modules don't need to be recompiled for each Node.js version.

```c
// ========== NATIVE ADDON EXAMPLE (C) ==========
// addon.c
#include <node_api.h>

// Function that adds two numbers
napi_value Add(napi_env env, napi_callback_info info) {
  napi_status status;

  // Get arguments
  size_t argc = 2;
  napi_value args[2];
  status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);

  // Convert to C types
  double value1, value2;
  napi_get_value_double(env, args[0], &value1);
  napi_get_value_double(env, args[1], &value2);

  // Create result
  napi_value result;
  napi_create_double(env, value1 + value2, &result);

  return result;
}

// Module initialization
napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value fn;

  status = napi_create_function(env, NULL, 0, Add, NULL, &fn);
  status = napi_set_named_property(env, exports, "add", fn);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```

```javascript
// ========== USING THE ADDON ==========
const addon = require('./build/Release/addon');

console.log(addon.add(3, 5));  // 8

// ========== BUILDING NATIVE ADDONS ==========
// binding.gyp
{
  "targets": [
    {
      "target_name": "addon",
      "sources": ["addon.c"]
    }
  ]
}

// Build commands:
// npm install node-gyp -g
// node-gyp configure
// node-gyp build

// ========== N-API vs NAN ==========
/*
N-API (Node-API):
✅ ABI stable - no recompile needed
✅ Part of Node.js core
✅ Works across Node versions
✅ Simpler API

NAN (Native Abstractions for Node):
❌ Needs recompile for each Node version
❌ More complex
❌ Legacy approach
*/

// ========== NODE-ADDON-API (C++ wrapper) ==========
// Easier C++ wrapper around N-API
#include <napi.h>

Napi::Number Add(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  double arg0 = info[0].As<Napi::Number>().DoubleValue();
  double arg1 = info[1].As<Napi::Number>().DoubleValue();
  return Napi::Number::New(env, arg0 + arg1);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("add", Napi::Function::New(env, Add));
  return exports;
}

NODE_API_MODULE(addon, Init)

// When to use native addons:
// ✅ Performance-critical code (image processing, crypto)
// ✅ Interfacing with C/C++ libraries
// ✅ System-level operations
// ❌ Most applications (JS is fast enough)
```

---

## 🔴 Expert Level (Questions 36-40)

### Question 36: V8 Optimization
**Difficulty**: Expert

What is "hidden class" in V8's optimization?

A) A private class in JavaScript
B) Internal data structure V8 uses to optimize property access
C) A class that doesn't export
D) An encrypted class

**Answer**: B

**Explanation**: Hidden classes (also called "Maps" or "Shapes") are internal data structures V8 creates to optimize property access. Objects with the same structure share hidden classes, enabling fast property access similar to statically-typed languages.

```javascript
// ========== HIDDEN CLASSES EXPLAINED ==========

// V8 creates hidden classes to optimize property access
// Objects with same structure share the same hidden class

function Point(x, y) {
  this.x = x;  // Hidden class C0 → C1
  this.y = y;  // Hidden class C1 → C2
}

const p1 = new Point(1, 2);  // Uses hidden class C2
const p2 = new Point(3, 4);  // Shares hidden class C2 (same structure!)

// V8 can now optimize property access like a statically-typed language

// ========== HIDDEN CLASS TRANSITIONS ==========
/*
{}           → Hidden Class C0
{x: 1}       → Hidden Class C1 (C0 + property 'x')
{x: 1, y: 2} → Hidden Class C2 (C1 + property 'y')
*/

// ========== DEOPTIMIZATION PATTERNS ==========

// ❌ BAD: Adding properties in different orders
function createPointBad1(x, y) {
  const p = {};
  p.x = x;
  p.y = y;
  return p;  // Hidden class: {} → {x} → {x,y}
}

function createPointBad2(x, y) {
  const p = {};
  p.y = y;
  p.x = x;
  return p;  // Hidden class: {} → {y} → {y,x}
}
// Different hidden classes! Can't optimize together

// ✅ GOOD: Same property order
function createPointGood(x, y) {
  return { x, y };  // Always same structure
}

// ❌ BAD: Deleting properties
const obj = { a: 1, b: 2 };
delete obj.b;  // Transitions to slow "dictionary mode"

// ❌ BAD: Adding properties after creation
function UserBad(name) {
  this.name = name;
}
const user = new UserBad('John');
user.age = 30;  // Hidden class change!

// ✅ GOOD: Define all properties in constructor
function UserGood(name, age) {
  this.name = name;
  this.age = age || null;  // Always present
}

// ========== INLINE CACHING ==========
// V8 caches property locations for repeated access

function getX(point) {
  return point.x;  // V8 remembers offset of 'x'
}

// Fast if all points have same hidden class:
getX({ x: 1, y: 2 });
getX({ x: 3, y: 4 });

// Slow if different structures (polymorphic):
getX({ x: 1, y: 2 });
getX({ x: 1, z: 3 });  // Different structure!

// ========== OPTIMIZATION TIPS ==========
// 1. Always initialize properties in same order
// 2. Don't add properties after creation
// 3. Don't delete properties
// 4. Use consistent types for properties
// 5. Initialize all properties in constructors

// Tools: node --trace-opt --trace-deopt app.js
```

---

### Question 37: Async Hooks
**Difficulty**: Expert

What is the purpose of the `async_hooks` module?

A) To create async functions
B) To track the lifetime of asynchronous resources
C) To handle webhooks
D) To schedule tasks

**Answer**: B

**Explanation**: The `async_hooks` module provides an API to track asynchronous resources (Promises, Timers, Streams, etc.) throughout their lifecycle. It's essential for building debugging tools, APM (Application Performance Monitoring), and context propagation.

```javascript
const async_hooks = require('async_hooks');
const fs = require('fs');

// ========== BASIC ASYNC HOOKS ==========
const hook = async_hooks.createHook({
  // Called when async resource is created
  init(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `Init: ${type} (${asyncId})\n`);
  },

  // Called before callback executes
  before(asyncId) {
    fs.writeSync(1, `Before: ${asyncId}\n`);
  },

  // Called after callback executes
  after(asyncId) {
    fs.writeSync(1, `After: ${asyncId}\n`);
  },

  // Called when resource is destroyed
  destroy(asyncId) {
    fs.writeSync(1, `Destroy: ${asyncId}\n`);
  },

  // Called when Promise resolves
  promiseResolve(asyncId) {
    fs.writeSync(1, `PromiseResolve: ${asyncId}\n`);
  }
});

hook.enable();

// Trigger async operations
setTimeout(() => {
  console.log('Timer callback');
}, 100);

// Output:
// Init: Timeout (2)
// Before: 2
// Timer callback
// After: 2
// Destroy: 2

// ========== ASYNC CONTEXT TRACKING ==========
const async_hooks = require('async_hooks');

// Store for context data
const contexts = new Map();

const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    // Inherit context from parent
    if (contexts.has(triggerAsyncId)) {
      contexts.set(asyncId, contexts.get(triggerAsyncId));
    }
  },
  destroy(asyncId) {
    contexts.delete(asyncId);
  }
});
hook.enable();

// Set context
function setContext(data) {
  contexts.set(async_hooks.executionAsyncId(), data);
}

// Get context
function getContext() {
  return contexts.get(async_hooks.executionAsyncId());
}

// Example: Request tracking
app.use((req, res, next) => {
  setContext({ requestId: uuid(), userId: req.user?.id });
  next();
});

// Anywhere in async code:
function logWithContext(message) {
  const ctx = getContext();
  console.log(`[${ctx?.requestId}] ${message}`);
}

// ========== AsyncLocalStorage (simpler alternative) ==========
const { AsyncLocalStorage } = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();

// Run with context
asyncLocalStorage.run({ requestId: '123' }, () => {
  // All async operations inside inherit context
  setTimeout(() => {
    console.log(asyncLocalStorage.getStore());  // { requestId: '123' }
  }, 100);
});

// Express middleware example
app.use((req, res, next) => {
  asyncLocalStorage.run({ requestId: uuid() }, next);
});

// Get anywhere
function getRequestId() {
  return asyncLocalStorage.getStore()?.requestId;
}
```

---

### Question 38: setImmediate vs setTimeout
**Difficulty**: Expert

In which scenario will `setImmediate` always execute before `setTimeout(fn, 0)`?

A) Always in all cases
B) When called within an I/O callback
C) When called in the main module
D) Never

**Answer**: B

**Explanation**: Within an I/O callback, `setImmediate` always executes before `setTimeout(fn, 0)` because after the poll phase completes, the check phase (setImmediate) runs before the event loop wraps around to the timers phase.

```javascript
const fs = require('fs');

// ========== AT TOP LEVEL: ORDER IS NON-DETERMINISTIC ==========
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

// Could print either order!
// Depends on process performance when entering event loop

// ========== INSIDE I/O CALLBACK: setImmediate ALWAYS FIRST ==========
fs.readFile(__filename, () => {
  setTimeout(() => console.log('2. timeout'), 0);
  setImmediate(() => console.log('1. immediate'));
});

// Always prints: 1. immediate, 2. timeout

// WHY? Event loop phases:
/*
After I/O callback (poll phase), event loop continues to:
1. Check phase → setImmediate runs
2. Close callbacks phase
3. Timers phase → setTimeout runs (next iteration!)
*/

// ========== PRACTICAL EXAMPLE ==========
const server = require('http').createServer((req, res) => {
  // Inside I/O callback
  setImmediate(() => {
    // Run ASAP after response handling
    logRequest(req);
  });

  setTimeout(() => {
    // Run in next timer phase
    cleanupResources();
  }, 0);

  res.end('Hello');
});

// ========== WHEN TO USE WHICH ==========

// setImmediate: Run after current I/O completes
// - Better for breaking up CPU work
// - Runs in check phase
fs.readFile('file.txt', (err, data) => {
  setImmediate(() => processData(data));
});

// setTimeout: Run after minimum delay
// - When you need actual delay
// - Runs in timers phase
setTimeout(() => retryOperation(), 1000);

// process.nextTick: Run before ANY phase
// - Highest priority (can starve I/O!)
// - Runs between every phase
process.nextTick(() => {
  // Runs immediately after current operation
});

// ========== PRIORITY ORDER ==========
fs.readFile(__filename, () => {
  process.nextTick(() => console.log('1. nextTick'));

  Promise.resolve().then(() => console.log('2. Promise'));

  setImmediate(() => console.log('3. setImmediate'));

  setTimeout(() => console.log('4. setTimeout'), 0);
});

// Output: 1, 2, 3, 4
// nextTick → Promises → setImmediate → setTimeout
```

---

### Question 39: Thread Pool
**Difficulty**: Expert

What is the default size of the libuv thread pool and how can it be changed?

A) 2 threads, cannot be changed
B) 4 threads, changed via UV_THREADPOOL_SIZE environment variable
C) 8 threads, changed in package.json
D) Unlimited threads

**Answer**: B

**Explanation**: The default libuv thread pool size is 4 threads. It can be changed by setting the `UV_THREADPOOL_SIZE` environment variable before starting Node.js (maximum 1024 threads).

```javascript
// ========== DEFAULT THREAD POOL SIZE ==========
// libuv creates 4 worker threads by default

// ========== CHANGE THREAD POOL SIZE ==========
// Must be set BEFORE requiring any Node.js module
process.env.UV_THREADPOOL_SIZE = 8;

// Or from command line:
// UV_THREADPOOL_SIZE=8 node app.js

// Or in npm script:
// "start": "UV_THREADPOOL_SIZE=8 node app.js"

// ========== WHAT USES THE THREAD POOL ==========
const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');
const dns = require('dns');

// File system operations
fs.readFile('file.txt', callback);
fs.writeFile('file.txt', data, callback);

// Cryptography
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', callback);
crypto.randomBytes(256, callback);
crypto.scrypt('password', 'salt', 64, callback);

// Compression
zlib.gzip(data, callback);
zlib.deflate(data, callback);

// DNS (only dns.lookup, not dns.resolve)
dns.lookup('google.com', callback);

// ========== DEMONSTRATION ==========
const crypto = require('crypto');

const start = Date.now();

// With default pool size (4), first 4 run in parallel
// Next 4 wait for threads to become available
for (let i = 0; i < 8; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log(`${i + 1}: ${Date.now() - start}ms`);
  });
}

// Output (default pool size 4):
// 1-4: ~1000ms (parallel)
// 5-8: ~2000ms (waited for threads)

// Output (pool size 8):
// UV_THREADPOOL_SIZE=8 node app.js
// 1-8: ~1000ms (all parallel!)

// ========== WHEN TO INCREASE POOL SIZE ==========
// ✅ Heavy file I/O
// ✅ Many crypto operations
// ✅ Compression/decompression
// ✅ High dns.lookup usage

// ⚠️ Don't set too high:
// - Each thread uses ~1MB memory
// - Diminishing returns past CPU count
// - Maximum is 1024

// ========== WHAT DOESN'T USE THREAD POOL ==========
// Network I/O uses OS async primitives (epoll, kqueue, IOCP)
const http = require('http');
const net = require('net');
// These don't consume thread pool threads

// dns.resolve uses c-ares library, not thread pool
dns.resolve('google.com', callback);
```

---

### Question 40: Diagnostic Reports
**Difficulty**: Expert

What does `--report-on-fatalerror` flag do?

A) Sends error reports to npm
B) Generates a diagnostic report when a fatal error occurs
C) Logs errors to console
D) Restarts the application on error

**Answer**: B

**Explanation**: The `--report-on-fatalerror` flag generates a comprehensive diagnostic report (JSON file) containing stack traces, heap statistics, libuv handles, system information, and more when a fatal error occurs, helping with post-mortem debugging.

```javascript
// ========== DIAGNOSTIC REPORT FLAGS ==========

// Generate report on fatal error (OOM, assertion failure)
// node --report-on-fatalerror app.js

// Generate report on unhandled exception
// node --report-uncaught-exception app.js

// Generate report on specific signal
// node --report-on-signal --report-signal=SIGUSR2 app.js

// Set report directory
// node --report-directory=/path/to/reports app.js

// Custom report filename
// node --report-filename=myreport.json app.js

// ========== PROGRAMMATIC REPORT GENERATION ==========
const process = require('process');

// Generate report manually
process.report.writeReport();

// Generate with custom filename
process.report.writeReport('./my-report.json');

// Get report as string
const report = process.report.getReport();
console.log(JSON.parse(report));

// Configure reporting
process.report.reportOnFatalError = true;
process.report.reportOnSignal = true;
process.report.reportOnUncaughtException = true;
process.report.signal = 'SIGUSR2';
process.report.filename = 'report.json';
process.report.directory = '/tmp/reports';

// ========== REPORT CONTENTS ==========
/*
{
  "header": {
    "reportVersion": 2,
    "event": "FatalError",
    "trigger": "OOMError",
    "filename": "report.20231015.123456.12345.001.json",
    "dumpEventTime": "2023-10-15T12:34:56.789Z",
    "processId": 12345,
    "nodejsVersion": "v18.17.0",
    ...
  },
  "javascriptStack": {
    "message": "FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed",
    "stack": [
      "at processData (/app/index.js:42:15)",
      "at handleRequest (/app/server.js:28:5)"
    ]
  },
  "nativeStack": [...],
  "javascriptHeap": {
    "totalMemory": 123456789,
    "usedMemory": 98765432,
    "heapSizeLimit": 2000000000
  },
  "resourceUsage": {
    "userCpuSeconds": 5.2,
    "kernelCpuSeconds": 1.3,
    "maxRss": 150000000
  },
  "libuv": [
    { "type": "tcp", "address": "0.0.0.0", "port": 3000 },
    { "type": "timer", "repeat": 0, "is_active": true }
  ],
  "environmentVariables": {...},
  "userLimits": {...},
  "sharedObjects": [...]
}
*/

// ========== PRACTICAL USE CASES ==========

// 1. Debug production OOM errors
// node --report-on-fatalerror --max-old-space-size=512 app.js

// 2. Investigate hung processes
// Send SIGUSR2 to generate report
// kill -USR2 <pid>

// 3. Automated monitoring
process.on('uncaughtException', (err) => {
  process.report.writeReport();
  console.error('Fatal error, report generated');
  process.exit(1);
});

// 4. Health check endpoint
app.get('/debug/report', (req, res) => {
  const report = process.report.getReport();
  res.json(JSON.parse(report));
});
```

---

## Answer Key Summary

| Level | Questions | Answers |
|-------|-----------|---------|
| **Beginner** | 1-12 | B, C, B, C, B, C, B, B, C, B, B, B |
| **Intermediate** | 13-26 | B, B, B, B, B, B, B, B, C, B, B, B, B, B |
| **Advanced** | 27-35 | B, B, B, B, C, B, B, B, B |
| **Expert** | 36-40 | B, B, B, B, B |

---

## Scoring Guide

- **36-40 correct**: Expert Level - You have deep Node.js knowledge!
- **30-35 correct**: Advanced Level - Strong understanding of Node.js
- **24-29 correct**: Intermediate Level - Good foundation, keep learning
- **18-23 correct**: Developing - Understand basics, focus on advanced topics
- **Below 18**: Beginner - Start with fundamentals and practice more

---

## Study Resources

1. **Official Node.js Documentation**: https://nodejs.org/docs
2. **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices
3. **Event Loop Explained**: Node.js official guides
4. **V8 Blog**: https://v8.dev/blog

Good luck with your Node.js interviews!
