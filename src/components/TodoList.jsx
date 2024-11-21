import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, fetchTodos, currentTodo } from '../redux/async/todosSlice';

const TodoList = () => {
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const { todos, loading, error, isSuccess } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos());
    }
  }, [isSuccess]);

  if (todos.length === 0) {
    return (
      <div className='alert alert-secondary' role='alert'>
        A simple secondary alert—check it out!
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className='list-group'>
      {todos.map((todo) => (
        <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-secondary' : ''}`} onClick={() => dispatch(toggleTodo(todo.id))}>
          <span
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}>
            {todo.text}
          </span>
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(currentTodo(todo));
              }}
              className='btn btn-warning btn-sm me-2'>
              {language === 'en' ? 'Edit' : 'Ubah'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteTodo(todo.id));
              }}
              className='btn btn-danger btn-sm'>
              {language === 'en' ? 'Delete' : 'Hapus'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
