import { useEffect, useReducer, useState } from 'react';
import './App.scss';
import Todo from './components/Todo';
import lightIcon from './assets/icon-sun.svg';
import darkIcon from './assets/icon-moon.svg';
import { reducer, initialState } from './components/TodoReducer';
import lightBg from './assets/bg-desktop-light.jpg';
import darkBg from './assets/bg-desktop-dark.jpg';
import UseLocalStorage from './components/hooks/UseLocalStorage';

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [taskStorage, setTaskStorage] = UseLocalStorage('tasks', initialState);
  const [state, dispatch] = useReducer(reducer, { tasks: taskStorage });

  useEffect(() => {
    setTaskStorage(state.tasks);
  }, [state.tasks, setTaskStorage]);


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

   const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Dynamically select background and icon based on the theme
  const backgroundImage = theme === 'light' ? lightBg : darkBg;
  const themeIcon = theme === 'light' ? lightIcon : darkIcon;


  return (
    <>
        <img src={backgroundImage} alt="" />
    <div className={`App ${theme}`}>
      <div className="container">
        <div className="header">
          <h1>TODO</h1>
          <button className='theme' onClick={handleTheme}>
          <img src={themeIcon} alt="sun" />
          </button>
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
