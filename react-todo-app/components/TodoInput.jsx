import { useState } from 'react';

function TodoInput({ onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({
            title: title.trim(),
            description: description.trim(),
        });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                rows={2}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoInput;
