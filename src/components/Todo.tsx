import './Todo.scss';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  hidden?: boolean;
}

interface TodoProps {
  tasks: Task[];
  handleAll: () => void;
  handleActive: () => void;
  handleCompleted: () => void;
  handleClearCompleted: () => void;
  dispatch: React.Dispatch<any>;
}

const Todo = ({
  tasks,
  handleAll,
  handleActive,
  handleCompleted,
  handleClearCompleted,
  dispatch,
}: TodoProps) => {
  if (!Array.isArray(tasks)) {
    console.error('Tasks is not an array', tasks);
    return null;
  }

  const handleToggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <div className="todos">
      <div className="tasks">
        {tasks.filter(task => !task.hidden).map((task) => (
          <div key={task.id} className={`list ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <p className={task.completed ? 'completed-text' : ''}>{task.text}</p>
            <button className="deleteBtn" onClick={() => handleDelete(task.id)}>X</button>
          </div>
        ))}
      </div>
      <div className="controls">
        <p>{tasks.filter(task => !task.completed && !task.hidden).length} items left</p>
        <button onClick={handleAll}>All</button>
        <button onClick={handleActive}>Active</button>
        <button onClick={handleCompleted}>Completed</button>
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
};

export default Todo;
