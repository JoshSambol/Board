import { Textarea, Button, Group, ActionIcon } from '@mantine/core';
import { FaArrowUp } from "react-icons/fa6"; // Updated to fa6 version
import { useState } from 'react';

function MessageInput( {onMessageSubmit} ) {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit if text is not empty and under 500 chars
    if (messageText.trim() && messageText.length <= 1000) {
      onMessageSubmit({
        sender: 'user',
        message: messageText
      });
      setMessageText('');
    }
  };

  const handleTestMessage = () => {
    onMessageSubmit({
      sender: 'other',
      text: 'Test message',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        placeholder="Type your message..."
        value={messageText}
        error={messageText.length > 1000 ? "Character limit exceeded (1000 max)" : null}
        styles={(theme) => ({
          input: {
            backgroundColor: 'black',
            height: '1rem',
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'monospace',
            borderRadius: theme.radius.xl,
          },
        })}
        onChange={(e) => setMessageText(e.target.value)}
        rightSection={
          <ActionIcon 
            color="#0800ff" 
            type="submit" 
            variant="filled"
            radius="xl"
            size="md"
            disabled={messageText.length > 500}
          >
            <FaArrowUp size={16} />
          </ActionIcon>
        }
      />
      <Button
        variant="filled"
        color="#0800ff"
        onClick={handleTestMessage}
      >
        Test other message
      </Button>

    </form>
  );
}

export default MessageInput;