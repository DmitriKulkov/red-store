import React, {FC} from 'react';
import classes from "./LoginButton.module.css";

const LoginButton: FC = ({children}) => {
    return (
        <button className={classes.login}>
            {children}
        </button>
    );
};

export default LoginButton;