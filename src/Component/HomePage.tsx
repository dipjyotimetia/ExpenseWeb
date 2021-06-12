//@ts-nocheck
import React, { useState, useEffect } from 'react';
import {
    Input, Box, Flex, Stack, Divider, FormControl, FormLabel, Skeleton,
    ThemeProvider, NumberInput, Slider, SliderTrack, SliderFilledTrack,
    SliderThumb, ButtonGroup, Button
} from '@chakra-ui/react'
import {
    Grid, makeStyles, Table, TableBody, TableCell, TableContainer, Typography,
    TableHead, TableRow, Paper, TablePagination, IconButton, AppBar, Toolbar
}
    from "@material-ui/core";
import ButtonPlace from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format'
import { useHistory } from "react-router-dom";
import { addExpense, getExpense, logout } from "../api/api";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        width: '200%',
    },
    container: {
        maxHeight: 650,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const columns = [
    { id: 'expenseType', label: 'Expense Type', minWidth: 170 },
    { id: 'expenseAmount', label: 'Expense Amount', minWidth: 100, format: (value) => value.toLocaleString(), },
    { id: 'expenseDate', label: 'Expense Date', minWidth: 100, format: (value) => value.toLocaleString(), }
];

const HomePage = () => {

    const [expenseDates, setExpenseDate] = useState(new Date());
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseType, setExpenseType] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const history = useHistory();
    const classes = useStyles();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const handleChange = (value) => setExpenseAmount(value);
    const handleDateChange = (date) => setExpenseDate(date);
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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

    const handleLogout = async ()=>{
        const res = await logout(token);
        if (res===200) {
            history.push('/');
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>
                    <ButtonPlace color="inherit" onClick={handleLogout}>Logout</ButtonPlace>
                </Toolbar>
            </AppBar>
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
                        <Button isLoading={loading} loadingText='Loading...' colorScheme='teal' variant='outline' onClick={handleExpense}>Add Expense</Button>
                    </ButtonGroup>
                </Stack>
            </Box>
            <Divider />
            <Flex align="center" justify="center">
                <Skeleton isLoaded={!loading} animation='wave' >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align='center'
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align='center'>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Skeleton>
            </Flex>
        </ThemeProvider>
    )
}

export default HomePage;