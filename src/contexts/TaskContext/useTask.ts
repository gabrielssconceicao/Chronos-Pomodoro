import { useContext } from 'react';
import { TaskContext } from './TaskContext';

export function useTaskContext() {
  const context = useContext(TaskContext);
  return context;
}
