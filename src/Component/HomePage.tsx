import React, { useState, useEffect } from 'react';
import {
    Input, Box, Flex, Stack, Divider, FormControl, FormLabel, Skeleton,
    ThemeProvider, NumberInput, Slider, SliderTrack, SliderFilledTrack,
    SliderThumb, ButtonGroup, Button
} from '@chakra-ui/core'
import { Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { getExpense } from "../api/api";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const HomePage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    const handleChange = value => setValue(value);
    const handleDateChange = (date) => setStartDate(date);

    const fetchData = async () => {
        const res = await getExpense('testtest@gmail.com');
        setData(res);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <ThemeProvider>
            <Box textAlign="center" w={600} mx="auto" p={6} bg="white" border="1px solid" borderColor="gray.200" borderRadius="md">
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="password">Expense Type</FormLabel>
                        <Input type='expenseType' id='expType' aria-describedby="password-helper-text" placeholder="Expense Type" />
                    </FormControl>
                    <FormControl isRequired placeholder='Expense Amount'>
                        <NumberInput
                            maxW="100px"
                            mr="2rem"
                            value={value}
                            onChange={handleChange}
                        />
                        <Slider flex="1" value={value} onChange={handleChange}>
                            <SliderTrack />
                            <SliderFilledTrack />
                            <SliderThumb
                                fontSize="sm"
                                width="32px"
                                height="20px"
                                children={value}
                            />
                        </Slider>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Expense Date"
                                format="MM/dd/yyyy"
                                value={startDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Divider />
                    <ButtonGroup spacing={10}>
                        <Button isLoading={loading} loadingText='Loggin In' variantColor='teal' variant='outline'>Add Expense</Button>
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