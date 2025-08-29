import { useEffect, useReducer, useRef } from 'react';
import { intialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './task-reducer';
import { TimerWorkerManager } from '../../workers/timer-worker-manager';
import { TaskActionsTypes } from './task-actions';
import { loadBeep } from '../../utils/loadBeep';

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, intialTaskState);

  const playBeep = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    //e.data = seconds
    const countDownSeconds = e.data;
    if (countDownSeconds <= 0) {
      if (playBeep.current) {
        playBeep.current();
        playBeep.current = null;
      }
      dispatch({
        type: TaskActionsTypes.COMPLETE_TASK,
      });

      worker.terminate();
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }
    document.title = `${state.formatedSecondsRemaining} - Chronos Pomodoro`;
    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeep.current === null) {
      playBeep.current = loadBeep();
    } else {
      playBeep.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
