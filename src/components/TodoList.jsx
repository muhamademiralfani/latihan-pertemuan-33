import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, currentTodo, deleteTodo, updateTodo } from '../redux/slices/todosSlice';

const TodoList = () => {
  const { language, todos, loading, error, isSuccess } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (todos.length === 0) {
  //   return (
  //     <div className='alert alert-secondary' role='alert'>
  //       No todos available.
  //     </div>
  //   );
  // }

  return (
    <ul className='list-group'>
      {todos.map((todo) => (
        <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-secondary' : ''}`}>
          <span
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
            onClick={() => dispatch(toggleTodo(todo.id))}>
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
