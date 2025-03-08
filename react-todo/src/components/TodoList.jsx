import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { text: 'Learn React', completed: false },
    { text: 'Build a todo app', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            role="listitem"
            onClick={() => toggleTodo(index)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        data-testid="todo-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button data-testid="add-button" onClick={addTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoList;
