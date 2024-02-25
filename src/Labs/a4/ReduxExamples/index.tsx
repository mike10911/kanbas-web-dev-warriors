import React from 'react';
import { useSelector } from 'react-redux';
import { LabState } from '../../store';
import CounterRedux from './CounterRedux';
import AddRedux from './AddRedux';
import TodoList from './todos/TodoList';

const ReduxExamples = () => {
  const { message } = useSelector((state: LabState) => state.helloReducer);
  return (
    <div>
      <h1>Redux Examples</h1>
      <h2>{message}</h2>
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
};

export default ReduxExamples;
