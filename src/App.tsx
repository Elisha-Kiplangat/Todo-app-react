import { useReducer, useState } from 'react';
import './App.scss';
import Todo from './components/Todo';
import image from './assets/icon-sun.svg';
import { reducer, initialState } from './components/TodoReducer';
import bg from './assets/bg-desktop-light.jpg';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim()) {
      dispatch({ type: 'ADD_TASK', payload: task });
      setTask('');
    }
  };

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
        <img src={bg} alt="" />
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>TODO</h1>
          <img src={image} alt="sun" />
        </div>
        <div className="inputs">
          <input type="checkbox" name="check" onClick={handleAdd} />
          <input
            type="text"
            placeholder="Create a new todo..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                dispatch({ type: 'ADD_TASK', payload: e.currentTarget.value.trim() });
                e.currentTarget.value = '';
                setTask('')
              }
            }
          }
          />
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
  );
};

export default App;
