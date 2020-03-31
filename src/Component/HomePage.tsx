import React, { useState } from 'react';
import {
    Input,
    Box,
    Stack,
    FormControl,
    FormLabel
} from '@chakra-ui/core'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Box textAlign="center" w={600} mx="auto" p={6} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
            <Stack spacing={4}>
            <FormControl isRequired>
                <FormLabel htmlFor="password">Expense Type</FormLabel>
                <Input type='expenseType' id='expType' aria-describedby="password-helper-text" placeholder="Password"/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="password">Expense Amount</FormLabel>
                <Input type='expenseAmount' id='expAmount' aria-describedby="password-helper-text" placeholder="Password" />
            </FormControl>
            <FormLabel htmlFor="email">Expense Date</FormLabel>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                showPopperArrow={false}
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText="Expense Date"
            />
            </Stack>
        </Box>
    )
}

export default HomePage;