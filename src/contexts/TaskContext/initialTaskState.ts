import type { TaskStateModel } from '../../models/TaskStateModel';

export const intialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formatedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 0,
    shortBreakTime: 0,
    longBreakTime: 0,
  },
};
