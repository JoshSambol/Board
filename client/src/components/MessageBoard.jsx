import { Box, Text, Stack, ScrollArea, ActionIcon, Loader, Center, Anchor, Paper } from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import MessageInput from './MessageInput';
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaChevronDown } from "react-icons/fa";
// websocket = new WebSocket("wss://board-veg6.onrender.com/messages", "protocolOne")
function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchMessages = async()=>{
    setIsLoading(true);
    await axios.get('https://board-veg6.onrender.com/messages')
      .then((response) =>{
        console.log(response.data)
        setMessages(response.data)
        setIsLoading(false);
      })
      .catch((error) =>{
        console.log('Error fetching messages: ', error)
        setIsLoading(false);
      })
  }
  const handleMessageSubmit = async (message) => {
    console.log(message)
    const SMS = {
      message: message.message
    }
    await axios.post('https://board-veg6.onrender.com/messages', SMS)
    .then((response) =>{
      console.log(response.data)
      setMessages([...messages, message]);
    })
    .catch((error) =>{
      console.log('Error posting messages: ', error)
    })
  };
  useEffect(() =>{
    fetchMessages()
    
    const ws = new WebSocket('ws://localhost:3000')
    ws.onmessage = (event) => {
      const {type} = JSON.parse(event.data)
      if (type === 'refresh') {
        fetchMessages()
      }
    }

    // Add polling interval
    const pollInterval = setInterval(() => {
      fetchMessages();
    }, 10000); // Poll every 10 seconds

    // Initial scroll to bottom
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    // Cleanup WebSocket, polling interval, and any pending timeouts
    return () => {
      ws.close();
      clearInterval(pollInterval);
    }
  }, []);

  // Add effect to scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const viewport = useRef();
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () =>
    viewport.current?.scrollTo({ top: viewport.current?.scrollHeight, behavior: 'smooth' });

  const handleScroll = () => {
    if (viewport.current) {
      const { scrollHeight, scrollTop, clientHeight } = viewport.current;
      const isScrolledToBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
      setShowScrollButton(!isScrolledToBottom);
    }
  };

  return (
    <Box style={{ width: '100%', height: '100%'}}>
      <Text
        order={1}
        align="center"
        mb={30}
        fw={900}
        fz={50}
        fontSize="10rem"
        variant="gradient"
        gradient={{ from: '#0800ff', to: '#4dafff', deg: 45 }}
        sx={(theme) => ({
          textShadow: theme.shadows.glow,
        })}
      >
       OpenBoard
      </Text>
      <Text color="gray" size="sm" align="center">
        Total messages: {messages.length}
      </Text>
      <Stack spacing="xl">
        <ScrollArea.Autosize 
          mah="50vh" 
          viewportRef={viewport}
          onScrollPositionChange={handleScroll}
          styles={{
            root: { position: 'relative' }
          }}
          scrollbarSize={8}
        >
          {messages.length > 0 ? (
            messages.map((m) =>(
              <Message message={m} />
            ))
          ) : (
            <Center>
              {isLoading ? (
                <Stack align="center" spacing="xs">
                  <Loader size="md" color="#0800ff" />
                  <Text>Database starting, be patient...</Text>
                </Stack>
              ) : (
                <Text>No Messages Yet!</Text>
              )}
            </Center>
          )}
        </ScrollArea.Autosize>
        <MessageInput onMessageSubmit={(message) => {
          handleMessageSubmit(message);
        }} />
        <Paper p="md" radius="md" withBorder style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <Stack spacing="xs">
            <Text size="sm" c="dimmed" ta="center">
              A full-stack, open-source, fully anonymous message board application.
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Built with{' '}
              <Anchor href="https://react.dev" target="_blank" c="#0800ff">React</Anchor>,{' '}
              <Anchor href="https://nodejs.org" target="_blank" c="#0800ff">Node.js</Anchor>,{' '}
              <Anchor href="https://expressjs.com" target="_blank" c="#0800ff">Express</Anchor>,{' '}
              <Anchor href="https://www.mongodb.com" target="_blank" c="#0800ff">MongoDB</Anchor>,{' '}
              <Anchor href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank" c="#0800ff">WebSocket</Anchor>, and{' '}
              <Anchor href="https://mantine.dev" target="_blank" c="#0800ff">Mantine</Anchor>.
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              View the source code on{' '}
              <Anchor href="https://github.com/JoshSambol/Board" target="_blank" c="#0800ff">
                GitHub
              </Anchor>
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export default MessageBoard;