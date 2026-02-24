import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [nextId, setNextId] = useState(1);

    const addTodo = ({ title, description }) => {
        setTodos([...todos, { id: nextId, title, description }]);
        setNextId(nextId + 1);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="app">
            <h1>Todo App</h1>
            <TodoInput onAdd={addTodo} />
            <TodoList todos={todos} onDelete={deleteTodo} />
        </div>
    );
}

export default App;
