import React from 'react'
import classes from "./Navbar.module.css"
import NavbarButton from "./navbarButton/NavbarButton";
import Search from "../search-bar/Search";
import LoginButton from "./loginButton/LoginButton";
import logo from "./logo.png"
import {Link} from "react-router-dom";

const Navbar = () => {

    return (
        <header className={classes.navbar}>
            <div className={classes.headbar}>
                <img src={logo} className={classes.logo} alt='logo'/>
                <Link to={'/home'} className={classes.headbar__link}>
                    <h1 className={classes.headbar__h1}>RedShop</h1>
                </Link>
            </div>
            <nav className={classes.buttonbar}>
                <div className={classes.buttons__container}>
                    <div className={classes.buttons}>
                        <NavbarButton link={'/search'}>New!</NavbarButton>
                        <NavbarButton link={'/search'}>Clothes</NavbarButton>
                        <NavbarButton link={'/search'}>Shoes</NavbarButton>
                        <NavbarButton link={'/search'}>Collections</NavbarButton>
                    </div>
                    <div className={classes.search__container}>
                        <Search/>
                    </div>
                    <div className={classes.login_buttons__container}>
                            <LoginButton>Log in</LoginButton>
                            <LoginButton>Sign in</LoginButton>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;