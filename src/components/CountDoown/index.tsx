import { useTaskContext } from '../../contexts/TaskContext/useTask';
import styles from './styles.module.css';

export function CountDoown() {
  const { state } = useTaskContext();
  return (
    <div className={styles.container}>{state.formatedSecondsRemaining}</div>
  );
}
