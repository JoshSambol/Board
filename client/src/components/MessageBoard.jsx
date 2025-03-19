import { Box, Text, Stack, ScrollArea, ActionIcon } from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import MessageInput from './MessageInput';
import Message from './Message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaChevronDown } from "react-icons/fa";

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const handleMessageSubmit = (message) => {
    setMessages([...messages, message]);
  };
  useEffect(() =>{
    axios.get('http://localhost:3000/api/messages')
      .then((response) =>{
        setMessages(response.sata)
      })
      .catch((error) =>{
        console.log('Error fetching messages: ', error)
      })
  }, []);
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
          messages.map((message) =>(
            <Message key={message._id}messages={messages} />
          ))
          ) : (
            <Text>No Messages Yet!</Text>
          )}
        </ScrollArea.Autosize>
        <MessageInput onMessageSubmit={(message) => {
          handleMessageSubmit(message);
          // Scroll to bottom whenever a new message is added
          setTimeout(() => {
            scrollToBottom();
          }, 50); // Small delay to ensure DOM is updated
        }} />
      </Stack>
    </Box>
  );
}

export default MessageBoard;