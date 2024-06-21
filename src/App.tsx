// import { useState } from 'react'

import './App.scss'
import Todo from './components/Todo'
import image from '../assets/icon-sun.svg'

import { useReducer, useState } from 'react';

function App() {
 
  interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
}

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'FILTER_ALL' }
  | { type: 'FILTER_ACTIVE' }
  | { type: 'FILTER_COMPLETED' };

const initialState: State = {
  tasks: [],
};

  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim()) {
      dispatch({ type: 'ADD_TASK', payload: task });
      setTask('');
    }
  };

  // const handleToggleTask = (id: number) => {
  //   dispatch({ type: 'TOGGLE_TASK', payload: id });
  // };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const handleAll = () => {
    dispatch({ type: 'FILTER_ALL' });
  };

  const handleActive = () => {
    dispatch({ type: 'FILTER_ACTIVE' });
  };

  const handleCompleted = () => {
    dispatch({ type: 'FILTER_COMPLETED' });
  };



  return (
    <>
     
      <div className="App">
        <div className="container">
          <div className="header">
            <h1>TODO</h1>
            <img src={image} alt="sun" />
          </div>
          <div className="inputs">
            <input type="checkbox" name="check" onClick={handleAdd} />
            <input type="text" placeholder="Create a new todo..."/>
          </div>
          <Todo 
          
          tasks={state.tasks}
          handleAll={handleAll}
          handleActive={handleActive}
          handleCompleted={handleCompleted}
          handleClearCompleted={handleClearCompleted}
          dispatch={dispatch}
        
          />
        </div>
      </div>
    </>
  )
}

export default App
