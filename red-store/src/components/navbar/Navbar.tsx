import React, {useState} from 'react'
import classes from "./Navbar.module.css"
import NavbarButton from "./navbarButton/NavbarButton";
import Search from "../search-bar/Search";
import logo from "./logo.png"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {ShoppingCartOutlined} from "@mui/icons-material";
import {IconButton} from "@mui/material";

const Navbar = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const filters = useTypedSelector(state => state.filters)
    const {changeName, changeTitle} = useActions()
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
                        <Search
                            value={search}
                            onChange={(value)=>setSearch(value)}
                            onSubmit={(e)=> {
                                e.preventDefault()
                                navigate('/search')
                                changeName(search)
                                changeTitle("Search: " + search)
                                console.log(search)
                            }}
                            onClick={(e)=> {
                                e.preventDefault()
                                navigate('/search')
                                changeName(search)
                                changeTitle("Search: " + search)
                            }}
                        />
                    </div>
                    <div className={classes.login_buttons__container}>
                        <IconButton
                            aria-label="cart"
                            onClick={()=>{
                                navigate('/cart')
                            }}>
                            <ShoppingCartOutlined/>
                        </IconButton>
                        {/*<LoginButton>Log in</LoginButton>*/}
                        {/*<LoginButton>Sign in</LoginButton>*/}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;