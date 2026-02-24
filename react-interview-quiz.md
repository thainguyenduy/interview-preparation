# React Interview Quiz - 40 Questions

A comprehensive React quiz covering beginner to expert level topics.

---

## 🟢 Beginner Level (Questions 1-12)

### Question 1: What is React?
**Difficulty**: Beginner

What is React?

A) A JavaScript library for building user interfaces
B) A full-stack framework
C) A database management system
D) A CSS framework

**Answer**: A

**Explanation**: React is a JavaScript library developed by Facebook (now Meta) for building user interfaces, particularly single-page applications. Unlike Angular (a full framework), React focuses only on the view layer.

```javascript
// React is used to create UI components
import React from 'react';

function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

**Key Points**:
- Library (not framework) - gives you freedom to choose other tools
- Component-based architecture
- Uses Virtual DOM for efficient updates
- Declarative approach to building UIs

---

### Question 2: JSX Syntax
**Difficulty**: Beginner

Which of the following is valid JSX?

A) `<div class="container">Hello</div>`
B) `<div className="container">Hello</div>`
C) `<div class-name="container">Hello</div>`
D) `<div classname="container">Hello</div>`

**Answer**: B

**Explanation**: In JSX, we use `className` instead of `class` because `class` is a reserved keyword in JavaScript. JSX is syntactic sugar that gets transpiled to JavaScript.

```jsx
// ❌ Wrong - 'class' is reserved in JavaScript
<div class="container">Hello</div>

// ✅ Correct - use 'className'
<div className="container">Hello</div>

// JSX gets compiled to:
React.createElement('div', { className: 'container' }, 'Hello');
```

**Other JSX differences from HTML**:
- `htmlFor` instead of `for`
- `onClick` instead of `onclick` (camelCase)
- `tabIndex` instead of `tabindex`

---

### Question 3: Components
**Difficulty**: Beginner

What are the two main types of components in React?

A) Class and Object components
B) Functional and Class components
C) Static and Dynamic components
D) Parent and Child components

**Answer**: B

**Explanation**: React has two types of components: Functional components (using functions) and Class components (using ES6 classes). Modern React prefers functional components with hooks.

```jsx
// Functional Component (Modern, Recommended)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function variant
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;

// Class Component (Legacy, still supported)
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

**When to use which**:
- Functional: Default choice, simpler syntax, use hooks for state/lifecycle
- Class: Legacy code, error boundaries (still require classes)

---

### Question 4: Props
**Difficulty**: Beginner

What are props in React?

A) Properties used to style components
B) Methods to update component state
C) Read-only data passed from parent to child components
D) Variables stored in the component

**Answer**: C

**Explanation**: Props (short for properties) are read-only data passed from parent components to child components. They follow a unidirectional data flow (top-down).

```jsx
// Parent component passes props
function App() {
  return (
    <UserCard
      name="John Doe"
      age={25}
      isActive={true}
      hobbies={['reading', 'coding']}
    />
  );
}

// Child component receives props
function UserCard({ name, age, isActive, hobbies }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <ul>
        {hobbies.map(hobby => <li key={hobby}>{hobby}</li>)}
      </ul>
    </div>
  );
}

// ❌ Props are read-only - this will cause an error
function BadComponent({ name }) {
  name = "New Name"; // Don't do this!
  return <h1>{name}</h1>;
}
```

**Key Points**:
- Immutable (cannot be changed by child)
- Can be any JavaScript type (string, number, object, function, etc.)
- Enable component reusability

---

### Question 5: State
**Difficulty**: Beginner

Which hook is used to add state to a functional component?

A) `useComponent()`
B) `useState()`
C) `useData()`
D) `createState()`

**Answer**: B

**Explanation**: The `useState()` hook is used to add state management to functional components. It returns an array with the current state value and a function to update it.

```jsx
import { useState } from 'react';

function Counter() {
  // Declare state variable 'count' with initial value 0
  const [count, setCount] = useState(0);

  // Multiple state variables
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({ name: '', age: 0 });

  return (
    <div>
      <p>Count: {count}</p>
      {/* Direct update */}
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {/* Functional update (recommended when new state depends on previous) */}
      <button onClick={() => setCount(prev => prev + 1)}>Increment Safe</button>

      {/* Updating objects (must spread to create new reference) */}
      <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
        Birthday
      </button>
    </div>
  );
}
```

**Important Rules**:
- Never mutate state directly
- State updates may be asynchronous
- Use functional updates when depending on previous state

---

### Question 6: Event Handling
**Difficulty**: Beginner

How do you handle a button click event in React?

A) `<button click={handleClick}>Click</button>`
B) `<button onClick="handleClick()">Click</button>`
C) `<button onClick={handleClick}>Click</button>`
D) `<button onPress={handleClick}>Click</button>`

**Answer**: C

**Explanation**: In React, event handlers are passed as props using camelCase naming (e.g., `onClick`) and the function is passed without parentheses (as a reference, not invoked).

```jsx
function ButtonExample() {
  // Event handler function
  const handleClick = () => {
    console.log('Button clicked!');
  };

  // Handler with event object
  const handleClickWithEvent = (event) => {
    console.log('Clicked:', event.target);
    event.preventDefault(); // Prevent default behavior
  };

  // Handler with custom parameter
  const handleClickWithParam = (id) => {
    console.log('Item ID:', id);
  };

  return (
    <div>
      {/* ✅ Correct - pass function reference */}
      <button onClick={handleClick}>Click Me</button>

      {/* ✅ Correct - with event object */}
      <button onClick={handleClickWithEvent}>With Event</button>

      {/* ✅ Correct - passing parameters using arrow function */}
      <button onClick={() => handleClickWithParam(123)}>With Param</button>

      {/* ❌ Wrong - this calls function immediately on render */}
      <button onClick={handleClick()}>Wrong!</button>

      {/* ❌ Wrong - string instead of function */}
      <button onClick="handleClick()">Also Wrong!</button>
    </div>
  );
}
```

**Common Events**: `onClick`, `onChange`, `onSubmit`, `onMouseEnter`, `onKeyDown`, `onFocus`, `onBlur`

---

### Question 7: Virtual DOM
**Difficulty**: Beginner

What is the Virtual DOM?

A) A browser feature for faster rendering
B) A lightweight copy of the actual DOM kept in memory
C) A database for storing component data
D) A CSS framework

**Answer**: B

**Explanation**: The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to optimize updates by comparing changes (diffing) and updating only what's necessary (reconciliation).

```jsx
// How Virtual DOM works:

// 1. Initial render - React creates Virtual DOM tree
const vdom1 = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] },
    { type: 'p', props: {}, children: ['Count: 0'] }
  ]
};

// 2. State changes - React creates new Virtual DOM
const vdom2 = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] },      // Same
    { type: 'p', props: {}, children: ['Count: 1'] }     // Changed!
  ]
};

// 3. React diffs vdom1 vs vdom2
// 4. Only updates the <p> element in real DOM (minimal change)
```

**Benefits**:
- Batch multiple changes together
- Minimize expensive DOM operations
- Cross-platform (React Native uses same concept)
- Enables declarative programming

---

### Question 8: useState Hook
**Difficulty**: Beginner

What does `useState` return?

A) Only the current state value
B) Only the update function
C) An array with the current state and an update function
D) An object with state and setState properties

**Answer**: C

**Explanation**: `useState` returns an array with exactly two elements: the current state value and a function to update it. We typically destructure these values using array destructuring.

```jsx
import { useState } from 'react';

function Example() {
  // Array destructuring - you can name these anything
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // What useState actually returns:
  const stateArray = useState(0);
  console.log(stateArray); // [0, function]
  const value = stateArray[0];      // Current state: 0
  const setValue = stateArray[1];   // Update function

  // Different initial value types
  const [text, setText] = useState('');           // String
  const [num, setNum] = useState(0);              // Number
  const [bool, setBool] = useState(false);        // Boolean
  const [arr, setArr] = useState([]);             // Array
  const [obj, setObj] = useState({});             // Object
  const [nullable, setNullable] = useState(null); // Null

  // Lazy initialization (for expensive computations)
  const [data, setData] = useState(() => {
    const initialData = expensiveComputation();
    return initialData;
  });

  return <div>{count}</div>;
}
```

---

### Question 9: Rendering Elements
**Difficulty**: Beginner

What will happen if you return multiple JSX elements without a parent wrapper?

A) React will automatically wrap them
B) It will cause a syntax error
C) Only the first element will render
D) All elements will render side by side

**Answer**: B

**Explanation**: JSX expressions must have one parent element. You need to wrap multiple elements in a parent (like `<div>` or `<React.Fragment>`).

```jsx
// ❌ Error - Adjacent JSX elements must be wrapped
function BadComponent() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Solution 1: Wrap in a div (adds extra DOM node)
function WithDiv() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Solution 2: React.Fragment (no extra DOM node)
function WithFragment() {
  return (
    <React.Fragment>
      <h1>Title</h1>
      <p>Paragraph</p>
    </React.Fragment>
  );
}

// ✅ Solution 3: Short syntax for Fragment
function WithShortFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// Note: Use <React.Fragment key={id}> when you need keys in a list
// Short syntax <> doesn't support the key attribute
```

---

### Question 10: Fragment
**Difficulty**: Beginner

What is the purpose of `<React.Fragment>`?

A) To add styling to components
B) To group multiple elements without adding extra nodes to the DOM
C) To create reusable components
D) To handle errors in components

**Answer**: B

**Explanation**: `<React.Fragment>` (or the shorthand `<>...</>`) allows you to group multiple children without adding extra nodes to the DOM, keeping your DOM tree clean.

```jsx
// Problem: Extra div breaks CSS layout
function TableColumns() {
  return (
    // ❌ This breaks table structure
    <div>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </div>
  );
}

// Solution: Fragment keeps valid HTML structure
function TableColumns() {
  return (
    // ✅ No extra wrapper in DOM
    <>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </>
  );
}

// With key prop (required in lists)
function Glossary({ items }) {
  return (
    <dl>
      {items.map(item => (
        // Must use React.Fragment for key, not <>
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

// Real DOM output comparison:
// With div:    <div><td>...</td><td>...</td></div>
// With Fragment: <td>...</td><td>...</td>
```

---

### Question 11: useEffect Hook
**Difficulty**: Beginner

When does `useEffect` run by default (without dependencies)?

A) Only once when component mounts
B) After every render
C) Only when state changes
D) Before component unmounts

**Answer**: B

**Explanation**: Without a dependency array, `useEffect` runs after every render (both mount and updates). The dependency array controls when the effect should re-run.

```jsx
import { useState, useEffect } from 'react';

function EffectExamples() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 1. Runs after EVERY render (mount + every update)
  useEffect(() => {
    console.log('Runs on every render');
  }); // No dependency array

  // 2. Runs ONLY once on mount (like componentDidMount)
  useEffect(() => {
    console.log('Runs once on mount');
    fetchInitialData();
  }, []); // Empty dependency array

  // 3. Runs on mount AND when 'count' changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    document.title = `Count: ${count}`;
  }, [count]); // count in dependency array

  // 4. Cleanup function (like componentWillUnmount)
  useEffect(() => {
    const subscription = subscribeToData();

    // Cleanup runs before component unmounts
    // and before effect re-runs
    return () => {
      subscription.unsubscribe();
      console.log('Cleanup!');
    };
  }, []);

  // 5. Multiple dependencies
  useEffect(() => {
    console.log(`Count: ${count}, Name: ${name}`);
  }, [count, name]); // Runs when either changes

  return <div>{count}</div>;
}
```

---

### Question 12: Key Prop
**Difficulty**: Beginner

Why do we need to provide a `key` prop when rendering lists?

A) To style list items
B) To help React identify which items have changed, added, or removed
C) To make lists clickable
D) To sort the list items

**Answer**: B

**Explanation**: Keys help React identify which items in a list have changed, been added, or removed, enabling efficient re-rendering. Keys should be stable, unique, and predictable.

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {/* ✅ Best: Use unique ID from data */}
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}

      {/* ⚠️ Avoid: Using index as key (causes issues with reordering) */}
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))}

      {/* ❌ Wrong: Missing key (React warning) */}
      {todos.map(todo => (
        <li>{todo.text}</li>
      ))}
    </ul>
  );
}

// Why index as key is problematic:
// Original: [{id:1, text:'A'}, {id:2, text:'B'}]
// With index keys: key=0 -> 'A', key=1 -> 'B'

// After deleting first item: [{id:2, text:'B'}]
// With index keys: key=0 -> 'B' (React thinks item 0 changed, not deleted!)
// With id keys: key=2 -> 'B' (React correctly identifies item 1 was removed)

// When index is OK to use:
// - List is static (never reorders)
// - Items have no stable IDs
// - List is never filtered/reordered
```

---

## 🟡 Intermediate Level (Questions 13-26)

### Question 13: Component Lifecycle
**Difficulty**: Intermediate

In a class component, which lifecycle method is called right before a component is removed from the DOM?

A) `componentDidMount()`
B) `componentWillUnmount()`
C) `componentDidUpdate()`
D) `shouldComponentUpdate()`

**Answer**: B

**Explanation**: `componentWillUnmount()` is called immediately before a component is unmounted and destroyed. It's used for cleanup tasks like clearing timers, canceling network requests, or removing event listeners.

```jsx
// Class Component Lifecycle
class LifecycleDemo extends React.Component {
  // 1. MOUNTING PHASE
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount - Component is in DOM');
    // Good for: API calls, subscriptions, DOM manipulation
    this.timer = setInterval(() => this.tick(), 1000);
  }

  // 2. UPDATING PHASE
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true; // Return false to prevent re-render
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (prevState.count !== this.state.count) {
      // React to state changes
    }
  }

  // 3. UNMOUNTING PHASE
  componentWillUnmount() {
    console.log('componentWillUnmount - Cleanup!');
    // Clear timer to prevent memory leak
    clearInterval(this.timer);
  }

  render() {
    console.log('3. Render');
    return <div>{this.state.count}</div>;
  }
}

// Equivalent with Hooks (functional component)
function LifecycleDemoHooks() {
  const [count, setCount] = useState(0);

  // componentDidMount + componentWillUnmount
  useEffect(() => {
    console.log('Mounted');
    const timer = setInterval(() => setCount(c => c + 1), 1000);

    return () => {
      console.log('Cleanup before unmount');
      clearInterval(timer);
    };
  }, []);

  return <div>{count}</div>;
}
```

---

### Question 14: useEffect Dependencies
**Difficulty**: Intermediate

What does the dependency array in `useEffect` do?

```javascript
useEffect(() => {
  // effect
}, [count]);
```

A) It runs the effect every time
B) It runs the effect only when `count` changes
C) It prevents the effect from running
D) It runs the effect only on mount

**Answer**: B

**Explanation**: The dependency array tells React to run the effect only when the specified values change. React compares previous and current values using Object.is comparison.

```jsx
function DependencyExamples({ userId }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Case 1: No array - runs after EVERY render
  useEffect(() => {
    console.log('Every render');
  });

  // Case 2: Empty array - runs ONCE on mount
  useEffect(() => {
    console.log('Only on mount');
    initializeApp();
  }, []);

  // Case 3: With dependencies - runs when dependencies change
  useEffect(() => {
    console.log(`Count is now: ${count}`);
  }, [count]); // Only when count changes

  // Case 4: Multiple dependencies
  useEffect(() => {
    console.log(`Count: ${count}, Name: ${name}`);
  }, [count, name]); // When either changes

  // Case 5: Props as dependency
  useEffect(() => {
    console.log(`Fetching data for user: ${userId}`);
    fetchUserData(userId);
  }, [userId]); // When userId prop changes

  // Case 6: Function dependency (use useCallback)
  const fetchData = useCallback(() => {
    // fetch logic
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include function in deps

  // Common mistake: Missing dependencies
  useEffect(() => {
    // ⚠️ ESLint will warn: 'count' is missing from dependencies
    const interval = setInterval(() => {
      console.log(count); // Stale closure - always logs initial count!
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Should include [count] or use functional update

  return <div>{count}</div>;
}
```

---

### Question 15: Controlled Components
**Difficulty**: Intermediate

What is a controlled component?

A) A component that controls its child components
B) A form element whose value is controlled by React state
C) A component that doesn't re-render
D) A component with no props

**Answer**: B

**Explanation**: A controlled component is a form element whose value is controlled by React state, making React the "single source of truth." The value is set via state, and changes trigger state updates.

```jsx
function FormExample() {
  // Controlled inputs - React controls the value
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    remember: false,
    gender: 'male',
    country: 'us'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Controlled text input */}
      <input
        type="text"
        name="username"
        value={formData.username}    // Value from state
        onChange={handleChange}       // Updates state
      />

      {/* Controlled checkbox */}
      <input
        type="checkbox"
        name="remember"
        checked={formData.remember}
        onChange={handleChange}
      />

      {/* Controlled radio buttons */}
      <input
        type="radio"
        name="gender"
        value="male"
        checked={formData.gender === 'male'}
        onChange={handleChange}
      />

      {/* Controlled select */}
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled component (uses ref instead)
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log(inputRef.current.value); // Access DOM directly
  };

  return <input ref={inputRef} defaultValue="initial" />;
}
```

**Controlled vs Uncontrolled**:
| Controlled | Uncontrolled |
|------------|--------------|
| Value in React state | Value in DOM |
| Update via onChange | Access via ref |
| Instant validation | Submit-time validation |
| More code | Less code |

---

### Question 16: useContext Hook
**Difficulty**: Intermediate

What is the purpose of `useContext`?

A) To create new contexts
B) To consume context values in functional components
C) To update context values
D) To delete contexts

**Answer**: B

**Explanation**: `useContext` is a hook that allows functional components to consume context values without using Context.Consumer wrapper. It simplifies accessing shared data across the component tree.

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context with default value
const ThemeContext = createContext('light');
const UserContext = createContext(null);

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Provide both value and updater function
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume with useContext
function ThemedButton() {
  // Instead of <ThemeContext.Consumer>
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Current theme: {theme}
    </button>
  );
}

// 4. Multiple contexts
function UserProfile() {
  const { theme } = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div className={`profile ${theme}`}>
      <h1>{user?.name}</h1>
    </div>
  );
}

// 5. Custom hook pattern (recommended)
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// App setup
function App() {
  return (
    <ThemeProvider>
      <UserContext.Provider value={{ name: 'John' }}>
        <ThemedButton />
        <UserProfile />
      </UserContext.Provider>
    </ThemeProvider>
  );
}
```

---

### Question 17: Conditional Rendering
**Difficulty**: Intermediate

Which is NOT a valid way to conditionally render in React?

A) `{condition && <Component />}`
B) `{condition ? <ComponentA /> : <ComponentB />}`
C) `{if (condition) <Component />}`
D) Using an if statement before the return

**Answer**: C

**Explanation**: You cannot use if statements directly inside JSX because JSX is an expression, not a statement. Use ternary operators, logical AND, or if statements before the return statement.

```jsx
function ConditionalRendering({ isLoggedIn, role, items }) {
  // ✅ Method 1: If statement before return
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  // ✅ Method 2: Variable assignment
  let content;
  if (role === 'admin') {
    content = <AdminDashboard />;
  } else {
    content = <UserDashboard />;
  }

  return (
    <div>
      {/* ✅ Method 3: Ternary operator */}
      {isLoggedIn ? <UserMenu /> : <GuestMenu />}

      {/* ✅ Method 4: Logical AND (&&) - renders if truthy */}
      {isLoggedIn && <WelcomeMessage />}

      {/* ⚠️ Gotcha with && and numbers */}
      {items.length && <ItemList items={items} />}  {/* Shows "0" if empty! */}
      {items.length > 0 && <ItemList items={items} />}  {/* ✅ Correct */}

      {/* ✅ Method 5: Logical OR (||) - fallback */}
      {username || 'Guest'}

      {/* ✅ Method 6: Nullish coalescing (??) */}
      {user.nickname ?? user.name ?? 'Anonymous'}

      {/* ✅ Method 7: IIFE (Immediately Invoked Function Expression) */}
      {(() => {
        if (role === 'admin') return <AdminPanel />;
        if (role === 'mod') return <ModPanel />;
        return <UserPanel />;
      })()}

      {/* ❌ INVALID: if statement in JSX */}
      {/* {if (isLoggedIn) <UserMenu />} */}

      {content}
    </div>
  );
}

// ✅ Method 8: Separate component for complex logic
function RoleBasedContent({ role }) {
  switch (role) {
    case 'admin':
      return <AdminContent />;
    case 'moderator':
      return <ModeratorContent />;
    default:
      return <UserContent />;
  }
}
```

---

### Question 18: useRef Hook
**Difficulty**: Intermediate

What is the primary use case for `useRef`?

A) To manage component state
B) To access DOM elements directly and store mutable values
C) To create context providers
D) To optimize performance

**Answer**: B

**Explanation**: `useRef` is used to access DOM elements directly and to store mutable values that persist across renders without causing re-renders when changed.

```jsx
import { useRef, useState, useEffect } from 'react';

function UseRefExamples() {
  // 1. DOM Reference - access input element
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();          // Access DOM methods
    inputRef.current.value = 'Hello';  // Direct manipulation
  };

  // 2. Store previous value
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;  // Store after render
  });

  const prevCount = prevCountRef.current;
  console.log(`Now: ${count}, Before: ${prevCount}`);

  // 3. Store mutable value without re-render
  const renderCount = useRef(0);
  renderCount.current++;  // Doesn't trigger re-render!
  console.log(`Rendered ${renderCount.current} times`);

  // 4. Store interval/timeout IDs
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  // 5. Access child component methods (with forwardRef)
  const childRef = useRef();
  // childRef.current.someMethod()

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>

      <p>Count: {count} (prev: {prevCount})</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// Key difference: useRef vs useState
// useRef:   { current: value } - mutable, no re-render on change
// useState: [value, setValue]  - immutable, re-renders on change
```

---

### Question 19: Prop Drilling
**Difficulty**: Intermediate

What is prop drilling?

A) A method to optimize props
B) Passing props through multiple levels of components
C) A way to delete props
D) A testing technique

**Answer**: B

**Explanation**: Prop drilling refers to passing props through multiple levels of nested components to reach a deeply nested child component, even when intermediate components don't need those props.

```jsx
// ❌ Problem: Prop Drilling
function App() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });

  return <Layout user={user} setUser={setUser} />;  // Pass down
}

function Layout({ user, setUser }) {
  // Layout doesn't use these, just passes them
  return <Sidebar user={user} setUser={setUser} />;  // Pass down
}

function Sidebar({ user, setUser }) {
  // Sidebar doesn't use these either
  return <UserMenu user={user} setUser={setUser} />;  // Pass down
}

function UserMenu({ user, setUser }) {
  // Finally! This component actually uses the props
  return <span>{user.name}</span>;
}

// ✅ Solution 1: Context API
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'John' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout />  {/* No props needed! */}
    </UserContext.Provider>
  );
}

function Layout() {
  return <Sidebar />;  // Clean!
}

function Sidebar() {
  return <UserMenu />;  // Clean!
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext);  // Direct access
  return <span>{user.name}</span>;
}

// ✅ Solution 2: Component Composition
function App() {
  const [user, setUser] = useState({ name: 'John' });

  return (
    <Layout>
      <Sidebar>
        <UserMenu user={user} setUser={setUser} />
      </Sidebar>
    </Layout>
  );
}

function Layout({ children }) {
  return <div className="layout">{children}</div>;
}

// ✅ Solution 3: State Management (Redux, Zustand, etc.)
```

---

### Question 20: useMemo Hook
**Difficulty**: Intermediate

What is the purpose of `useMemo`?

A) To memoize expensive calculations
B) To store component state
C) To handle side effects
D) To manage context

**Answer**: A

**Explanation**: `useMemo` memoizes the result of expensive calculations and only recalculates when dependencies change, preventing unnecessary computations on every render.

```jsx
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, filter }) {
  const [count, setCount] = useState(0);

  // ❌ Without useMemo: runs on EVERY render
  const filteredItems = items.filter(item =>
    item.name.includes(filter)
  );

  // ✅ With useMemo: only recalculates when items or filter change
  const memoizedFilteredItems = useMemo(() => {
    console.log('Filtering...'); // Only logs when deps change
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  // Example: Expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }, []); // Empty deps = compute once

  // Example: Derived data
  const statistics = useMemo(() => ({
    total: items.length,
    average: items.reduce((a, b) => a + b.price, 0) / items.length,
    max: Math.max(...items.map(i => i.price))
  }), [items]);

  // Example: Sorting
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  // Clicking this button won't re-run memoized calculations
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Clicked {count} times
      </button>
      <ul>
        {memoizedFilteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// When to use useMemo:
// ✅ Expensive calculations (sorting, filtering large arrays)
// ✅ Creating objects/arrays passed to optimized children
// ✅ Computations involving many iterations
//
// When NOT to use:
// ❌ Simple calculations (a + b)
// ❌ Premature optimization
// ❌ Every variable (adds overhead)
```

---

### Question 21: useCallback Hook
**Difficulty**: Intermediate

When should you use `useCallback`?

A) To memoize values
B) To memoize callback functions
C) To handle API calls
D) To manage state

**Answer**: B

**Explanation**: `useCallback` memoizes callback functions, preventing unnecessary re-creation of functions on each render. This is useful when passing callbacks to optimized child components that rely on reference equality.

```jsx
import { useCallback, useState, memo } from 'react';

// Child component wrapped with memo
const ExpensiveChild = memo(function ExpensiveChild({ onClick, label }) {
  console.log(`Rendering: ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ Without useCallback: new function every render
  // ExpensiveChild re-renders even when only 'name' changes
  const handleClickBad = () => {
    setCount(c => c + 1);
  };

  // ✅ With useCallback: same function reference
  // ExpensiveChild only re-renders when dependencies change
  const handleClickGood = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps = function never changes

  // With dependencies
  const handleClickWithDep = useCallback(() => {
    console.log(`Count is: ${count}`);
    setCount(c => c + 1);
  }, [count]); // New function when count changes

  // Common pattern: event handler with parameter
  const handleItemClick = useCallback((id) => {
    console.log(`Clicked item: ${id}`);
  }, []);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* This will re-render on every parent render */}
      <ExpensiveChild onClick={handleClickBad} label="Bad" />

      {/* This only re-renders when handleClickGood changes */}
      <ExpensiveChild onClick={handleClickGood} label="Good" />

      {/* Usage with parameters */}
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

// useCallback vs useMemo
// useCallback(fn, deps) === useMemo(() => fn, deps)

// When to use useCallback:
// ✅ Passing callbacks to memoized children (React.memo)
// ✅ Callbacks used in useEffect dependencies
// ✅ Custom hooks that return functions
//
// When NOT to use:
// ❌ Callbacks for non-memoized children
// ❌ Inline event handlers that don't cause issues
// ❌ Every function (premature optimization)
```

---

### Question 22: Lifting State Up
**Difficulty**: Intermediate

What does "lifting state up" mean?

A) Moving state to a parent component to share it between children
B) Deleting unused state
C) Moving state to a global store
D) Optimizing state updates

**Answer**: A

**Explanation**: Lifting state up means moving state to the closest common ancestor component so multiple child components can share and modify the same state. This is React's recommended approach for sharing state between siblings.

```jsx
// ❌ Problem: Two components need to share state
function TemperatureInput() {
  const [temperature, setTemperature] = useState('');  // Each has own state
  return <input value={temperature} onChange={e => setTemperature(e.target.value)} />;
}

function App() {
  return (
    <div>
      <TemperatureInput />  {/* Celsius */}
      <TemperatureInput />  {/* Fahrenheit - not synced! */}
    </div>
  );
}

// ✅ Solution: Lift state to common parent
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = { c: 'Celsius', f: 'Fahrenheit' };

  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input
        value={temperature}
        onChange={e => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}

function Calculator() {
  // State lifted to parent
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const handleCelsiusChange = (temp) => {
    setScale('c');
    setTemperature(temp);
  };

  const handleFahrenheitChange = (temp) => {
    setScale('f');
    setTemperature(temp);
  };

  // Convert between scales
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      {/* Both inputs share the same state source */}
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}

// Pattern: State in parent, callbacks passed to children
// Parent owns data, children report changes via callbacks
```

---

### Question 23: Default Props
**Difficulty**: Intermediate

How do you set default props in a functional component?

A) Using `Component.defaultProps = {}`
B) Using default parameters: `function Component({ prop = 'default' })`
C) Both A and B
D) Default props are not supported in functional components

**Answer**: C

**Explanation**: You can set default props using either the `defaultProps` property or ES6 default parameters in the function signature. Default parameters are the modern, preferred approach.

```jsx
// Method 1: ES6 Default Parameters (Recommended)
function Button({
  text = 'Click me',
  color = 'blue',
  size = 'medium',
  disabled = false,
  onClick = () => {}
}) {
  return (
    <button
      className={`btn btn-${color} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// Method 2: defaultProps property (Legacy, still works)
function Button({ text, color, size }) {
  return <button className={`btn-${color}`}>{text}</button>;
}

Button.defaultProps = {
  text: 'Click me',
  color: 'blue',
  size: 'medium'
};

// Method 3: With destructuring and rest
function Card({ title = 'Untitled', ...rest }) {
  return <div {...rest}>{title}</div>;
}

// Method 4: With TypeScript
interface ButtonProps {
  text?: string;
  color?: 'blue' | 'red' | 'green';
  onClick?: () => void;
}

function Button({
  text = 'Click me',
  color = 'blue',
  onClick = () => {}
}: ButtonProps) {
  return <button className={`btn-${color}`} onClick={onClick}>{text}</button>;
}

// Usage - all these work:
<Button />                           // Uses all defaults
<Button text="Submit" />             // Custom text, default color
<Button text="Delete" color="red" /> // Custom text and color

// Note: null is NOT replaced by default, undefined IS
<Button text={null} />     // text will be null, not 'Click me'
<Button text={undefined} /> // text will be 'Click me'
```

---

### Question 24: React.memo
**Difficulty**: Intermediate

What does `React.memo` do?

A) Stores component state in memory
B) Prevents re-rendering if props haven't changed
C) Creates memoized values
D) Handles memory leaks

**Answer**: B

**Explanation**: `React.memo` is a higher-order component that memoizes the component and prevents re-rendering if props haven't changed (using shallow comparison by default).

```jsx
import { memo, useState, useCallback } from 'react';

// Without memo: re-renders every time parent renders
function ExpensiveList({ items }) {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// With memo: only re-renders when props change
const MemoizedList = memo(function ExpensiveList({ items }) {
  console.log('MemoizedList rendered');
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
});

// Custom comparison function
const MemoizedWithCustomCompare = memo(
  function UserCard({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);

function Parent() {
  const [count, setCount] = useState(0);
  const [items] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);

  // Clicking button increments count
  // Without memo: ExpensiveList re-renders
  // With memo: MemoizedList does NOT re-render (items didn't change)

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <ExpensiveList items={items} />      {/* Re-renders */}
      <MemoizedList items={items} />       {/* Doesn't re-render */}
    </div>
  );
}

// Common gotcha: Object/function props break memo
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ New object every render - memo won't help
  const style = { color: 'red' };

  // ✅ Memoize object
  const memoizedStyle = useMemo(() => ({ color: 'red' }), []);

  // ❌ New function every render
  const handleClick = () => console.log('clicked');

  // ✅ Memoize function
  const memoizedClick = useCallback(() => console.log('clicked'), []);

  return <MemoizedChild style={memoizedStyle} onClick={memoizedClick} />;
}

// When to use memo:
// ✅ Component renders often with same props
// ✅ Component is expensive to render
// ✅ Pure functional components
//
// When NOT to use:
// ❌ Component always receives new props
// ❌ Cheap components
// ❌ Every component (adds overhead)
```

---

### Question 25: Synthetic Events
**Difficulty**: Intermediate

What are Synthetic Events in React?

A) Fake events used for testing
B) Cross-browser wrappers around native browser events
C) Custom events created by developers
D) Events that don't exist in JavaScript

**Answer**: B

**Explanation**: Synthetic Events are React's cross-browser wrapper around native browser events, ensuring consistent behavior across different browsers. They have the same interface as native events but work identically across all browsers.

```jsx
function SyntheticEventExample() {
  const handleClick = (event) => {
    // SyntheticEvent properties (same as native)
    console.log(event.type);           // 'click'
    console.log(event.target);         // DOM element
    console.log(event.currentTarget);  // Element with handler
    console.log(event.bubbles);        // true

    // Prevent default behavior
    event.preventDefault();

    // Stop propagation
    event.stopPropagation();

    // Access native event (if needed)
    console.log(event.nativeEvent);    // Native browser event
  };

  const handleChange = (event) => {
    // Same API across all browsers
    const value = event.target.value;
    const name = event.target.name;
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent form submission
    // Process form...
  };

  // Event pooling (React 16 and earlier)
  const handleClickOld = (event) => {
    // ❌ Won't work in React 16 - event is nullified after handler
    setTimeout(() => {
      console.log(event.type);  // null in React 16
    }, 100);

    // ✅ Solution: persist the event
    event.persist();
    setTimeout(() => {
      console.log(event.type);  // 'click'
    }, 100);
  };

  // React 17+: No more event pooling!
  const handleClickNew = (event) => {
    // ✅ Works in React 17+ without persist()
    setTimeout(() => {
      console.log(event.type);  // 'click'
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        onChange={handleChange}
        onFocus={(e) => console.log('Focused:', e.target.name)}
        onBlur={(e) => console.log('Blurred')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') console.log('Enter pressed');
          if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            console.log('Ctrl+S pressed');
          }
        }}
      />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}

// Common Synthetic Events:
// Mouse: onClick, onDoubleClick, onMouseEnter, onMouseLeave
// Keyboard: onKeyDown, onKeyUp, onKeyPress
// Form: onChange, onSubmit, onFocus, onBlur
// Touch: onTouchStart, onTouchMove, onTouchEnd
// Clipboard: onCopy, onPaste, onCut
// Drag: onDrag, onDragStart, onDragEnd, onDrop
```

---

### Question 26: Error Boundaries
**Difficulty**: Intermediate

What can Error Boundaries catch?

A) Errors in event handlers
B) Errors in asynchronous code
C) Errors during rendering, in lifecycle methods, and in constructors
D) All JavaScript errors

**Answer**: C

**Explanation**: Error Boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them. They don't catch errors in event handlers, async code, SSR, or in the error boundary itself.

```jsx
// Error Boundary must be a class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Update state when error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Log error details
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    // Send to error reporting service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <ErrorBoundary>  {/* Nested for granular error handling */}
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}

// Component that might throw
function BuggyComponent() {
  const [count, setCount] = useState(0);

  if (count === 5) {
    throw new Error('Crashed!');  // ✅ Caught by ErrorBoundary
  }

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// What Error Boundaries DON'T catch:
function NotCaughtExamples() {
  const handleClick = () => {
    throw new Error('Event handler error');  // ❌ NOT caught
  };

  useEffect(() => {
    throw new Error('useEffect error');  // ❌ NOT caught (async)
  }, []);

  const fetchData = async () => {
    throw new Error('Async error');  // ❌ NOT caught
  };

  // For these, use try-catch:
  const handleClickSafe = () => {
    try {
      riskyOperation();
    } catch (error) {
      setError(error);  // Handle manually
    }
  };

  return <button onClick={handleClick}>Click</button>;
}

// React 18+ with functional components (using react-error-boundary library)
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => logError(error, info)}
      onReset={() => window.location.reload()}
    >
      <MyApp />
    </ErrorBoundary>
  );
}
```

---

## 🟠 Advanced Level (Questions 27-35)

### Question 27: Custom Hooks
**Difficulty**: Advanced

What is required for a function to be considered a custom hook?

A) It must be a class
B) It must start with "use" and can call other hooks
C) It must return JSX
D) It must be exported as default

**Answer**: B

**Explanation**: Custom hooks must follow the naming convention (start with "use") and can call other hooks. This naming convention allows React to check hook rules and enables proper linting.

```jsx
import { useState, useEffect, useCallback, useRef } from 'react';

// Custom Hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Custom Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => abortController.abort();  // Cleanup
  }, [url]);

  return { data, loading, error };
}

// Custom Hook: useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Custom Hook: useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Custom Hook: usePrevious
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const { data, loading, error } = useFetch('/api/users');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [isOpen, toggleOpen] = useToggle(false);
  const prevCount = usePrevious(count);

  return (
    <div>
      {loading && <Spinner />}
      {error && <Error message={error} />}
      {data && <UserList users={data} />}
    </div>
  );
}
```

---

### Question 28: useLayoutEffect
**Difficulty**: Advanced

What's the difference between `useEffect` and `useLayoutEffect`?

A) There is no difference
B) `useLayoutEffect` runs synchronously after DOM mutations, before paint
C) `useLayoutEffect` only runs once
D) `useLayoutEffect` is deprecated

**Answer**: B

**Explanation**: `useLayoutEffect` fires synchronously after all DOM mutations but before the browser paints. Use it when you need to measure or mutate the DOM before the user sees it to avoid visual flicker.

```jsx
import { useEffect, useLayoutEffect, useState, useRef } from 'react';

function LayoutEffectExample() {
  const [width, setWidth] = useState(0);
  const elementRef = useRef();

  // ❌ useEffect: might cause flicker
  // Runs AFTER browser paint
  useEffect(() => {
    const rect = elementRef.current.getBoundingClientRect();
    setWidth(rect.width);  // Causes re-render after paint = flicker!
  }, []);

  // ✅ useLayoutEffect: no flicker
  // Runs BEFORE browser paint
  useLayoutEffect(() => {
    const rect = elementRef.current.getBoundingClientRect();
    setWidth(rect.width);  // Updates before user sees anything
  }, []);

  return <div ref={elementRef}>Width: {width}px</div>;
}

// Timeline comparison:
// useEffect:
// 1. Render → 2. Commit to DOM → 3. Browser paints → 4. useEffect runs
//
// useLayoutEffect:
// 1. Render → 2. Commit to DOM → 3. useLayoutEffect runs → 4. Browser paints

// Example: Measuring and positioning a tooltip
function Tooltip({ targetRef, children }) {
  const tooltipRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    setPosition({
      top: targetRect.bottom + 8,
      left: targetRect.left + (targetRect.width - tooltipRect.width) / 2
    });
  }, [targetRef]);

  return (
    <div
      ref={tooltipRef}
      style={{ position: 'fixed', top: position.top, left: position.left }}
    >
      {children}
    </div>
  );
}

// Example: Scroll restoration
function ScrollRestoration({ scrollPosition }) {
  useLayoutEffect(() => {
    window.scrollTo(0, scrollPosition);  // Before paint = no jump visible
  }, [scrollPosition]);

  return null;
}

// When to use useLayoutEffect:
// ✅ Measuring DOM elements (getBoundingClientRect)
// ✅ Synchronously mutating the DOM
// ✅ Preventing visual flicker
// ✅ Animations that need immediate DOM state
//
// When to use useEffect:
// ✅ Data fetching
// ✅ Setting up subscriptions
// ✅ Logging
// ✅ Most side effects

// Note: useLayoutEffect warns in SSR - use useEffect or check typeof window
```

---

### Question 29: Context Performance
**Difficulty**: Advanced

What is a common performance issue with Context API?

A) Context doesn't work with functional components
B) All consumers re-render when any context value changes
C) Context can't hold complex data
D) Context causes memory leaks

**Answer**: B

**Explanation**: When context value changes, all consumers re-render, even if they only use part of the context. This can cause unnecessary re-renders in large applications.

```jsx
import { createContext, useContext, useState, useMemo, memo } from 'react';

// ❌ Problem: Single context with multiple values
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  // Every state change re-renders ALL consumers!
  const value = { user, setUser, theme, setTheme, notifications, setNotifications };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// When theme changes, UserProfile re-renders (even though it only uses user)
function UserProfile() {
  const { user } = useContext(AppContext);  // Re-renders on ANY context change
  return <div>{user?.name}</div>;
}

// ✅ Solution 1: Split into multiple contexts
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function SplitProviders({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
          {children}
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Now only re-renders when user changes
function UserProfile() {
  const { user } = useContext(UserContext);
  return <div>{user?.name}</div>;
}

// ✅ Solution 2: Memoize context value
function OptimizedProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // Memoize to prevent unnecessary object recreation
  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// ✅ Solution 3: Separate state and dispatch
const UserStateContext = createContext();
const UserDispatchContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

// Components that only dispatch don't re-render on state changes
function LogoutButton() {
  const setUser = useContext(UserDispatchContext);  // Never re-renders!
  return <button onClick={() => setUser(null)}>Logout</button>;
}

// ✅ Solution 4: Use memo on consumers
const MemoizedUserProfile = memo(function UserProfile({ user }) {
  return <div>{user?.name}</div>;
});
```

---

### Question 30: Higher-Order Components
**Difficulty**: Advanced

What is a Higher-Order Component (HOC)?

A) A component at the top of the component tree
B) A function that takes a component and returns a new component
C) A component with high priority rendering
D) A component that manages global state

**Answer**: B

**Explanation**: An HOC is a function that takes a component and returns a new component with enhanced functionality. It's a pattern for reusing component logic, derived from functional programming's higher-order functions.

```jsx
import React, { useState, useEffect } from 'react';

// Basic HOC structure
function withEnhancement(WrappedComponent) {
  return function EnhancedComponent(props) {
    // Add logic here
    return <WrappedComponent {...props} />;
  };
}

// HOC: withLoading
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="spinner">Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// HOC: withAuth
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      checkAuth().then(auth => {
        setIsAuthenticated(auth);
        setLoading(false);
      });
    }, []);

    if (loading) return <Loading />;
    if (!isAuthenticated) return <Redirect to="/login" />;
    return <WrappedComponent {...props} />;
  };
}

// HOC: withErrorBoundary
function withErrorBoundary(WrappedComponent, FallbackComponent) {
  return class extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return <FallbackComponent />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

// HOC: withLogger
function withLogger(WrappedComponent) {
  return function WithLoggerComponent(props) {
    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted`);
      return () => console.log(`${WrappedComponent.name} unmounted`);
    }, []);

    console.log(`${WrappedComponent.name} rendered with props:`, props);
    return <WrappedComponent {...props} />;
  };
}

// Usage
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// Apply HOCs
const UserListWithLoading = withLoading(UserList);
const ProtectedUserList = withAuth(withLoading(UserList));

// Compose multiple HOCs (right to left)
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const EnhancedUserList = compose(
  withAuth,
  withLoading,
  withLogger
)(UserList);

// In component:
<UserListWithLoading isLoading={loading} users={users} />

// HOC conventions:
// 1. Don't mutate the original component
// 2. Pass through unrelated props
// 3. Wrap display name for debugging
// 4. Don't use HOCs inside render method

// Display name for debugging
function withSubscription(WrappedComponent) {
  function WithSubscription(props) { /* ... */ }

  WithSubscription.displayName =
    `WithSubscription(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithSubscription;
}

// Modern alternative: Custom Hooks
// HOCs were popular before hooks. Now prefer hooks for logic reuse.
```

---

### Question 31: Render Props Pattern
**Difficulty**: Advanced

What is the render props pattern?

A) A technique for sharing code using a prop whose value is a function
B) A way to style components
C) A method for server-side rendering
D) A debugging tool

**Answer**: A

**Explanation**: Render props is a technique for sharing code between components using a prop whose value is a function that returns React elements. It allows components to share state or behavior without using HOCs.

```jsx
import { useState, useEffect } from 'react';

// Render Props component: Mouse position tracker
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/* Call the render prop with state */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage with render prop
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h1>Mouse position: ({x}, {y})</h1>
      )}
    />
  );
}

// Alternative: children as function
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };
  // ... same logic

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}  {/* children as function */}
      </div>
    );
  }
}

// Usage with children
<MouseTracker>
  {({ x, y }) => <h1>Position: ({x}, {y})</h1>}
</MouseTracker>

// Functional version with hooks (recommended)
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return children(position);
}

// More examples:

// Fetch component with render props
function Fetch({ url, children }) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }));
  }, [url]);

  return children(state);
}

// Usage
<Fetch url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <UserList users={data} />;
  }}
</Fetch>

// Toggle component
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(prev => !prev);

  return children({ on, toggle });
}

<Toggle>
  {({ on, toggle }) => (
    <div>
      <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
      {on && <p>Content shown when ON</p>}
    </div>
  )}
</Toggle>

// Modern alternative: Custom Hooks (preferred)
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

// Cleaner usage with hook
function App() {
  const { x, y } = useMousePosition();
  return <h1>Position: ({x}, {y})</h1>;
}
```

---

### Question 32: Code Splitting
**Difficulty**: Advanced

Which API is used for code splitting in React?

A) `React.split()`
B) `React.lazy()` and `Suspense`
C) `import()` only
D) `React.async()`

**Answer**: B

**Explanation**: `React.lazy()` enables code splitting by allowing you to render a dynamic import as a regular component. It must be used with `Suspense` to show a loading fallback while the lazy component is loading.

```jsx
import React, { Suspense, lazy, useState } from 'react';

// Static import (bundled together)
import HeavyComponent from './HeavyComponent';  // Always loaded

// Dynamic import with React.lazy (code splitting)
const LazyComponent = lazy(() => import('./HeavyComponent'));
const LazyDashboard = lazy(() => import('./Dashboard'));
const LazySettings = lazy(() => import('./Settings'));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>Load Heavy Component</button>

      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

// Route-based code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Named exports (need wrapper)
// ❌ Won't work directly
const LazyComponent = lazy(() => import('./MyComponent'));  // Only default exports

// ✅ Solution for named exports
const LazyNamedComponent = lazy(() =>
  import('./MyModule').then(module => ({ default: module.MyComponent }))
);

// Preloading (load before user needs it)
const LazySettings = lazy(() => import('./Settings'));

function NavLink() {
  // Start loading when user hovers
  const handleMouseEnter = () => {
    import('./Settings');  // Preload
  };

  return (
    <Link to="/settings" onMouseEnter={handleMouseEnter}>
      Settings
    </Link>
  );
}

// Error handling
function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load</div>}>
      <Suspense fallback={<Spinner />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// Multiple lazy components with single Suspense
function Dashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <LazyHeader />
      <LazySidebar />
      <LazyContent />
    </Suspense>
  );
}

// Nested Suspense for fine-grained loading
function Dashboard() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <LazyHeader />
      <Suspense fallback={<SidebarSkeleton />}>
        <LazySidebar />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <LazyContent />
      </Suspense>
    </Suspense>
  );
}

// Webpack magic comments for chunk naming
const LazyDashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './Dashboard')
);

// Results in: dashboard.chunk.js instead of 1.chunk.js
```

---

### Question 33: useReducer
**Difficulty**: Advanced

When should you use `useReducer` instead of `useState`?

A) Never, `useState` is always better
B) When you have complex state logic with multiple sub-values or when next state depends on previous
C) Only for global state
D) Only in class components

**Answer**: B

**Explanation**: `useReducer` is preferable when you have complex state logic involving multiple sub-values, when the next state depends on the previous one, or when you want to optimize performance for components that trigger deep updates.

```jsx
import { useReducer, useContext, createContext } from 'react';

// useState vs useReducer comparison

// ❌ Complex state with useState (messy)
function TodoAppWithState() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  // ... more handlers
}

// ✅ Same logic with useReducer (cleaner, testable)
const initialState = {
  todos: [],
  filter: 'all',
  loading: false
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, filter, loading } = state;

  const addTodo = (text) => dispatch({ type: 'ADD_TODO', payload: text });
  const toggleTodo = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id });

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <FilterButtons
        filter={filter}
        onFilter={(f) => dispatch({ type: 'SET_FILTER', payload: f })}
      />
    </div>
  );
}

// Lazy initialization
const [state, dispatch] = useReducer(reducer, initialArg, init);

function init(initialCount) {
  return { count: initialCount };  // Expensive computation here
}

const [state, dispatch] = useReducer(reducer, 0, init);

// useReducer with Context (mini Redux)
const TodoContext = createContext();

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be within TodoProvider');
  return context;
}

// When to use useReducer:
// ✅ Complex state logic
// ✅ Next state depends on previous state
// ✅ Multiple sub-values in state
// ✅ State logic needs to be testable
// ✅ Passing dispatch down (instead of multiple callbacks)
//
// When to use useState:
// ✅ Simple state (primitives, simple objects)
// ✅ Independent state values
// ✅ Quick prototyping
```

---

### Question 34: Portal
**Difficulty**: Advanced

What is `ReactDOM.createPortal` used for?

A) Creating new React applications
B) Rendering children into a DOM node outside the parent hierarchy
C) Creating authentication portals
D) Server-side rendering

**Answer**: B

**Explanation**: Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This is useful for modals, tooltips, and overlays that need to visually "break out" of their container.

```jsx
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

// Basic Portal usage
function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  // Render into document.body instead of parent
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body  // Target DOM node
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {/* Even though Modal is here in JSX, it renders to document.body */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>I'm a modal!</h2>
        <p>I render outside my parent's DOM hierarchy.</p>
      </Modal>
    </div>
  );
}

// Why use Portals?
// 1. CSS z-index issues: Parent has overflow:hidden or z-index context
// 2. CSS positioning: Need fixed/absolute relative to viewport
// 3. Accessibility: Screen readers need modals at top level

// Tooltip with Portal
function Tooltip({ children, text, position }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setShow(true);
  };

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>

      {show && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'fixed',
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
}

// Portal to custom container
function App() {
  return (
    <div>
      <div id="modal-root"></div>  {/* Portal target */}
      <div id="tooltip-root"></div>

      <MainContent />
    </div>
  );
}

function Modal({ children }) {
  const modalRoot = document.getElementById('modal-root');
  return createPortal(children, modalRoot);
}

// Event bubbling still works through Portals!
function Parent() {
  const handleClick = () => console.log('Parent caught click!');

  return (
    <div onClick={handleClick}>
      <p>Click in the modal will bubble here!</p>
      {createPortal(
        <button>Click me (bubbles to Parent!)</button>,
        document.body
      )}
    </div>
  );
}

// Creating portal container dynamically
function Portal({ children }) {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    return () => document.body.removeChild(container);
  }, [container]);

  return createPortal(children, container);
}
```

---

### Question 35: Reconciliation
**Difficulty**: Advanced

What is reconciliation in React?

A) A debugging tool
B) The algorithm React uses to diff the Virtual DOM and update the real DOM
C) A method to combine components
D) A way to handle errors

**Answer**: B

**Explanation**: Reconciliation is the algorithm React uses to compare the new Virtual DOM with the previous one and efficiently determine the minimal set of changes needed to update the real DOM.

```jsx
// How Reconciliation Works

// 1. DIFFERENT ELEMENT TYPES = Full rebuild
// Before:
<div>
  <Counter />
</div>

// After:
<span>
  <Counter />
</span>

// React destroys <div> and <Counter>, creates new <span> and <Counter>
// Counter state is LOST!

// 2. SAME ELEMENT TYPE = Update attributes only
// Before:
<div className="old" title="stuff" />

// After:
<div className="new" title="stuff" />

// React only updates className, keeps same DOM node

// 3. SAME COMPONENT TYPE = Update props, keep instance
// Before:
<Counter count={1} />

// After:
<Counter count={2} />

// React updates props, keeps state, calls render()

// 4. LISTS AND KEYS
// ❌ Without keys: React re-renders all items
const listBad = ['a', 'b', 'c'].map(item => <li>{item}</li>);

// Inserting at beginning without keys:
// Before: <li>a</li> <li>b</li>
// After:  <li>z</li> <li>a</li> <li>b</li>
// React thinks: item 1 changed a→z, item 2 changed b→a, item 3 is new
// Result: Updates ALL items (inefficient!)

// ✅ With keys: React identifies moved items
const listGood = ['a', 'b', 'c'].map(item => <li key={item}>{item}</li>);

// Before: <li key="a">a</li> <li key="b">b</li>
// After:  <li key="z">z</li> <li key="a">a</li> <li key="b">b</li>
// React: key="z" is new, key="a" and key="b" moved
// Result: Only inserts one new item (efficient!)

// Practical implications:

// ❌ Problem: Changing component type resets state
function Form({ useTextarea }) {
  // Every toggle destroys input and creates new one!
  return useTextarea
    ? <textarea />
    : <input />;
}

// ✅ Solution: Keep same type, change behavior
function Form({ useTextarea }) {
  return (
    <input
      as={useTextarea ? 'textarea' : 'input'}
      // Or use CSS to style differently
    />
  );
}

// ❌ Problem: Wrapper changes reset children
function App({ isAdmin }) {
  // Changing wrapper resets Form state!
  return isAdmin
    ? <AdminLayout><Form /></AdminLayout>
    : <UserLayout><Form /></UserLayout>;
}

// ✅ Solution: Keep structure stable
function App({ isAdmin }) {
  return (
    <Layout variant={isAdmin ? 'admin' : 'user'}>
      <Form />
    </Layout>
  );
}

// Keys for resetting component state intentionally
function ChatRoom({ roomId }) {
  // Key change = component remounts = fresh state
  return <Chat key={roomId} roomId={roomId} />;
}

// React Fiber (React 16+) improvements to reconciliation:
// - Incremental rendering (can pause/resume)
// - Priority-based updates
// - Concurrent features
// - Better error boundaries

// Understanding diffing algorithm:
// 1. Compare root elements
// 2. If different types → rebuild subtree
// 3. If same type → update and recurse on children
// 4. For lists → use keys to match elements
// 5. Time complexity: O(n) where n = number of elements
```

---

## 🔴 Expert Level (Questions 36-40)

### Question 36: Concurrent Mode
**Difficulty**: Expert

What is the main benefit of React's Concurrent Mode?

A) Faster initial load times
B) Better SEO
C) Ability to interrupt rendering to handle high-priority updates
D) Automatic code splitting

**Answer**: C

**Explanation**: Concurrent Mode (now Concurrent Features in React 18+) allows React to interrupt a long-running render to handle high-priority updates, keeping the app responsive even during expensive renders.

```jsx
import {
  useState,
  useTransition,
  useDeferredValue,
  startTransition,
  Suspense
} from 'react';

// The Problem: Blocking renders
function SlowList({ text }) {
  // Expensive render blocks UI
  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return <ul>{items}</ul>;
}

function App() {
  const [text, setText] = useState('');

  return (
    <div>
      {/* ❌ Typing is blocked while list re-renders */}
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
    </div>
  );
}

// Solution 1: useTransition
function AppWithTransition() {
  const [text, setText] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // High priority: update input immediately
    setText(e.target.value);

    // Low priority: can be interrupted
    startTransition(() => {
      setFilterText(e.target.value);
    });
  };

  return (
    <div>
      <input value={text} onChange={handleChange} />
      {isPending && <Spinner />}
      <SlowList text={filterText} />
    </div>
  );
}

// Solution 2: useDeferredValue
function AppWithDeferred() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  // text updates immediately (input responsive)
  // deferredText lags behind (list can be interrupted)
  const isStale = text !== deferredText;

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <SlowList text={deferredText} />
      </div>
    </div>
  );
}

// Automatic Batching (React 18)
// Before React 18: Only batched in React event handlers
// React 18: Batches everywhere!

function handleClick() {
  // React 18: Both updates are batched = 1 re-render
  setCount(c => c + 1);
  setFlag(f => !f);
}

setTimeout(() => {
  // React 18: Still batched = 1 re-render
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

fetch('/api').then(() => {
  // React 18: Still batched = 1 re-render
  setCount(c => c + 1);
  setFlag(f => !f);
});

// Opt out of batching if needed
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);  // Re-render immediately
  });
  flushSync(() => {
    setFlag(f => !f);      // Re-render again
  });
}

// Suspense for data fetching (experimental)
const resource = fetchProfileData();  // Starts fetching

function Profile() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileDetails />
      <Suspense fallback={<PostsSpinner />}>
        <ProfilePosts />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  const user = resource.user.read();  // Suspends if not ready
  return <h1>{user.name}</h1>;
}
```

---

### Question 37: useTransition
**Difficulty**: Expert

What does the `useTransition` hook do?

A) Handles component animations
B) Marks state updates as non-urgent transitions
C) Manages page routing transitions
D) Creates CSS transitions

**Answer**: B

**Explanation**: `useTransition` lets you mark certain state updates as transitions (non-urgent), allowing React to keep the interface responsive by interrupting these updates if more urgent updates come in.

```jsx
import { useState, useTransition, memo } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab) {
    // Mark as transition - can be interrupted
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <div>
      <TabButtons selectedTab={tab} onSelect={selectTab} />

      {/* Show loading indicator during transition */}
      {isPending && <Spinner />}

      {/* Content can be interrupted if user clicks another tab */}
      <div style={{ opacity: isPending ? 0.8 : 1 }}>
        {tab === 'about' && <AboutTab />}
        {tab === 'posts' && <PostsTab />}      {/* Expensive */}
        {tab === 'contact' && <ContactTab />}
      </div>
    </div>
  );
}

// Real-world example: Search with results
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = async (e) => {
    const value = e.target.value;

    // Urgent: Update input immediately
    setQuery(value);

    // Non-urgent: Fetch and update results
    startTransition(async () => {
      const data = await searchAPI(value);
      setResults(data);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />

      {isPending ? (
        <div className="loading">Searching...</div>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}

// Expensive list filtering
const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log('Rendering', items.length, 'items');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

function FilterableList({ allItems }) {
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);  // Urgent

    startTransition(() => {
      // Non-urgent - can show stale data briefly
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <input value={filter} onChange={handleFilterChange} />
      <div className={isPending ? 'stale' : ''}>
        <ExpensiveList items={filteredItems} />
      </div>
    </div>
  );
}

// startTransition without hook (for non-component code)
import { startTransition } from 'react';

// In a library or utility function
function updateChart(data) {
  startTransition(() => {
    renderChart(data);  // Expensive, can be interrupted
  });
}

// Key differences:
// useTransition: Returns isPending, for components
// startTransition: Just the function, for utilities

// When to use:
// ✅ Tab switching
// ✅ List filtering/sorting
// ✅ Search results
// ✅ Any expensive re-render that can show stale data
//
// When NOT to use:
// ❌ Controlled inputs (need immediate feedback)
// ❌ Animations (use CSS transitions)
// ❌ Critical updates (form submissions)
```

---

### Question 38: Fiber Architecture
**Difficulty**: Expert

What is React Fiber?

A) A CSS framework
B) A new component type
C) React's reconciliation algorithm that enables incremental rendering
D) A state management library

**Answer**: C

**Explanation**: React Fiber is the new reconciliation algorithm introduced in React 16 that enables features like incremental rendering, time-slicing, and the ability to pause, abort, or reuse work. It's the foundation for Concurrent Features.

```jsx
// Understanding Fiber Architecture

// Before Fiber (React 15): Stack Reconciler
// - Synchronous, recursive rendering
// - Can't be interrupted
// - Long renders block the main thread
// - No prioritization

// After Fiber (React 16+): Fiber Reconciler
// - Work can be split into chunks
// - Can pause and resume
// - Can prioritize different types of updates
// - Enables concurrent features

// Fiber Node Structure (simplified)
const fiberNode = {
  // Instance
  type: 'div',            // Component type
  key: null,              // Unique key
  stateNode: domNode,     // DOM node or component instance

  // Fiber relationships (linked list)
  return: parentFiber,    // Parent
  child: firstChildFiber, // First child
  sibling: nextFiber,     // Next sibling

  // Effects
  flags: Update,          // What work to do
  subtreeFlags: Placement,

  // Work
  pendingProps: {},       // New props
  memoizedProps: {},      // Current props
  memoizedState: {},      // Current state

  // Priority
  lanes: DefaultLane,     // Priority level
};

// Two trees: Current and Work-in-Progress
// Current: What's on screen
// WIP: What's being built

// Render Phase (can be interrupted)
// - Build work-in-progress tree
// - Calculate changes
// - Pure, no side effects
// - Can be paused/aborted

// Commit Phase (synchronous, can't be interrupted)
// - Apply changes to DOM
// - Run effects
// - Must complete in one go

// Priority Lanes (React 18)
const lanes = {
  SyncLane: 1,           // Highest: discrete user input
  InputContinuousLane: 2, // Continuous input (drag)
  DefaultLane: 4,        // Normal updates
  TransitionLane: 8,     // Transitions (useTransition)
  IdleLane: 16,          // Lowest: background work
};

// How Fiber enables incremental rendering:
function workLoop(deadline) {
  while (workInProgress !== null && deadline.timeRemaining() > 0) {
    // Do a unit of work
    workInProgress = performUnitOfWork(workInProgress);
  }

  if (workInProgress !== null) {
    // More work to do, schedule next chunk
    requestIdleCallback(workLoop);
  } else {
    // Done with render phase, commit
    commitRoot();
  }
}

// Practical implications for developers:

// 1. Don't rely on render timing
function Component() {
  console.log('render');  // May be called multiple times!
  // React may start rendering, abort, and restart

  return <div />;
}

// 2. Keep render pure
function BadComponent() {
  // ❌ Side effects in render
  document.title = 'Updated';  // May run multiple times!

  return <div />;
}

function GoodComponent() {
  // ✅ Side effects in useEffect
  useEffect(() => {
    document.title = 'Updated';  // Runs once after commit
  }, []);

  return <div />;
}

// 3. Use correct lifecycle phases
class ClassComponent extends React.Component {
  // Render phase (can be called multiple times)
  static getDerivedStateFromProps() {}
  shouldComponentUpdate() {}
  render() {}

  // Commit phase (called once)
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}

// 4. Strict Mode double-invokes to catch issues
<React.StrictMode>
  <App />  {/* Renders twice in dev to find side effects */}
</React.StrictMode>
```

---

### Question 39: Server Components
**Difficulty**: Expert

What is the main advantage of React Server Components?

A) Faster client-side rendering
B) Zero-bundle-size components that run only on the server
C) Better animation performance
D) Automatic state management

**Answer**: B

**Explanation**: React Server Components run only on the server and have zero bundle size impact on the client. They can directly access databases, file systems, and other server resources, while the JavaScript for these components never ships to the client.

```jsx
// React Server Components (RSC) - Next.js 13+ App Router

// Server Component (default in app/ directory)
// - Runs only on server
// - Zero client-side JavaScript
// - Can directly access databases, file systems
// - Cannot use hooks, event handlers, or browser APIs

// app/page.js (Server Component by default)
import { db } from './database';

async function ProductPage({ params }) {
  // Direct database access - no API needed!
  const product = await db.products.findById(params.id);
  const reviews = await db.reviews.findByProductId(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Can render client components */}
      <AddToCartButton productId={product.id} />
      <Reviews reviews={reviews} />
    </div>
  );
}

export default ProductPage;

// Client Component (opt-in with 'use client')
// app/components/AddToCartButton.js
'use client';  // This directive makes it a Client Component

import { useState } from 'react';

export function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);

  // Can use hooks, event handlers, browser APIs
  const handleClick = async () => {
    await addToCart(productId);
    setAdded(true);
  };

  return (
    <button onClick={handleClick}>
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}

// Comparison: What ships to client

// Traditional React:
// - All components shipped as JavaScript
// - ProductPage.js: 50KB
// - AddToCartButton.js: 10KB
// - Total: 60KB

// With Server Components:
// - Only Client Components shipped
// - ProductPage: 0KB (HTML only)
// - AddToCartButton.js: 10KB
// - Total: 10KB (83% smaller!)

// Server Component capabilities:
async function ServerComponent() {
  // ✅ Async/await at component level
  const data = await fetch('https://api.example.com/data');

  // ✅ Direct filesystem access
  const file = await fs.readFile('./data.json');

  // ✅ Direct database queries
  const users = await prisma.user.findMany();

  // ✅ Access environment secrets
  const secret = process.env.SECRET_KEY;

  // ❌ Cannot use hooks
  // const [state, setState] = useState();  // Error!

  // ❌ Cannot use event handlers
  // onClick={handleClick}  // Error!

  return <div>{data.title}</div>;
}

// Mixing Server and Client Components
// Server Component (parent)
async function Dashboard() {
  const stats = await getStats();  // Server-side data fetching

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Static content - Server Component */}
      <StatsDisplay stats={stats} />

      {/* Interactive content - Client Component */}
      <InteractiveChart data={stats.chartData} />
    </div>
  );
}

// Important: Server Components can import Client Components
// But Client Components CANNOT import Server Components

// Patterns:
// 1. Pass Server data to Client via props
async function Page() {
  const data = await fetchData();  // Server
  return <ClientComponent data={data} />;  // Pass to client
}

// 2. Composition pattern
function ServerWrapper() {
  return (
    <ClientComponent>
      <ServerComponent />  {/* Passed as children */}
    </ClientComponent>
  );
}

// 3. Shared components (both server and client)
// Works in both contexts if no hooks/handlers
function SharedButton({ children }) {
  return <button className="btn">{children}</button>;
}
```

---

### Question 40: useDeferredValue
**Difficulty**: Expert

What is `useDeferredValue` used for?

A) Delaying component mounting
B) Deferring a value to prioritize more urgent updates
C) Lazy loading components
D) Postponing event handlers

**Answer**: B

**Explanation**: `useDeferredValue` lets you defer updating a part of the UI. It accepts a value and returns a new version that may "lag behind" during urgent updates, improving responsiveness by allowing React to prioritize more urgent updates.

```jsx
import { useDeferredValue, useState, useMemo, memo } from 'react';

// Basic usage
function SearchResults() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // query: Updates immediately (input stays responsive)
  // deferredQuery: Lags behind during typing

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {/* Results use deferred value - can show stale data */}
      <ResultsList query={deferredQuery} />
    </div>
  );
}

// Show stale state indicator
function SearchWithIndicator() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // Check if showing stale content
  const isStale = query !== deferredQuery;

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />

      {/* Visual feedback that content is updating */}
      <div style={{
        opacity: isStale ? 0.5 : 1,
        transition: 'opacity 0.2s'
      }}>
        <ResultsList query={deferredQuery} />
      </div>
    </div>
  );
}

// Optimized with memo
const SlowList = memo(function SlowList({ text }) {
  console.log('[RENDER] SlowList with:', text);

  // Simulate expensive render
  const items = [];
  for (let i = 0; i < 5000; i++) {
    items.push(
      <li key={i}>
        {text ? `${text} - Item ${i}` : `Item ${i}`}
      </li>
    );
  }

  return <ul>{items}</ul>;
});

function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* SlowList only re-renders when deferredText changes */}
      {/* During rapid typing, old results stay visible */}
      <SlowList text={deferredText} />
    </div>
  );
}

// useDeferredValue vs useTransition
//
// useDeferredValue:
// - Defers a VALUE
// - Use when you don't control the state update
// - Good for values coming from props or external sources
//
// useTransition:
// - Defers a STATE UPDATE
// - Use when you control the state update
// - Provides isPending boolean

// useTransition example (you control the update)
function WithTransition() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value);  // Urgent
    startTransition(() => {
      setResults(search(e.target.value));  // Deferred
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results data={results} />
    </div>
  );
}

// useDeferredValue example (value from parent)
function ChildComponent({ searchTerm }) {
  // Can't control when parent updates searchTerm
  // But can defer our expensive re-render
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredData = useMemo(() => {
    return expensiveFilter(data, deferredSearchTerm);
  }, [deferredSearchTerm]);

  return <List items={filteredData} />;
}

// Initial value on first render
function Component({ value }) {
  // During initial render: deferredValue === value
  // During updates: deferredValue may lag
  const deferredValue = useDeferredValue(value);

  // On first render, always shows current value
  // No initial "flash" of undefined
  return <ExpensiveTree value={deferredValue} />;
}

// When to use useDeferredValue:
// ✅ Expensive child renders
// ✅ Value comes from props (can't use useTransition)
// ✅ Search/filter results
// ✅ Charts and visualizations
// ✅ Any UI that can show "stale" data briefly
```

---

## Answer Key Summary

| Level | Questions | Answers |
|-------|-----------|---------|
| **Beginner** | 1-12 | A, B, B, C, B, C, B, C, B, B, B, B |
| **Intermediate** | 13-26 | B, B, B, B, C, B, B, A, B, A, B, C, B, B, C |
| **Advanced** | 27-35 | B, B, B, B, A, B, B, B, B |
| **Expert** | 36-40 | C, B, C, B, B |

---

## Scoring Guide

- **36-40 correct**: Expert Level - You have deep React knowledge!
- **30-35 correct**: Advanced Level - Strong understanding of React
- **24-29 correct**: Intermediate Level - Good foundation, keep learning
- **18-23 correct**: Developing - Understand basics, focus on advanced topics
- **Below 18**: Beginner - Start with fundamentals and practice more

---

## Study Resources

1. **Official React Documentation**: https://react.dev
2. **React Hooks**: Focus on useState, useEffect, useContext, useMemo, useCallback
3. **Performance Optimization**: React.memo, useMemo, useCallback, Code Splitting
4. **Advanced Patterns**: HOCs, Render Props, Custom Hooks
5. **Modern Features**: Concurrent Features, Server Components, Suspense

Good luck with your React interviews!
