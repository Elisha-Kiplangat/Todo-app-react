interface Joke {
  id: number;
  joke: string;
  rate: number;
}

type Action =
  | { type: 'ADD_JOKE'; payload: string }
  | { type: 'UPDATE_RATE'; payload: { id: number; rate: number } }
  | { type: 'DELETE_JOKE'; payload: number };

export const jokesReducer = (state: Joke[], action: Action): Joke[] => {
  switch (action.type) {
    case 'ADD_JOKE':
      const newJoke: Joke = {
        id: state.length + 1,
        joke: action.payload,
        rate: 0
      };
      return [...state, newJoke];
    case 'UPDATE_RATE':
      return state.map((joke) =>
        joke.id === action.payload.id ? { ...joke, rate: action.payload.rate } : joke
      );
    case 'DELETE_JOKE':
      return state.filter((joke) => joke.id !== action.payload);
    default:
      return state;
  }
};