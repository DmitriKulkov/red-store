import React, { FC } from "react";
import classes from "./LoginButton.module.css";

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton: FC<LoginButtonProps> = ({ children }) => {
  return <button className={classes.login}>{children}</button>;
};

export default LoginButton;
