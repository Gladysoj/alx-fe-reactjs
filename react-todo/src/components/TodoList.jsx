import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn JavaScript', completed: false },
        { id: 2, text: 'Build a project', completed: true },
        { id: 3, text: 'Write documentation', completed: false }
    ]);
    const [inputText, setInputText] = useState('');

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            addTodo(inputText);
            setInputText('');
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Add new todo"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            cursor: 'pointer',
                            margin: '10px 0'
                        }}
                    >
                        <span onClick={() => toggleTodo(todo.id)}>
                            {todo.text}
                        </span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{ marginLeft: '1rem' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
