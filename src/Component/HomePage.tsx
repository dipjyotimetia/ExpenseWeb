import React, { useState, useEffect } from 'react';
import {
    Input,
    Box,
    Flex,
    Stack,
    Divider,
    FormControl,
    FormLabel,
    Skeleton,
    ThemeProvider
} from '@chakra-ui/core'
import DatePicker from "react-datepicker";
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import "react-datepicker/dist/react-datepicker.css";
import { getExpense } from "../api/api";

const HomePage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const res = await getExpense('testtest@gmail.com');
        setData(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const Filter = () => {
        return (
            <select onChange={(e) => e.target.value}>
                <option value="">All</option>
                <option value="chicken">chicken</option>
                <option value="maida">maida</option>
                <option value="atta">atta</option>
            </select>
        )
    }
    const CustomColumn = ({ value }) => <span style={{ color: '#0000AA' }}>{value}</span>;
    const CustomHeading = ({ title }) => <span style={{ color: '#AA0000' }}>{title}</span>;

    return (
        <ThemeProvider>
            <Box textAlign="center" w={600} mx="auto" p={6} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="password">Expense Type</FormLabel>
                        <Input type='expenseType' id='expType' aria-describedby="password-helper-text" placeholder="Password" />
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
            <Flex>
                <Skeleton isLoaded={!loading}>
                <Griddle
                    components={{
                        Filter
                    }}
                    data={data}
                    plugins={[plugins.LocalPlugin]}
                >
                    <RowDefinition>
                        <ColumnDefinition id='expenseType' title='Expense Type' order={1} customComponent={CustomColumn} />
                        <Divider orientation="vertical" />
                        <ColumnDefinition id='expenseAmount' title='Expense Amount' order={2} customHeadingComponent={CustomHeading} />
                        <Divider orientation="vertical" />
                        <ColumnDefinition id='expenseDate' title='Expense Date' order={3} />
                    </RowDefinition>
                </Griddle>
                </Skeleton>
            </Flex>
        </ThemeProvider>
    )
}

export default HomePage;