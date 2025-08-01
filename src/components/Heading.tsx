import styles from './Heading.module.css';
interface HeadingProps {}
export function Heading(props: HeadingProps) {
  return <h1 className={styles.heading}>Heading</h1>;
}
