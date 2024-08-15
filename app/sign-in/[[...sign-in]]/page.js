import { SignIn } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography,Button, Box,Link } from "@mui/material";

export default function signinpage(){
    return (
        <Container
        maxWidth="100vw"
        
        >
            <AppBar position="static" sx={{backgroundColor: "#3f51b5"}}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow:1}}>
                        Flashcard SaaS
                        
                    </Typography>
                    <Button color="inherit" href="/sign-in">
                        Login
                    </Button>

                    <Button color="inherit" href="/sign-in">
                        Sign Up


                    </Button>
                    
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">

                    <Typography variant="h4" gutterBottom>
                        Sign In
                    </Typography>
                    <SignIn/>
            </Box>

            
            
        </Container>
    )
}