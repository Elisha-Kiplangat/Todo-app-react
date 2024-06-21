import './Todo.scss'

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProps {
  tasks: Task[];
  handleAll: () => void;
  handleActive: () => void;
  handleCompleted: () => void;
  handleClearCompleted: () => void;
  dispatch: React.Dispatch<any>;
}

export const Todo = ({
  tasks,
  handleAll,
  handleActive,
  handleCompleted,
  handleClearCompleted,
  dispatch,
}: TodoProps) => {
  const handleToggleTask = (id: number) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  return (
    <>
      <div className='todos'>
        <div className="tasks">
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <p>{task.text}</p>
          </div>
        ))}
      </div>
        <div className="controls">
        <p>{tasks.length} items left</p>
        <button onClick={handleAll}>All</button>
        <button onClick={handleActive}>Active</button>
        <button onClick={handleCompleted}>Completed</button>
        <button onClick={handleClearCompleted}>Clear Completed</button>

        </div>

      </div>
    
    </>
  )
}

export default Todo;
