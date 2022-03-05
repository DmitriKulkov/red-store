import React from 'react'
import classes from "./Navbar.module.css"
import NavbarButton from "./navbarButton/NavbarButton";
import Search from "../search/Search";
import LoginButton from "./loginButton/LoginButton";
import logo from "./i01_Background.png"

const Navbar = () => {

    return (
        <header className={classes.navbar}>
            <div className={classes.headbar}>
                <img src={logo} className={classes.logo} alt='logo'/>
                <h1 className={classes.headbar__h1}>RedShop</h1>
            </div>
            <nav className={classes.buttonbar}>
                <div style={{marginLeft: 'auto', marginRight: 'auto', height: '100%', display: 'flex'}}>
                    <div style={{display: 'inline-block', height: '100%', marginLeft: '250px'}}>
                        <NavbarButton>New!</NavbarButton>
                        <NavbarButton>Clothes</NavbarButton>
                        <NavbarButton>Shoes</NavbarButton>
                        <NavbarButton>Collections</NavbarButton>
                    </div>
                    <Search/>
                    <div style={{marginLeft:'80px', height: '100%', display: 'flex', alignItems:'center'}}>
                            <LoginButton>Log in</LoginButton>
                            <LoginButton>Sign in</LoginButton>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;