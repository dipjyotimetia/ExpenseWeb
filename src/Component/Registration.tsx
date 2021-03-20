//@ts-nocheck
import React, { useState } from "react";
import {
    FormControl, FormLabel, FormErrorMessage, Input,
    Divider, ButtonGroup, Button, useToast, Select,
    FormHelperText, Box, Stack
} from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registration } from "../api/api";

const Registration = () => {

    const toast = useToast();
    const history = useHistory();
    const { errors, register } = useForm();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateName = (value) => {
        let error;
        if (!value) {
            error = "Name is required";
        } else if (value !== "test") {
            error = "Jeez! You're not a fan 😱";
        }
        return error || true;
    }

    const handleSignup = async () => {
        try {
            setLoading(true);
            const response = await registration({ firstName, lastName, username, email, password });
            if (response & response.user) {
                setLoading(false);
                toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                })
            }
        } catch (error) {
            toast({
                title: "Warning.",
                description: "User account already exist",
                status: "warning",
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const handleLogin = () => {
        history.push('/');
    }

    return (
        <Box textAlign="center" w={600} mx="auto" p={6} m="20px auto" bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
            <FormLabel>
                <Stack spacing={4}>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel htmlFor="Username">Username</FormLabel>
                        <Input type="text" placeholder="Username" name="Username" ref={register({ required: true, maxLength: 80, validate: validateName })} onChange={e => setUsername(e.target.value)} />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel htmlFor="First Name">First name</FormLabel>
                        <Input type="text" placeholder="First name" name="First name" ref={register({ required: true, maxLength: 80, validate: validateName })} onChange={e => setFirstName(e.target.value)} />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel htmlFor="Last Name">Last name</FormLabel>
                        <Input type="text" placeholder="Last name" name="Last name" ref={register({ required: true, maxLength: 100 })} onChange={e => setLastName(e.target.value)} />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input type="text" placeholder="Email" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} onChange={e => setEmail(e.target.value)} />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                        <FormHelperText id="email-helper-text">
                            We'll never share your email.
                    </FormHelperText>
                    </FormControl>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel htmlFor="mobile">Mobile No</FormLabel>
                        <Input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({ required: true, minLength: 6, maxLength: 12 })} onChange={e => setPassword(e.target.value)} />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <Select name="Title" ref={register({ required: true })}>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Dr">Dr</option>
                        </Select>
                    </FormControl>
                    <Divider />
                    <ButtonGroup spacing={10}>
                        <Button isLoading={loading} loadingText='Loggin In' colorScheme='teal' variant='outline' onClick={handleLogin}>Already have account?</Button>
                        <Button colorScheme='teal' variant='outline' onClick={handleSignup}>Register Account</Button>
                    </ButtonGroup>
                </Stack>
            </FormLabel>
        </Box>
    )
}

export default Registration;