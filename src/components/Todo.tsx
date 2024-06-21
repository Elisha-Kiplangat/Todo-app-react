import './Todo.scss'



export const Todo = () => {
  return (
    <>
      <div className='todos'>
        <div className="tasks">
        <input type="checkbox" name="check"/>
        <p>{task}</p>
        </div>
        <div className="controls">
        <p>{task.length} items left</p>
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
