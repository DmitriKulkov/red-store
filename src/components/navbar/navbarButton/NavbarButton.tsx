import React, {FC} from 'react';
import classes from './NavbarButton.module.css'
import {Link} from "react-router-dom";

interface NavbarButtonProps{
    link: string;
}

const NavbarButton: FC<NavbarButtonProps> = ({link, children}) => {
    return (
        <Link to={link} className={classes.link}>
            <button className={classes.navbar__button}>
                {children}
            </button>
        </Link>

    );
};

export default NavbarButton;