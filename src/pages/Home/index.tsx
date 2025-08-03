import { Container } from '../../components/Container';
import { CountDoown } from '../../components/CountDoown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';

export function Home() {
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
