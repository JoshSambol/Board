import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
    theme={{
    colorScheme: 'dark',
    components: {
      AppShell: {
        styles: (theme) => ({
          main: { backgroundColor: theme.colors.dark[8] },
        }),
      },
    },
    }}
    >

      <Notifications />
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,  
)
