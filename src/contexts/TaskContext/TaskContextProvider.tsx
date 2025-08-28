import { useEffect, useReducer } from 'react';
import { intialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './task-reducer';
import { TimerWorkerManager } from '../../workers/timer-worker-manager';

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, intialTaskState);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    //e.data = seconds
    const countDownSeconds = e.data;
    console.log(countDownSeconds);

    if (countDownSeconds <= 0) {
      console.log('Worker Completed: terminado por tempo esgotado');
      worker.terminate();
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      console.log('Worker: terminado por falta de active task');
    }
    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
