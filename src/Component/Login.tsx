import React, { useState } from "react";
import {
    Heading,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    ButtonGroup,
    Divider,
    useToast,
    Box,
    Stack
} from '@chakra-ui/core'
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const api = axios.create({
        baseURL: 'https://bhsceu01z1.execute-api.ap-southeast-2.amazonaws.com/dev',
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });

    const response = async () => {
        const res = await api.post("/users/login", JSON.stringify({ email, password }));
        return res.status;
    };

    const registration = () => {
        history.push('/registration');
    }

    const login = () => {
        if (response()) {
            toast({
                title: "Logging in.",
                description: "You are now logging to your account.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            history.push('/homepage')
        }
        else {
            console.log('error')
        }

    }

    // eslint-disable-next-line
    const wrongPassword = () => {
        toast({
            title: "Warning.",
            description: "This is a wrong password.",
            status: "warning",
            duration: 9000,
            isClosable: true,
        })
    }

    // eslint-disable-next-line
    const wrongAccount = () => {
        toast({
            title: "An error occurred.",
            description: "Unable to create user account.",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <Box textAlign="center" w={600} mx="auto" p={6} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
            <Heading as="h1" size="xl" textAlign="match-parent">
                Expense
            </Heading>
            <Stack spacing={4}>
                <FormLabel alignContent='center' >
                    <FormControl isRequired>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Input type='email' id='email' aria-describedby="email-helper-text" placeholder="Email Address" onChange={event => setEmail(event.target.value)} />
                        <FormHelperText id="email-helper-text">
                            We'll never share your email.
                    </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input type='password' id='password' aria-describedby="password-helper-text" placeholder="Password" onChange={event => setPassword(event.target.value)} />
                    </FormControl>
                </FormLabel>
            </Stack>
            <Divider />
            <ButtonGroup spacing={10}>
                <Button variantColor='teal' onClick={login} >Login</Button>
                <Button variantColor='teal' onClick={registration}>Sign Up</Button>
            </ButtonGroup>
        </Box>
    )
}

export default Login;