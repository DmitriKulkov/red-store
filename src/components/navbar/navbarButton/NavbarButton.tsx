import React, {FC, MouseEventHandler} from 'react';
import classes from './NavbarButton.module.css'
import {Link} from "react-router-dom";

interface NavbarButtonProps{
    link: string;
    onClick: MouseEventHandler<HTMLButtonElement>
}

const NavbarButton: FC<NavbarButtonProps> = ({link, children, onClick}) => {
    return (
        <Link to={link} className={classes.link}>
            <button onClick={onClick} className={classes.navbar__button}>
                {children}
            </button>
        </Link>

    );
};

export default NavbarButton;