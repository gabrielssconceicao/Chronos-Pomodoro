import { createContext } from 'react';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { intialTaskState } from './initialTaskState';
import type { TaskActionModel } from './task-actions';

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue: TaskContextProps = {
  state: intialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
