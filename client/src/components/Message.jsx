import { Box, Blockquote } from '@mantine/core';

function Message( {message} ) {
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
                            padding: '1rem' 
                        }
                    }}
                >
                    {message.message}
                </Blockquote>
        </Box>
    )
}

export default Message;