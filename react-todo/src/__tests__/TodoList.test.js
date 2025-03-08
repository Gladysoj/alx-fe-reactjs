import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import TodoList from '../components/TodoList';

test('renders initial todos', () => {
    const { getByText } = render(<TodoList />);
    expect(getByText('Learn React')).toBeInTheDocument();
    expect(getByText('Build a todo app')).toBeInTheDocument();
});

test('adds a new todo', () => {
  const { getByTestId, getByText } = render(<TodoList />);
  const input = getByTestId('todo-input');
  const addButton = getByTestId('add-button');

  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(addButton);

  expect(getByText('New Todo')).toBeInTheDocument();
});

test('toggles todo completion', () => {
  const { getByText } = render(<TodoList />);
  const todo = getByText('Learn React');

  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: line-through');

  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: none');
});

test('deletes a todo', () => {
  const { getByText, queryByText } = render(<TodoList />);
  const todo = getByText('Learn React');
  const deleteButton = todo.nextSibling;

  fireEvent.click(deleteButton);
  expect(queryByText('Learn React')).not.toBeInTheDocument();
});
