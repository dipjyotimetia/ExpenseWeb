import React from 'react';
import {
    ThemeProvider,
    Select
} from '@chakra-ui/core'
import { MdArrowDropDown } from "react-icons/all";

const HomePage = () => {

    return (
        <ThemeProvider>
            <Select icon={MdArrowDropDown} placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
        </ThemeProvider>
    )
}

export default HomePage;