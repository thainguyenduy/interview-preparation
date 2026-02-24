# Node.js Coding Assessment

**Total Time: 40 minutes**
**Format: HackerRank-style**

---

## Section 1: Conceptual Questions (10 minutes)

Answer each question. Choose the best answer or write a short response.

---

### Q1. Event Loop

What is the output of the following code?

```js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

process.nextTick(() => console.log('4'));

console.log('5');
```

**A)** 1, 5, 4, 3, 2
**B)** 1, 5, 2, 3, 4
**C)** 1, 5, 3, 4, 2
**D)** 1, 2, 3, 4, 5

---

### Q2. Streams

Which of the following is TRUE about Node.js streams?

**A)** A Duplex stream can only read OR write, not both
**B)** A Transform stream is a type of Duplex stream that can modify data as it passes through
**C)** Readable streams operate only in flowing mode
**D)** Piping a stream does not handle backpressure automatically

---

### Q3. Error Handling

What happens if a Promise rejection is not caught in Node.js (v16+)?

**A)** The error is silently ignored
**B)** The process emits a warning but continues
**C)** The process crashes with `ERR_UNHANDLED_REJECTION`
**D)** The error is caught by the global `try/catch`

---

### Q4. Module System

What is the key difference between `require()` and `import`?

**A)** `require()` is asynchronous, `import` is synchronous
**B)** `require()` is synchronous and loads at runtime, `import` is statically analyzed and can be asynchronous
**C)** `import` only works with TypeScript
**D)** There is no difference, they are interchangeable

---

### Q5. Cluster Module

What is the primary purpose of the `cluster` module in Node.js?

**A)** To split a single request across multiple threads
**B)** To create child processes that share server ports, utilizing multiple CPU cores
**C)** To manage database connection pools
**D)** To enable communication between microservices

---

## Section 2: Code Output & Debug (10 minutes)

Read each code snippet carefully. Predict the output or identify the bug.

---

### Q6. Async/Await Execution Order

What is the output?

```js
async function foo() {
  console.log('A');
  const result = await Promise.resolve('B');
  console.log(result);
  return 'C';
}

console.log('D');
foo().then((val) => console.log(val));
console.log('E');
```

**Your answer:** _______________

---

### Q7. Find the Bug

The following Express middleware is supposed to validate an API key. Identify the bug.

```js
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.status(401).json({ error: 'API key required' });
  }

  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ error: 'Invalid API key' });
  }

  next();
};
```

**Your answer:** _______________

---

### Q8. EventEmitter

What is the output and is there a potential issue?

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('data', (msg) => {
  console.log(`Received: ${msg}`);
});

emitter.emit('data', 'Hello');
emitter.emit('data', 'World');

emitter.once('done', () => {
  console.log('Finished');
});

emitter.emit('done');
emitter.emit('done');
```

**Your answer:** _______________

---

## Section 3: Coding Challenges (20 minutes)

---

### Q9. Async Retry with Exponential Backoff (10 minutes)

**Difficulty: Medium**

Implement a function `retryWithBackoff` that retries an async operation with exponential backoff.

**Function Signature:**

```js
/**
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in milliseconds (doubles each retry)
 * @returns {Promise<any>} - Result of the async function
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  // Your implementation here
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === maxRetries) {
        break;
      }
      const delay = baseDelay*Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve,delay));
    }
  }
  throw lastError;
}
```

**Requirements:**
- Call `fn()` and return its result if it succeeds
- If `fn()` throws, retry up to `maxRetries` times
- Wait `baseDelay * 2^attempt` ms between retries (exponential backoff)
- If all retries fail, throw the last error

**Example:**

```js
let attempt = 0;
const unstableApi = async () => {
  attempt++;
  if (attempt < 3) throw new Error(`Fail #${attempt}`);
  return 'success';
};

const result = await retryWithBackoff(unstableApi, 5, 100);
console.log(result); // 'success' (after 2 failed attempts)
```

**Constraints:**
- Do not use any external libraries
- Must use async/await

---

### Q10. Middleware Pipeline (10 minutes)

**Difficulty: Medium-Hard**

Implement a simplified Express-like middleware pipeline. Create a class `App` that supports `use()` to register middleware functions and `run()` to execute them in order.

**Requirements:**

```js
class App {
  constructor() {
    // Your implementation here
    this.middlewares = [];
  }

  /**
   * Register a middleware function
   * @param {Function} fn - middleware(context, next)
   */
  use(fn) {
    // Your implementation here
    this.middlewares.push(fn);
  }

  /**
   * Execute all middleware in order
   * @param {Object} context - shared context object passed to each middleware
   * @returns {Promise<void>}
   */
  async run(context) {
    // Your implementation here
    const dispatch = async (index) => {
      if (index >= this.middlewares.length) {
        return;
      }

      const middleware = this.middleware[index];
      await middleware(context, async () =>{
        await dispatch(index + 1);
      });
    };
    dispatch(0);
  }
}
```

**Each middleware receives:**
- `context` - a shared object to read/write data
- `next` - an async function to call the next middleware

**Example:**

```js
const app = new App();

app.use(async (ctx, next) => {
  ctx.logs = [];
  ctx.logs.push('start');
  await next();
  ctx.logs.push('end');
});

app.use(async (ctx, next) => {
  ctx.logs.push('middle');
  await next();
});

app.use(async (ctx, next) => {
  ctx.logs.push('handler');
  // does not call next, end of chain
});

const context = {};
await app.run(context);
console.log(context.logs); // ['start', 'middle', 'handler', 'end']
```

**Constraints:**
- Must support async middleware
- Middleware that doesn't call `next()` should stop the chain
- Errors thrown in any middleware should propagate to the `run()` caller
- Do not use any external libraries

---

# Solutions

<details>
<summary><strong>Click to reveal all solutions</strong></summary>

## Section 1 Answers

**Q1:** **A) 1, 5, 4, 3, 2**
- Synchronous: `1`, `5` execute first
- `process.nextTick` runs before microtasks: `4`
- Promise microtask: `3`
- setTimeout macro task: `2`

**Q2:** **B) A Transform stream is a type of Duplex stream that can modify data as it passes through**
- Duplex streams can both read AND write (A is wrong)
- Readable streams have two modes: flowing and paused (C is wrong)
- Pipe handles backpressure automatically (D is wrong)

**Q3:** **C) The process crashes with `ERR_UNHANDLED_REJECTION`**
- Since Node.js v15+, unhandled promise rejections terminate the process by default

**Q4:** **B) `require()` is synchronous and loads at runtime, `import` is statically analyzed and can be asynchronous**
- `require` is CommonJS, synchronous, dynamic
- `import` is ESM, statically analyzed at parse time, supports top-level await

**Q5:** **B) To create child processes that share server ports, utilizing multiple CPU cores**
- The cluster module forks worker processes that can share the same server port
- Node.js is single-threaded, so cluster enables multi-core utilization

---

## Section 2 Answers

**Q6:** Output: `D, A, E, B, C`
- `D` - synchronous
- `A` - `foo()` runs synchronously until the first `await`
- `E` - synchronous, runs after `foo()` yields at `await`
- `B` - the awaited value resolves
- `C` - the `.then()` callback runs

**Q7:** Missing `return` statements after `res.status()` calls.
Without `return`, the function continues executing. If `apiKey` is missing, it sends a 401, then also tries to compare `undefined !== API_KEY` (sends 403), and then calls `next()`. This causes "headers already sent" errors.

Fixed version:
```js
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
};
```

**Q8:** Output:
```
Received: Hello
Received: World
Finished
```
- `on` listener fires for both `data` events
- `once` listener fires only for the first `done` event, the second `emit('done')` produces no output
- No potential issue here - this is correct usage

---

## Section 3 Answers

**Q9: Retry with Exponential Backoff**

```js
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
```

**Q10: Middleware Pipeline**

```js
class App {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  async run(context) {
    const dispatch = async (index) => {
      if (index >= this.middlewares.length) {
        return;
      }

      const middleware = this.middlewares[index];
      await middleware(context, async () => {
        await dispatch(index + 1);
      });
    };

    await dispatch(0);
  }
}
```

Key points:
- Uses recursive `dispatch` to chain middleware (same pattern as Koa)
- Each `next()` call triggers the next middleware
- If `next()` is not called, the chain stops naturally
- Errors propagate because we use `await` throughout

</details>
