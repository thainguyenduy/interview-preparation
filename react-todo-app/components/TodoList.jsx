function TodoList({ todos, onDelete }) {
    if (todos.length === 0) {
        return <p className="empty">No todos yet!</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                    <div className="todo-content">
                        <h3>{todo.title}</h3>
                        {todo.description && <p>{todo.description}</p>}
                    </div>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
