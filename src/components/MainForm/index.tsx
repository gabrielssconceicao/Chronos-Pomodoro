import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTask';

export function MainForm() {
  const { setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
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
      duration: 1,
      completeDate: null,
      interuptDate: null,
      type: 'workTime',
    };

    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: 1,
        secondsRemaining,
        formatedSecondsRemaining: '00:00',
        tasks: [...prevState.tasks, newTask],
        config: { ...prevState.config },
      };
    });
  };

  return (
    <form onSubmit={handleSubmitForm} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          type='text'
          id='input'
          placeholder='Digite uma tarefa'
          ref={taskNameInput}
        />
      </div>
      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
