import React, { useState } from "react";
import {
    Heading, FormControl, FormLabel, FormHelperText,
    Input, Button, ButtonGroup, Divider, useToast,
    Box, Stack, Alert, AlertIcon, ThemeProvider
} from '@chakra-ui/core'
import { useHistory } from "react-router-dom";
import { getLogin } from "../api/api";

const Login = () => {

    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSignup = () => {
        history.push('/registration');
    }

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await getLogin({ email, password });
            if (response && response.user) {
                successToast();
                history.push('/homepage');
                localStorage.setItem('user', email);
                localStorage.setItem('token', response.token);
                setLoading(false);
            }
        } catch (error) {
            wrongPassword();
            setLoading(false);
        }
    }

    const successToast = () => {
        toast({
            title: "Logging in.",
            description: "You are now logging to your account.",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const wrongPassword = () => {
        toast({
            title: "Warning.",
            description: "This is a wrong username/password.",
            status: "warning",
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <ThemeProvider>
            <Alert status="info">
                <AlertIcon />
                    Expense is going live on August 30th. Get ready!
                </Alert>
            <Box textAlign="center" w={600} mx="auto" p={6} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
                <Heading as="h1" size="xl" textAlign="match-parent">
                    Expense
            </Heading>
                <Stack spacing={4}>
                    <FormLabel alignContent='center' >
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Input type='email' id='email' aria-describedby="email-helper-text" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
                            <FormHelperText id="email-helper-text">
                                We'll never share your email.
                    </FormHelperText>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input type='password' id='password' aria-describedby="password-helper-text" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </FormControl>
                    </FormLabel>
                </Stack>
                <Divider />
                <ButtonGroup spacing={10}>
                    <Button isLoading={loading} loadingText='Loading...' variantColor='teal' variant='outline' onClick={handleLogin} >Login</Button>
                    <Button variantColor='teal' variant='outline' onClick={handleSignup}>Sign Up</Button>
                </ButtonGroup>
            </Box>
        </ThemeProvider>
    )
}

export default Login;