import { Box, Blockquote } from '@mantine/core';

function Message( { message} ) {
    return (
        <Box>
            
                <Blockquote 
                    key={message._id}
                    color={message.sender === 'user' ? '#1a31db' : 'gray'} 
                    mt="md"
                    styles={{
                        root: {
                            color: 'white',
                            minHeight: 'fit-content',
                            maxWidth: '100%',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            padding: message.text.length < 50 ? '0.5rem' : '1rem'
                        }
                    }}
                >
                    {message.text}
                </Blockquote>
        </Box>
    )
}

export default Message;