import { Container, AppShell, AppShellFooter } from '@mantine/core';
import MessageBoard from './components/MessageBoard';
import MessageInput from './components/MessageInput';
import FooterComponent from './components/Footer';
import axios from 'axios';
import { useEffect } from 'react';



function App() {
  return (
      <AppShell height="100vh" padding="10px" margin="0" border="none">
          <AppShell.Main>
            <MessageBoard />
          </AppShell.Main>
          <AppShellFooter>
            <FooterComponent />
          </AppShellFooter>
      </AppShell>
  );
}

export default App;