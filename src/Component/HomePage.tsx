import React, { useState, useEffect } from 'react';
import {
    Input, Box, Flex, Stack, Divider, FormControl, FormLabel, Skeleton,
    ThemeProvider, NumberInput, Slider, SliderTrack, SliderFilledTrack,
    SliderThumb, ButtonGroup, Button
} from '@chakra-ui/core'
import { Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format'
import { addExpense, getExpense } from "../api/api";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const HomePage = () => {

    const [expenseDates, setExpenseDate] = useState(new Date());
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseType, setExpenseType] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();
    const username = 'testtest@gmail.com';

    const handleChange = (value) => setExpenseAmount(value);
    const handleDateChange = (date) => setExpenseDate(date);

    const handleExpense = async () => {
        setLoading(true);
        let expenseDate = format(expenseDates, 'dd/MM/yyyy');
        const response = await addExpense({ username, expenseType, expenseAmount, expenseDate })
        try {
            if (response && response.user) {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchData = async () => {
        const res = await getExpense(username);
        setData(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [loading])

    return (
        <ThemeProvider>
            <Box textAlign="center" w={600} mx="auto" p={6} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="password">Expense Type</FormLabel>
                        <Input type='expenseType' id='expType' aria-describedby="password-helper-text" onChange={e => setExpenseType(e.target.value)} placeholder="Expense Type" />
                    </FormControl>
                    <FormControl isRequired placeholder='Expense Amount'>
                        <NumberInput
                            maxW="100px"
                            mr="2rem"
                            value={expenseAmount}
                            onChange={handleChange}
                        />
                        <Slider flex="1" value={expenseAmount} onChange={handleChange}>
                            <SliderTrack />
                            <SliderFilledTrack />
                            <SliderThumb
                                fontSize="sm"
                                width="32px"
                                height="20px"
                                children={expenseAmount}
                            />
                        </Slider>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Expense Date"
                                format="dd/MM/yyyy"
                                value={expenseDates}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Divider />
                    <ButtonGroup spacing={10}>
                        <Button isLoading={loading} loadingText='Loading...' variantColor='teal' variant='outline' onClick={handleExpense}>Add Expense</Button>
                    </ButtonGroup>
                </Stack>
            </Box>
            <Divider />
            <Flex align="center" justify="center">
                <Skeleton isLoaded={!loading} animation='wave' >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Expense Type</TableCell>
                                    <TableCell align="right">Expense Amount</TableCell>
                                    <TableCell align="right">Expense Date&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.expenseType}
                                        </TableCell>
                                        <TableCell align="right">{row.expenseAmount}</TableCell>
                                        <TableCell align="right">{row.expenseDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Skeleton>
            </Flex>
        </ThemeProvider>
    )
}

export default HomePage;