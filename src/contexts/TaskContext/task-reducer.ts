import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionsTypes, type TaskActionModel } from './task-actions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel {
  switch (action.type) {
    case TaskActionsTypes.START_TASK: {
      // setState((prevState) => {
      //   return {
      //     ...prevState,
      //     activeTask: newTask,
      //     currentCycle: nextCycle,
      //     secondsRemaining,
      //     formatedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
      //     tasks: [...prevState.tasks, newTask],
      //     config: { ...prevState.config },
      //   };
      // });
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formatedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
        config: { ...state.config },
      };
    }
    case TaskActionsTypes.INTERRUPT_TASK:
      return state;
    case TaskActionsTypes.RESET_STATE:
      return state;
  }
}
