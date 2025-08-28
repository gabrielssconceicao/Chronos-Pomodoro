import { useEffect, useReducer } from 'react';
import { intialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './task-reducer';
import { TimerWorkerManager } from '../../workers/timer-worker-manager';
import { TaskActionsTypes } from './task-actions';

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
      dispatch({
        type: TaskActionsTypes.COMPLETE_TASK,
      });
      console.log('Worker Completed: terminado por tempo esgotado');
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    console.log(state);
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
