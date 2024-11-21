/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../redux/async/todosSlice';
import { v4 as uuidv4 } from 'uuid';

const TodoInput = () => {
  const dispatch = useDispatch();
  const { isUpdate, todo, loading, clearCurrentTodo } = useSelector((state) => state.todos);
  const [text, setText] = useState('');
  const { language } = useSelector((state) => state.language);

  useEffect(() => {
    if (isUpdate && todo) {
      setText(todo.text);
    } else {
      setText('');
    }
  }, [isUpdate, todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (isUpdate) {
      dispatch(updateTodo({ ...todo, text }, clearCurrentTodo)).then(() => {});
    } else {
      dispatch(addTodo({ id: uuidv4(), text, completed: false }));
    }

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className='input-group mb-3'>
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='form-control' placeholder='Add a new task...' required disabled={loading} />
      <button type='submit' className={`btn ${isUpdate ? 'btn-warning' : 'btn-primary'}`}>
        {isUpdate ? (language === 'en' ? 'Save' : 'Simpan') : language === 'en' ? 'Add' : 'Tambah'}
      </button>
    </form>
  );
};

export default TodoInput;
