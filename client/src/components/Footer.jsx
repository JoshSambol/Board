import { Box, Container, Text, useMantineTheme, Group } from "@mantine/core"
import './Footer.css'
function FooterComponent(){
    const theme = useMantineTheme()
    return(
        <>
        <Box className="box" style={{textAlign: 'center', backgroundColor: '#050b24', color: theme.white, padding: '20px' }}>
            <Container>
                <Group align="center" position="center">
                <Text size="sm" align="center">
                    © {new Date().getFullYear()} <a href="https://www.Joshuasambol.com">Joshua Sambol</a>. All rights reserved.
                </Text>
                </Group>
            </Container>
        </Box>
        </>
    )
}
export default FooterComponent;