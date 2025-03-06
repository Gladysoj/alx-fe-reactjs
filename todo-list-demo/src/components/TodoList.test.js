import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';


beforeEach(() => {
  render(<TodoList />);
});

describe('TodoList Component', () => {
  
  test('renders initial todos correctly', () => {
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a project')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('adds a new todo', () => {
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(input).toHaveValue(''); 
  });

  
  test('toggles todo completion status', () => {
    const todoText = screen.getByText('Learn React');
    const initialStyle = todoText.parentElement.style.textDecoration;

    
    fireEvent.click(todoText);
    expect(todoText.parentElement).toHaveStyle('text-decoration: line-through');

    
    fireEvent.click(todoText);
    expect(todoText.parentElement).toHaveStyle(`text-decoration: ${initialStyle}`);
  });

  
  test('deletes a todo', () => {
    const initialLength = screen.getAllByRole('listitem').length;
    const deleteButton = screen.getByTestId('delete-button-1');

    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(initialLength - 1);
  });
});
