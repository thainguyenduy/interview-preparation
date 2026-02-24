# JavaScript/TypeScript Assessment

## Section 1: Conceptual Questions

### 1. Event Loop and Asynchronous JavaScript
**Question:** Explain how the JavaScript event loop works. What is the difference between the call stack, callback queue, and microtask queue?

**Answer:**


### 2. Closures
**Question:** What is a closure in JavaScript? Provide a practical example where closures are useful.

**Answer:**


### 3. Prototypal Inheritance
**Question:** How does prototypal inheritance work in JavaScript? How is it different from classical inheritance?

**Answer:**


### 4. TypeScript Generics
**Question:** Explain TypeScript generics and provide an example of when you would use them.

**Answer:**


## Section 2: Coding Challenges

### 5. Debounce Function
**Challenge:** Implement a debounce function that delays the execution of a function until after a specified delay has passed since the last time it was invoked.

```javascript
function debounce(func, delay) {
  // Your implementation here
}

// Test case
const debouncedLog = debounce(() => console.log('Called!'), 300);
debouncedLog(); // Should not log immediately
debouncedLog(); // Should cancel previous and reset timer
debouncedLog(); // Should only log after 300ms of inactivity
```

**Solution:**


### 6. Deep Clone Object
**Challenge:** Write a function that performs a deep clone of a JavaScript object, handling nested objects, arrays, and circular references.

```javascript
function deepClone(obj, map = new WeakMap()) {
  // Your implementation here
  if (obj === null || type of obj !== 'object') {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  if (Array.isArray(obj)) {
    const arrCopy = [];
    map.set(obj, arrCopy);
    for (let i = 0; i<=obj.length; i++) {
      arrCopy[i] = deepClone(obj[i],map);
    }
    return arrCopy;
  }
  const objCopy = {};
  map.set(obj,objCopy);
  const keys = Object.getOwnPropertyNames(obj);
  for (cont key of keys) {
    objCopy[key] = deepClone(obj[key], map);
  }
  return objCopy;
}

// Test case
const original = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
const cloned = deepClone(original);
cloned.b.c = 999;
console.log(original.b.c); // Should still be 2
```

**Solution:**


### 7. Promise Implementation
**Challenge:** Implement a simplified version of Promise with `then` and `catch` methods.

```javascript
class MyPromise {
  constructor(executor) {
    // Your implementation here
  }

  then(onFulfilled, onRejected) {
    // Your implementation here
  }

  catch(onRejected) {
    // Your implementation here
  }
}
```

**Solution:**


### 8. Flatten Array
**Challenge:** Write a function that flattens a deeply nested array to a specified depth.

```javascript
function flatten(arr, depth = 1) {
  // Your implementation here
}

// Test cases
console.log(flatten([1, [2, [3, [4]], 5]])); // [1, 2, [3, [4]], 5]
console.log(flatten([1, [2, [3, [4]], 5]], 2)); // [1, 2, 3, [4], 5]
console.log(flatten([1, [2, [3, [4]], 5]], Infinity)); // [1, 2, 3, 4, 5]
```

**Solution:**


## Section 3: Practical Scenarios

### 9. API Rate Limiting
**Scenario:** You need to implement a rate limiter for API calls. Design a class that allows a maximum of N requests per time window.

```typescript
class RateLimiter {
  constructor(maxRequests: number, windowMs: number) {
    // Your implementation here
  }

  async tryRequest(): Promise<boolean> {
    // Return true if request is allowed, false otherwise
  }
}

// Usage
const limiter = new RateLimiter(5, 1000); // 5 requests per second
```

**Solution:**


### 10. Memory Leak Debugging
**Scenario:** You notice a memory leak in a React application. The following component is suspected:

```javascript
function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData(userId).then(data => {
      setUserData(data);
    });
  }, [userId]);

  return <div>{userData?.name}</div>;
}
```

**Question:** What are the potential issues with this code? How would you fix them?

**Answer:**


### 11. TypeScript Type Utility
**Challenge:** Create a TypeScript utility type that makes all properties of a type optional recursively (deep partial).

```typescript
type DeepPartial<T> = // Your implementation here

// Test case
interface User {
  id: number;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
}

const user: DeepPartial<User> = {
  profile: {
    address: {
      city: 'Singapore'
    }
  }
}; // Should be valid
```

**Solution:**


### 12. Event Emitter
**Challenge:** Implement a basic EventEmitter class with `on`, `off`, and `emit` methods.

```typescript
class EventEmitter {
  // Your implementation here
}

// Usage
const emitter = new EventEmitter();
emitter.on('event', (data) => console.log(data));
emitter.emit('event', 'Hello!'); // Should log: Hello!
emitter.off('event');
emitter.emit('event', 'Hello!'); // Should not log anything
```

**Solution:**


## Section 4: Performance and Optimization

### 13. Memoization
**Question:** Implement a memoization function that caches the results of expensive function calls.

```javascript
function memoize(fn) {
  // Your implementation here
}

// Test
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Should be fast with memoization
```

**Solution:**


### 14. Virtual Scrolling Concept
**Question:** Explain the concept of virtual scrolling. How would you implement it for rendering a list of 10,000 items efficiently?

**Answer:**


## Section 5: Advanced Topics

### 15. Proxy and Reflect
**Question:** What are Proxy and Reflect in JavaScript? Provide an example of using a Proxy for validation.

```javascript
// Create a proxy that validates age is a positive number
const person = {
  name: 'John',
  age: 30
};

// Your implementation here
```

**Solution:**


### 16. Web Workers
**Question:** When would you use Web Workers? What are the limitations? Provide a simple example.

**Answer:**


### 17. Module Bundling
**Question:** Explain the difference between CommonJS and ES Modules. What happens during tree-shaking?

**Answer:**


### 18. Async Error Handling
**Question:** What are the best practices for error handling in async/await code? Show different approaches.

```javascript
// Approach 1: Try-catch

// Approach 2: Error wrapper

// Approach 3: Global error handling
```

**Solution:**


---

# Solutions

## Solution 1: Event Loop and Asynchronous JavaScript

The JavaScript event loop is a mechanism that handles asynchronous operations in a single-threaded environment:

1. **Call Stack**: Executes synchronous code in a LIFO (Last In, First Out) manner. When a function is called, it's pushed onto the stack; when it returns, it's popped off.

2. **Callback Queue (Task Queue)**: Holds callbacks from asynchronous operations like `setTimeout`, `setInterval`, DOM events, and I/O operations. These are processed after the call stack is empty.

3. **Microtask Queue**: Holds microtasks like Promise callbacks (`.then()`, `.catch()`, `.finally()`), `queueMicrotask()`, and `MutationObserver`. These have **higher priority** than the callback queue.

**Execution Order:**
1. Execute all synchronous code (call stack)
2. Process all microtasks in the microtask queue
3. Render (if needed)
4. Process one task from the callback queue
5. Repeat from step 2

**Example:**
```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2
// Explanation: Sync code first (1, 4), then microtasks (3), then macrotasks (2)
```

## Solution 2: Closures

A closure is a function that has access to variables from its outer (enclosing) lexical scope, even after the outer function has returned. Closures are created every time a function is created.

**How it works:**
- When a function is defined inside another function, it maintains a reference to its parent scope
- This reference persists even after the parent function has executed
- The inner function "closes over" the variables from the outer scope

**Practical Example - Private Variables:**
```javascript
function createCounter() {
  let count = 0; // Private variable

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count is not directly accessible from outside
console.log(counter.count);       // undefined
```

**Other Use Cases:**
- Module pattern for encapsulation
- Event handlers that need access to outer scope
- Partial application and currying
- Memoization and caching

## Solution 3: Prototypal Inheritance

**Prototypal Inheritance:**
In JavaScript, objects inherit directly from other objects through the prototype chain. Every object has an internal `[[Prototype]]` property that references another object.

**How it works:**
1. When you access a property on an object, JavaScript first looks for it on the object itself
2. If not found, it looks up the prototype chain until it finds the property or reaches `null`
3. You can create inheritance using `Object.create()`, constructor functions, or ES6 classes

**Example:**
```javascript
const animal = {
  eat() {
    console.log('Eating...');
  }
};

const dog = Object.create(animal);
dog.bark = function() {
  console.log('Woof!');
};

dog.eat();  // 'Eating...' (inherited from animal)
dog.bark(); // 'Woof!' (own property)
```

**Differences from Classical Inheritance:**

| Prototypal | Classical (Java, C++) |
|------------|----------------------|
| Objects inherit from objects | Classes inherit from classes |
| Delegation-based (prototype chain) | Copy-based (properties copied to instances) |
| Dynamic - can modify prototypes at runtime | Static - class definition is fixed |
| Single inheritance chain | Can support multiple inheritance |
| More flexible but less structured | More rigid but clearer structure |

**ES6 Class Syntax:**
```javascript
class Animal {
  eat() {
    console.log('Eating...');
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof!');
  }
}

// Still prototypal under the hood!
const myDog = new Dog();
console.log(myDog.__proto__ === Dog.prototype); // true
```

## Solution 4: TypeScript Generics

Generics allow you to create reusable components that work with multiple types while maintaining type safety. They act as type variables that can represent any type.

**Why use generics:**
- Write type-safe, reusable code
- Avoid type assertions and `any`
- Capture and preserve type information
- Enable better IDE autocomplete and type checking

**Example 1 - Generic Function:**
```typescript
// Without generics - loses type information
function identityAny(arg: any): any {
  return arg;
}

// With generics - preserves type information
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);     // num is number
const str = identity<string>('hello'); // str is string
const auto = identity(true);           // TypeScript infers boolean
```

**Example 2 - Generic Interface:**
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'John' },
  status: 200,
  message: 'Success'
};

const usersResponse: ApiResponse<User[]> = {
  data: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
  status: 200,
  message: 'Success'
};
```

**Example 3 - Generic Constraints:**
```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello');        // OK - string has length
logLength([1, 2, 3]);      // OK - array has length
logLength({ length: 10 }); // OK - object has length
// logLength(42);          // Error - number doesn't have length
```

## Solution 5: Debounce Function

```javascript
function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Test case
const debouncedLog = debounce(() => console.log('Called!'), 300);
debouncedLog(); // Starts timer
debouncedLog(); // Cancels previous, starts new timer
debouncedLog(); // Cancels previous, starts new timer
// Only logs 'Called!' once, 300ms after the last call

// Advanced version with immediate execution option
function debounceAdvanced(func, delay, immediate = false) {
  let timeoutId;

  return function(...args) {
    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, delay);

    if (callNow) {
      func.apply(this, args);
    }
  };
}
```

## Solution 6: Deep Clone Object

```javascript
function deepClone(obj, map = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (map.has(obj)) {
    return map.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    map.set(obj, arrCopy);

    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepClone(obj[i], map);
    }

    return arrCopy;
  }

  // Handle Object
  const objCopy = {};
  map.set(obj, objCopy);

  // Clone all properties including non-enumerable ones
  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    objCopy[key] = deepClone(obj[key], map);
  }

  return objCopy;
}

// Test with circular reference
const obj = { a: 1 };
obj.self = obj;
const cloned = deepClone(obj);
console.log(cloned.self === cloned); // true (circular reference preserved)
console.log(cloned === obj);         // false (different objects)
```

## Solution 7: Promise Implementation

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 'pending', 'fulfilled', 'rejected'
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          const result = onFulfilled(value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (reason) => {
        try {
          const result = onRejected(reason);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        setTimeout(() => handleFulfilled(this.value), 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Test
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

promise
  .then(result => {
    console.log(result); // 'Success!' after 1 second
    return 'Chained';
  })
  .then(result => console.log(result)) // 'Chained'
  .catch(error => console.error(error));
```

## Solution 8: Flatten Array

```javascript
// Solution 1: Recursive approach
function flatten(arr, depth = 1) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Solution 2: Using reduce
function flattenReduce(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, val) => {
        return acc.concat(
          Array.isArray(val) ? flattenReduce(val, depth - 1) : val
        );
      }, [])
    : arr.slice();
}

// Solution 3: Using stack (iterative)
function flattenIterative(arr, depth = 1) {
  const stack = arr.map(item => [item, depth]);
  const result = [];

  while (stack.length > 0) {
    const [item, d] = stack.pop();

    if (Array.isArray(item) && d > 0) {
      stack.push(...item.map(i => [i, d - 1]));
    } else {
      result.unshift(item);
    }
  }

  return result;
}

// Test cases
console.log(flatten([1, [2, [3, [4]], 5]]));           // [1, 2, [3, [4]], 5]
console.log(flatten([1, [2, [3, [4]], 5]], 2));        // [1, 2, 3, [4], 5]
console.log(flatten([1, [2, [3, [4]], 5]], Infinity)); // [1, 2, 3, 4, 5]

// Note: Modern JavaScript has a built-in flat() method
console.log([1, [2, [3, [4]], 5]].flat(2)); // [1, 2, 3, [4], 5]
```

## Solution 9: API Rate Limiting

```typescript
// Solution 1: Sliding Window
class RateLimiter {
  private maxRequests: number;
  private windowMs: number;
  private requests: number[] = [];

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async tryRequest(): Promise<boolean> {
    const now = Date.now();

    // Remove old requests outside the current window
    this.requests = this.requests.filter(
      timestamp => now - timestamp < this.windowMs
    );

    // Check if we can accept a new request
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }

    return false;
  }

  // Get time until next request is allowed
  getWaitTime(): number {
    if (this.requests.length < this.maxRequests) {
      return 0;
    }

    const oldestRequest = this.requests[0];
    const waitTime = this.windowMs - (Date.now() - oldestRequest);
    return Math.max(0, waitTime);
  }
}

// Solution 2: Token Bucket Algorithm
class TokenBucketRateLimiter {
  private tokens: number;
  private lastRefill: number;
  private maxTokens: number;
  private refillRate: number; // tokens per ms

  constructor(maxRequests: number, windowMs: number) {
    this.maxTokens = maxRequests;
    this.tokens = maxRequests;
    this.lastRefill = Date.now();
    this.refillRate = maxRequests / windowMs;
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = timePassed * this.refillRate;

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  async tryRequest(): Promise<boolean> {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }
}

// Usage example
async function makeApiCalls() {
  const limiter = new RateLimiter(5, 1000);

  for (let i = 0; i < 10; i++) {
    const allowed = await limiter.tryRequest();

    if (allowed) {
      console.log(`Request ${i + 1} allowed`);
      // Make actual API call
    } else {
      console.log(`Request ${i + 1} blocked`);
      // Wait or retry later
      const waitTime = limiter.getWaitTime();
      await new Promise(resolve => setTimeout(resolve, waitTime));
      i--; // Retry this request
    }
  }
}
```

## Solution 10: Memory Leak Debugging

**Issues:**
1. **Memory Leak**: If the component unmounts while the promise is still pending, `setUserData` will be called on an unmounted component, causing a memory leak and a warning.
2. **Race Condition**: If `userId` changes quickly, multiple fetch requests may be in flight, and responses may arrive out of order.
3. **No Error Handling**: If `fetchUserData` fails, the error is not handled.
4. **No Loading State**: No indication that data is being fetched.

**Fixed Version:**
```javascript
function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    let abortController = new AbortController(); // For request cancellation

    const loadUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserData(userId, {
          signal: abortController.signal
        });

        // Only update state if component is still mounted
        if (isMounted) {
          setUserData(data);
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message);
          setUserData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserData();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort(); // Cancel pending request
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No data</div>;

  return <div>{userData.name}</div>;
}

// Alternative: Using useRef instead of closure variable
function UserProfileRef({ userId }) {
  const [userData, setUserData] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const abortController = new AbortController();

    fetchUserData(userId, { signal: abortController.signal })
      .then(data => {
        if (isMountedRef.current) {
          setUserData(data);
        }
      })
      .catch(err => {
        if (isMountedRef.current && err.name !== 'AbortError') {
          console.error(err);
        }
      });

    return () => {
      isMountedRef.current = false;
      abortController.abort();
    };
  }, [userId]);

  return <div>{userData?.name}</div>;
}
```

## Solution 11: TypeScript Type Utility

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[P]>
    : T[P];
};

// More robust version that handles edge cases
type DeepPartialAdvanced<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartialAdvanced<U>>
  : T extends object
  ? { [P in keyof T]?: DeepPartialAdvanced<T[P]> }
  : T;

// Test case
interface User {
  id: number;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
  hobbies: string[];
}

const user1: DeepPartial<User> = {
  profile: {
    address: {
      city: 'Singapore'
    }
  }
}; // Valid

const user2: DeepPartial<User> = {
  id: 1,
  hobbies: ['reading']
}; // Valid

const user3: DeepPartial<User> = {}; // Valid - all properties optional

// Other useful utility types
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object
    ? DeepRequired<T[P]>
    : T[P];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object
    ? DeepMutable<T[P]>
    : T[P];
};
```

## Solution 12: Event Emitter

```typescript
class EventEmitter {
  private events: Map<string, Set<Function>>;

  constructor() {
    this.events = new Map();
  }

  on(event: string, listener: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(listener);
  }

  off(event: string, listener?: Function): void {
    if (!this.events.has(event)) {
      return;
    }

    if (listener) {
      // Remove specific listener
      this.events.get(event)!.delete(listener);
    } else {
      // Remove all listeners for this event
      this.events.delete(event);
    }
  }

  emit(event: string, ...args: any[]): void {
    if (!this.events.has(event)) {
      return;
    }

    this.events.get(event)!.forEach(listener => {
      listener(...args);
    });
  }

  // Additional useful methods
  once(event: string, listener: Function): void {
    const onceWrapper = (...args: any[]) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  listenerCount(event: string): number {
    return this.events.get(event)?.size || 0;
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

// Usage examples
const emitter = new EventEmitter();

// Basic usage
const handler = (data: string) => console.log('Received:', data);
emitter.on('message', handler);
emitter.emit('message', 'Hello!'); // Received: Hello!
emitter.off('message', handler);
emitter.emit('message', 'Hello!'); // Nothing happens

// Once listener
emitter.once('init', () => console.log('Initialized'));
emitter.emit('init'); // Initialized
emitter.emit('init'); // Nothing happens

// Multiple listeners
emitter.on('event', () => console.log('Listener 1'));
emitter.on('event', () => console.log('Listener 2'));
emitter.emit('event');
// Listener 1
// Listener 2
```

## Solution 13: Memoization

```javascript
// Solution 1: Simple memoization with Map
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Solution 2: WeakMap for object arguments (better memory management)
function memoizeWeakMap(fn) {
  const cache = new Map();
  const weakCache = new WeakMap();

  return function(...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
      if (weakCache.has(args[0])) {
        return weakCache.get(args[0]);
      }
      const result = fn.call(this, args[0]);
      weakCache.set(args[0], result);
      return result;
    }

    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Solution 3: With max cache size (LRU-like)
function memoizeWithLimit(fn, maxSize = 100) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }

    const result = fn.apply(this, args);

    // Remove oldest entry if cache is full
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);
    return result;
  };
}

// Test with Fibonacci
const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.time('First call');
console.log(fibonacci(40)); // 102334155
console.timeEnd('First call'); // Fast with memoization (~1ms)

console.time('Second call');
console.log(fibonacci(40)); // Cached
console.timeEnd('Second call'); // Nearly instant (~0ms)

// Without memoization, fibonacci(40) would take ~1-2 seconds!
```

## Solution 14: Virtual Scrolling Concept

**Concept:**
Virtual scrolling (also called windowing) is a technique where only visible items are rendered in the DOM, rather than rendering all items. As the user scrolls, items are dynamically added/removed from the DOM.

**Why it's needed:**
- Rendering 10,000 DOM nodes causes performance issues
- Increases memory usage
- Slows down initial render and interactions
- Makes scrolling janky

**How it works:**
1. Calculate which items are currently visible in the viewport
2. Render only those items (plus a buffer for smooth scrolling)
3. Use absolute positioning to place items correctly
4. Update rendered items as user scrolls
5. Maintain scroll position with padding elements

**Basic Implementation:**
```javascript
class VirtualScroller {
  constructor({
    container,
    items,
    itemHeight,
    visibleItems = 20,
    buffer = 5
  }) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleItems = visibleItems;
    this.buffer = buffer;
    this.scrollTop = 0;

    this.init();
  }

  init() {
    // Create scrollable area
    this.scrollHeight = this.items.length * this.itemHeight;
    this.container.style.height = '400px';
    this.container.style.overflow = 'auto';
    this.container.style.position = 'relative';

    // Create content wrapper
    this.content = document.createElement('div');
    this.content.style.height = `${this.scrollHeight}px`;
    this.container.appendChild(this.content);

    // Listen to scroll
    this.container.addEventListener('scroll', () => this.onScroll());

    this.render();
  }

  onScroll() {
    this.scrollTop = this.container.scrollTop;
    this.render();
  }

  render() {
    // Calculate visible range
    const startIndex = Math.max(
      0,
      Math.floor(this.scrollTop / this.itemHeight) - this.buffer
    );
    const endIndex = Math.min(
      this.items.length,
      startIndex + this.visibleItems + this.buffer * 2
    );

    // Clear previous items
    this.content.innerHTML = '';

    // Render visible items
    for (let i = startIndex; i < endIndex; i++) {
      const item = document.createElement('div');
      item.style.position = 'absolute';
      item.style.top = `${i * this.itemHeight}px`;
      item.style.height = `${this.itemHeight}px`;
      item.textContent = this.items[i];
      this.content.appendChild(item);
    }
  }
}

// Usage
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
const scroller = new VirtualScroller({
  container: document.getElementById('list'),
  items: items,
  itemHeight: 50,
  visibleItems: 10,
  buffer: 3
});
```

**React Implementation with react-window:**
```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Key Considerations:**
- Variable item heights require more complex calculations
- Maintain scroll position during updates
- Handle dynamic content loading
- Consider accessibility (screen readers)
- Use libraries like react-window, react-virtualized for production

## Solution 15: Proxy and Reflect

**Explanation:**
- **Proxy**: An object that wraps another object and intercepts operations on it (get, set, delete, etc.)
- **Reflect**: A built-in object that provides methods for interceptable JavaScript operations, mirroring Proxy traps

**Use Cases:**
- Validation and constraints
- Logging and debugging
- Property access control
- Computed properties
- Reactive systems (like Vue.js)

**Example - Validation Proxy:**
```javascript
const person = {
  name: 'John',
  age: 30
};

const validatedPerson = new Proxy(person, {
  set(target, property, value) {
    // Validation logic
    if (property === 'age') {
      if (typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      if (value < 0 || value > 150) {
        throw new RangeError('Age must be between 0 and 150');
      }
    }

    if (property === 'name') {
      if (typeof value !== 'string' || value.trim().length === 0) {
        throw new TypeError('Name must be a non-empty string');
      }
    }

    // Use Reflect for default behavior
    return Reflect.set(target, property, value);
  },

  get(target, property) {
    console.log(`Getting ${property}: ${target[property]}`);
    return Reflect.get(target, property);
  },

  deleteProperty(target, property) {
    if (property === 'name') {
      throw new Error('Cannot delete name property');
    }
    return Reflect.deleteProperty(target, property);
  }
});

// Test validation
validatedPerson.age = 25;  // OK
console.log(validatedPerson.age); // Getting age: 25
// validatedPerson.age = -5;  // RangeError
// validatedPerson.age = 'thirty'; // TypeError

// More Examples

// 1. Logging Proxy
function createLoggingProxy(obj) {
  return new Proxy(obj, {
    get(target, property) {
      console.log(`[GET] ${property}`);
      return Reflect.get(target, property);
    },
    set(target, property, value) {
      console.log(`[SET] ${property} = ${value}`);
      return Reflect.set(target, property, value);
    }
  });
}

// 2. Negative Array Indices (Python-like)
function createNegativeArray(arr) {
  return new Proxy(arr, {
    get(target, property) {
      const index = Number(property);
      if (index < 0) {
        return target[target.length + index];
      }
      return Reflect.get(target, property);
    }
  });
}

const arr = createNegativeArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4

// 3. Default Values (like Python's defaultdict)
function createDefaultDict(defaultValue) {
  return new Proxy({}, {
    get(target, property) {
      if (!(property in target)) {
        target[property] = typeof defaultValue === 'function'
          ? defaultValue()
          : defaultValue;
      }
      return Reflect.get(target, property);
    }
  });
}

const dict = createDefaultDict([]);
dict.items.push(1); // Creates empty array and pushes
console.log(dict.items); // [1]

// 4. Read-only Object
function createReadOnly(obj) {
  return new Proxy(obj, {
    set() {
      throw new Error('This object is read-only');
    },
    deleteProperty() {
      throw new Error('This object is read-only');
    }
  });
}
```

## Solution 16: Web Workers

**When to use Web Workers:**
- CPU-intensive calculations (image processing, encryption, data parsing)
- Large data processing without blocking UI
- Background tasks (polling, syncing)
- Real-time data processing
- Complex algorithms (sorting large datasets, mathematical computations)

**Limitations:**
1. **No DOM access**: Cannot manipulate DOM or access `window`, `document`
2. **Communication overhead**: Data must be serialized/deserialized (structured clone)
3. **Limited APIs**: No access to localStorage, cookies, some Web APIs
4. **Same-origin policy**: Must follow CORS restrictions
5. **Browser support**: Not available in all contexts (IE has limited support)
6. **Memory overhead**: Each worker creates a separate thread

**Available in Workers:**
- `fetch()`, `XMLHttpRequest`
- `setTimeout()`, `setInterval()`
- `IndexedDB`
- `WebSocket`
- `importScripts()`

**Example:**

```javascript
// main.js (Main thread)
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({
  type: 'CALCULATE',
  numbers: Array.from({ length: 1000000 }, (_, i) => i)
});

// Receive results from worker
worker.addEventListener('message', (event) => {
  console.log('Result from worker:', event.data);
  // { type: 'RESULT', sum: 499999500000 }
});

// Handle errors
worker.addEventListener('error', (error) => {
  console.error('Worker error:', error.message);
});

// Terminate worker when done
function cleanup() {
  worker.terminate();
}

// worker.js (Worker thread)
self.addEventListener('message', (event) => {
  const { type, numbers } = event.data;

  if (type === 'CALCULATE') {
    // Perform heavy calculation
    const sum = numbers.reduce((acc, num) => acc + num, 0);

    // Send result back to main thread
    self.postMessage({
      type: 'RESULT',
      sum: sum
    });
  }
});

// Advanced Example with TypeScript and better structure

// types.ts
interface WorkerRequest {
  id: string;
  type: 'PROCESS_IMAGE' | 'SORT_DATA' | 'CALCULATE';
  data: any;
}

interface WorkerResponse {
  id: string;
  result: any;
  error?: string;
}

// workerPool.ts
class WorkerPool {
  private workers: Worker[] = [];
  private queue: Array<{ request: WorkerRequest; resolve: Function; reject: Function }> = [];
  private maxWorkers: number;

  constructor(workerScript: string, maxWorkers: number = 4) {
    this.maxWorkers = maxWorkers;

    for (let i = 0; i < maxWorkers; i++) {
      const worker = new Worker(workerScript);
      worker.addEventListener('message', (e) => this.handleMessage(e, worker));
      this.workers.push(worker);
    }
  }

  async execute(request: WorkerRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const availableWorker = this.workers.find(w => !this.isWorkerBusy(w));

      if (availableWorker) {
        availableWorker.postMessage(request);
      } else {
        this.queue.push({ request, resolve, reject });
      }
    });
  }

  private handleMessage(event: MessageEvent, worker: Worker): void {
    const response: WorkerResponse = event.data;

    if (this.queue.length > 0) {
      const { request, resolve, reject } = this.queue.shift()!;
      worker.postMessage(request);
    }
  }

  private isWorkerBusy(worker: Worker): boolean {
    // Implementation depends on tracking logic
    return false;
  }

  terminate(): void {
    this.workers.forEach(w => w.terminate());
  }
}
```

## Solution 17: Module Bundling

**CommonJS vs ES Modules:**

| Feature | CommonJS (CJS) | ES Modules (ESM) |
|---------|---------------|------------------|
| **Syntax** | `require()` / `module.exports` | `import` / `export` |
| **Loading** | Synchronous | Asynchronous |
| **When** | Runtime | Compile-time |
| **Tree-shaking** | Not supported | Supported |
| **Environment** | Node.js (default) | Browsers, Modern Node.js |
| **Dynamic imports** | Always dynamic | Static by default, dynamic via `import()` |
| **Top-level await** | Not supported | Supported |

**CommonJS Example:**
```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// app.js
const { add } = require('./math');
console.log(add(2, 3));

// Dynamic require
const moduleName = './math';
const math = require(moduleName); // OK - runtime resolution
```

**ES Modules Example:**
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// app.js
import { add } from './math.js';
console.log(add(2, 3));

// This won't work - must be static
// const moduleName = './math';
// import { add } from moduleName; // Error!

// Dynamic import (returns Promise)
const moduleName = './math.js';
const math = await import(moduleName); // OK
```

**Tree-Shaking:**

Tree-shaking is a dead-code elimination technique that removes unused exports from the final bundle.

**How it works:**
1. **Static Analysis**: Build tool analyzes import/export statements at compile-time
2. **Mark**: Identifies which exports are actually imported and used
3. **Sweep**: Removes unused code from the bundle
4. **Result**: Smaller bundle size

**Example:**
```javascript
// utils.js (library)
export function usedFunction() {
  return 'I am used';
}

export function unusedFunction() {
  return 'I am not used';
}

export function alsoUnused() {
  return 'Also not used';
}

// app.js
import { usedFunction } from './utils.js';
console.log(usedFunction());

// After tree-shaking, the bundle only contains:
// - usedFunction (used)
// NOT included: unusedFunction, alsoUnused
```

**Why Tree-Shaking Works with ESM:**
- ES modules are static: imports/exports can't change at runtime
- Build tools can analyze the dependency graph before execution
- Clear separation between used and unused code

**Why Tree-Shaking Doesn't Work with CommonJS:**
- Dynamic nature: `require()` can be conditional
- Runtime resolution: can't determine what's used until code runs
- Example of problematic code:
```javascript
// This can't be tree-shaken
const condition = Math.random() > 0.5;
const module = require(condition ? './a' : './b');
```

**Side Effects and Tree-Shaking:**
```javascript
// package.json
{
  "name": "my-library",
  "sideEffects": false  // Tells bundler: safe to tree-shake
}

// or specify files with side effects
{
  "sideEffects": ["*.css", "./src/polyfills.js"]
}
```

**Tools that perform tree-shaking:**
- Webpack (production mode)
- Rollup
- esbuild
- Vite
- Parcel

## Solution 18: Async Error Handling

**Best Practices for Async Error Handling:**

1. Always handle errors in async operations
2. Use try-catch for async/await
3. Use .catch() for promise chains
4. Consider global error handlers for unhandled rejections
5. Provide meaningful error messages
6. Log errors appropriately
7. Clean up resources in finally blocks

**Approach 1: Try-Catch (Recommended)**
```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);

    // Handle specific error types
    if (error instanceof TypeError) {
      throw new Error('Network error - please check your connection');
    }

    if (error.message.includes('404')) {
      throw new Error('User not found');
    }

    throw error; // Re-throw if not handled
  } finally {
    // Cleanup code (always runs)
    console.log('Request completed');
  }
}

// Usage
try {
  const user = await fetchUserData(123);
  console.log(user);
} catch (error) {
  // Handle error in UI
  showErrorToUser(error.message);
}
```

**Approach 2: Error Wrapper / Result Type**
```javascript
// Helper function that wraps async operations
async function asyncHandler(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

// Usage - cleaner error handling without try-catch
async function loadData() {
  const [error, user] = await asyncHandler(fetchUserData(123));

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('User:', user);
}

// TypeScript version with better types
type Result<T, E = Error> = [E, null] | [null, T];

async function asyncHandlerTyped<T>(
  promise: Promise<T>
): Promise<Result<T>> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as Error, null];
  }
}

// Custom Result class (Rust-inspired)
class Result<T, E = Error> {
  private constructor(
    private value: T | null,
    private error: E | null
  ) {}

  static ok<T>(value: T): Result<T> {
    return new Result(value, null);
  }

  static err<E>(error: E): Result<never, E> {
    return new Result(null, error);
  }

  isOk(): boolean {
    return this.error === null;
  }

  isErr(): boolean {
    return this.error !== null;
  }

  unwrap(): T {
    if (this.error) throw this.error;
    return this.value!;
  }

  unwrapOr(defaultValue: T): T {
    return this.error ? defaultValue : this.value!;
  }
}

async function fetchUser(id: number): Promise<Result<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return Result.ok(data);
  } catch (error) {
    return Result.err(error as Error);
  }
}
```

**Approach 3: Global Error Handling**
```javascript
// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);

  // Prevent default behavior (logging to console)
  event.preventDefault();

  // Send to error tracking service
  logErrorToService({
    type: 'unhandledRejection',
    error: event.reason,
    promise: event.promise
  });

  // Show user-friendly message
  showGlobalErrorMessage('Something went wrong. Please try again.');
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  logErrorToService(event.error);
});

// Async error boundary for specific contexts
class AsyncErrorBoundary {
  private handlers: Map<string, (error: Error) => void> = new Map();

  register(context: string, handler: (error: Error) => void) {
    this.handlers.set(context, handler);
  }

  async execute<T>(
    context: string,
    fn: () => Promise<T>
  ): Promise<T | null> {
    try {
      return await fn();
    } catch (error) {
      const handler = this.handlers.get(context);
      if (handler) {
        handler(error as Error);
      } else {
        console.error(`Unhandled error in ${context}:`, error);
      }
      return null;
    }
  }
}

// Usage
const errorBoundary = new AsyncErrorBoundary();

errorBoundary.register('api', (error) => {
  console.error('API Error:', error);
  showNotification('Failed to load data');
});

await errorBoundary.execute('api', async () => {
  const data = await fetchUserData(123);
  updateUI(data);
});
```

**Approach 4: Retry Logic**
```javascript
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.log(`Attempt ${attempt} failed:`, error);

      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }

  throw lastError!;
}

// Usage
const data = await retry(
  () => fetchUserData(123),
  3,  // 3 attempts
  1000 // 1 second delay
);
```

**Best Practice Combination:**
```javascript
async function robustFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
```

---

## Evaluation Criteria
- Code quality and readability
- Understanding of JavaScript/TypeScript fundamentals
- Performance considerations
- Error handling and edge cases
- TypeScript type safety
