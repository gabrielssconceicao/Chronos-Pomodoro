import { useEffect, useReducer } from 'react';
import { intialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './task-reducer';

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, intialTaskState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
