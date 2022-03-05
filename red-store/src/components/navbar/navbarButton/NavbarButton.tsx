import React, {FC} from 'react';
import classes from './NavbarButton.module.css'



const NavbarButton: FC = ({children}) => {
    return (
        <button className={classes.navbar__button}>
            {children}
        </button>
    );
};

export default NavbarButton;