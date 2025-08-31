import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { CountDoown } from '../../components/CountDoown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';

export function Home() {
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);
  return (
    <MainTemplate>
      <Container>
        <CountDoown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}
