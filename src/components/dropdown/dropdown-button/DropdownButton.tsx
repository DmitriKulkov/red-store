import React, {FC, MouseEventHandler} from 'react';
import classes from "../Dropdown.module.css";

interface FilterButtonProps{
    onClick?: MouseEventHandler
    onMouseEnter?: MouseEventHandler
    onMouseLeave?: MouseEventHandler
}

const DropdownButton:FC<FilterButtonProps> = ({onClick,
                                                  onMouseEnter,
                                                  onMouseLeave,
                                                  children}) => {
    return (
        <div className={classes.filter}>
            <span
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={classes.filter__button}
            >
                {children}
            </span>
        </div>
    );
}
export default DropdownButton;