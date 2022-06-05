import React, {FC, useState} from 'react';
import classes from "./Dropdown.module.css";
import DropdownButton from "./dropdown-button/DropdownButton";

interface DropdownProps{
    header: string;
}

const Dropdown:FC<DropdownProps> = ({header, children}) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    return (
        <div className={classes.dropdown}>
            <DropdownButton
                onClick={()=>setIsActive(!isActive)}
            >
                {header}
            </DropdownButton>
            {
                isActive && (<div className={classes.dropdown__content}>
                    {children}
                </div>)
            }
        </div>
    );
};

export default Dropdown;