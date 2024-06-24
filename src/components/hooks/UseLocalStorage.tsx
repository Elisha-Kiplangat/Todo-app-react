import { useEffect, useState } from "react"
import {State} from "../../components/TodoReducer"


const UseLocalStorage = (key: string, initialState: State) => {
 {
  const getStoredTask = () => {
    const storedTask = localStorage.getItem(key);
    return storedTask ? JSON.parse(storedTask) : initialState;
  };

  const [value, setValue] = useState(getStoredTask);

 
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);


  return [value, setValue] as const;
}
}

export default UseLocalStorage
