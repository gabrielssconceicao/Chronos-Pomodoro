import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTask';
export function History() {
  const { state } = useTaskContext();
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
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {state.tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.duration}min</td>
                  <td>{new Date(task.startDate).toISOString()}</td>
                  <td>{task.interuptDate}</td>
                  <td>{task.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
