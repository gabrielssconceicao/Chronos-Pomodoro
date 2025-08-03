import { useState } from 'react';
import { intialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskProviderProps) {
  const [state, setState] = useState(intialTaskState);
  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
