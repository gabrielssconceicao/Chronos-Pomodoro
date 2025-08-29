import './styles/theme.css';
import './styles/global.css';

import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './contexts/MessagesContainer';
import { MainRouter } from './Routers';

function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}

export default App;
