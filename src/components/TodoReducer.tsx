interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface State {
  tasks: Task[];
}

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'FILTER_ALL' }
  | { type: 'FILTER_ACTIVE' }
  | { type: 'FILTER_COMPLETED' };

export const initialState: State = {
  tasks: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed),
      };
   case 'FILTER_ACTIVE':
  return {
    ...state,
    tasks: state.tasks.map(task =>
      task.completed ? { ...task, hidden: true } : { ...task, hidden: false }
    ),
  };

  case 'FILTER_COMPLETED':
  return {
    ...state,
    tasks: state.tasks.map(task =>
      !task.completed ? { ...task, hidden: true } : { ...task, hidden: false }
    ),
  };

case 'FILTER_ALL':
  return {
    ...state,
    tasks: state.tasks.map(task => ({ ...task, hidden: false })),
  };

    default:
      return state;
  }
};