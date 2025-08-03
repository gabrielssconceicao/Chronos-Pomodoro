import { Container } from '../../components/Container';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>404</h1>
        <p>Página não encontrada</p>
      </Container>
    </MainTemplate>
  );
}
