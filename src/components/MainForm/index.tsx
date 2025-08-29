import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTask';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionsTypes } from '../../contexts/TaskContext/task-actions';
import { Tips } from '../Tips';
import { showMessages } from '../../adapers/show-messages';
export function MainForm() {
  const { dispatch, state } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessages.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessages.warn('Digite uma tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: new Date().toISOString(),
      name: taskName,
      startDate: new Date().getTime(),
      duration: state.config[nextCycleType],
      completeDate: null,
      interuptDate: null,
      type: nextCycleType,
    };
    dispatch({
      type: TaskActionsTypes.START_TASK,
      payload: newTask,
    });

    showMessages.success('Tarefa iniciada');
  };

  const handleInterruptTask = () => {
    showMessages.dismiss();
    showMessages.error('Tarefa interrompida');
    dispatch({
      type: TaskActionsTypes.INTERRUPT_TASK,
    });
  };
  return (
    <form onSubmit={handleSubmitForm} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          type='text'
          id='myTask'
          placeholder='Digite uma tarefa'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className='formRow'>
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            type='submit'
            aria-label='Iniciar Nova Tarefa'
            title='Iniciar Nova Tarefa'
            icon={<PlayCircleIcon />}
          />
        )}
        {!!state.activeTask && (
          <DefaultButton
            color='red'
            aria-label='Interromper Tarefa atual'
            title='Interromper Tarefa atual'
            type='button'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
