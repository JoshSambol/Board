import { Container, AppShell } from '@mantine/core';
import MessageBoard from './components/MessageBoard';
import MessageInput from './components/MessageInput';
function App() {
  return (
      <AppShell height="100vh" padding="10px" margin="0" border="none">
          <AppShell.Main>
            <MessageBoard />
          </AppShell.Main>
      </AppShell>
  );
}

export default App;