import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTask';
import { formatDate } from '../../utils/format-date';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useState } from 'react';
export function History() {
  const { state } = useTaskContext();
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        direction: 'desc',
        field: 'startDate',
      };
    }
  );

  function handleSortTaks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'asc' ? 'desc' : 'asc';
    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              color='red'
              icon={<TrashIcon />}
              aria-label='Apagar todao o histórico'
              title='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>
      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  className={styles.thSort}
                  onClick={() => handleSortTaks({ field: 'name' })}>
                  Tarefa ↕
                </th>
                <th
                  className={styles.thSort}
                  onClick={() => handleSortTaks({ field: 'duration' })}>
                  Duração ↕
                </th>
                <th
                  className={styles.thSort}
                  onClick={() => handleSortTaks({ field: 'startDate' })}>
                  Data ↕
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortTasksOptions.tasks.map((task) => {
                const taskTypeDict = {
                  workTime: 'Foco',
                  shortBreakTime: 'Descanso curto',
                  longBreakTime: 'Descanso longo',
                };
                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDict[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
