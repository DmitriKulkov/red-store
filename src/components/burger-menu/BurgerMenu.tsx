import React, {FC, useState} from 'react';
import classes from "./BurgerMenu.module.css";
import {IconButton} from "@mui/material";
import {ArrowBackIos, Menu, ShoppingCartOutlined} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

interface BurgerMenuProps{
    className?: string;
}

const BurgerMenu:FC<BurgerMenuProps> = ({className}) => {
    const [menuOpened, setMenuOpened] = useState<boolean>(false)
    const navigate = useNavigate()

    return (
        <div className={classes.menu__button + " " + className}>
            <IconButton
                aria-label="menu"
                onClick={()=>{
                    setMenuOpened(true)
                }}
            >
                <Menu sx={{fontSize: "45px", color: "white"}}/>
            </IconButton>
            <div
                className={classes.menu__blur}
                style={menuOpened?{display: "block"}:{display: "none"}}
                onClick={(e)=>{
                    e.stopPropagation()
                    setMenuOpened(false)
                }}
            />
            <div
                className={classes.menu__window}
                style={menuOpened?{display: "block"}:{display: "none"}}
            >
                <header className={classes.menu__window__header}>
                    <h3>Menu</h3>
                    <div className={classes.menu__window__header__close}>
                        <IconButton
                            aria-label="close"
                            onClick={()=>{
                                setMenuOpened(false)
                            }}
                        >
                            <ArrowBackIos sx={{fontSize: "45px", color: "lightgrey"}}/>
                        </IconButton>
                    </div>
                    <div className={classes.menu__window__header__cart}>
                        <IconButton
                            aria-label="cart"
                            onClick={()=>{
                                navigate('/cart')
                                setMenuOpened(false)
                            }}>
                            <ShoppingCartOutlined sx={{fontSize: "30px", color: "#686868"}}/>
                        </IconButton>
                    </div>
                </header>
                <div className={classes.menu__window__content}>
                    <Link
                        to={"/search"}
                        onClick={()=>{setMenuOpened(false)}}
                    >
                        <p>New!</p>
                    </Link>
                    <Link
                        to={"/search"}
                        onClick={()=>{setMenuOpened(false)}}
                    >
                        <p>Clothes</p>
                    </Link>
                    <Link
                        to={"/search"}
                        onClick={()=>{setMenuOpened(false)}}
                    >
                        <p>Shoes</p>
                    </Link>
                    <Link
                        to={"/search"}
                        onClick={()=>{setMenuOpened(false)}}
                    >
                        <p>Collections</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BurgerMenu;