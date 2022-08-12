import React, {FC, useState} from 'react';
import classes from "./FilterDropdown.module.css";
import {IconButton} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";

interface FilterDropdownProps{
    className?: string
}

const FilterDropdown:FC<FilterDropdownProps> = ({className, children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className={classes.filters__menu + " " + className}>
            <IconButton
                aria-label="filters"
                onClick={()=>{setIsOpen(!isOpen)}}
            >
                <KeyboardArrowDown sx={{fontSize: "40px", color: "#686868"}}/>
            </IconButton>
            <div className={classes.filters__menu__window} style={isOpen?{display:"block"}:{display:"none"}}>
                {children}
            </div>
        </div>
    );
};

export default FilterDropdown;