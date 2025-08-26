import { useRef } from 'react';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTask';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionsTypes } from '../../contexts/TaskContext/task-actions';

export function MainForm() {
  const { dispatch, state } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycleType = getNextCycleType(state.currentCycle);
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Digite uma tarefa');
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
  };

  const handleInterruptTask = () => {
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
        />
      </div>
      <div className='formRow'>
        <p>Próximo interfalo de 25 minutos</p>
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
