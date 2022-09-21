import React, { useState } from "react";
import classes from "./Navbar.module.css";
import NavbarButton from "./navbarButton/NavbarButton";
import Search from "../search-bar/Search";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { ShoppingCartOutlined, Menu, ArrowBackIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import BurgerMenu from "../burger-menu/BurgerMenu";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { changeName, changeTitle, changeGCategory } = useActions();

  return (
    <header className={classes.navbar}>
      <div className={classes.headbar}>
        <BurgerMenu className={classes.menu} />
        <img src={logo} className={classes.logo} alt="logo" />
        <Link to={"/home"} className={classes.headbar__link}>
          <h1 id="longtitle" className={classes.headbar__long_title}>
            RedShop
          </h1>
          <h1 id="shorttitle" className={classes.headbar__short_title}>
            Red
          </h1>
        </Link>
      </div>
      <nav className={classes.buttonbar}>
        <div className={classes.buttons__container}>
          <div className={classes.buttons}>
            <NavbarButton
              link={"/search"}
              onClick={() => {
                changeTitle("New");
              }}
            >
              New!
            </NavbarButton>
            <NavbarButton
              link={"/search"}
              onClick={() => {
                changeTitle("Clothes");
                changeGCategory("clothes");
              }}
            >
              Clothes
            </NavbarButton>
            <NavbarButton
              link={"/search"}
              onClick={() => {
                changeTitle("Shoes");
                changeGCategory("shoes");
              }}
            >
              Shoes
            </NavbarButton>
            <NavbarButton
              link={"/search"}
              onClick={() => {
                changeTitle("Accessories");
                changeGCategory("accessories");
              }}
            >
              Accessories
            </NavbarButton>
          </div>
          <div className={classes.search__container}>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSubmit={(e) => {
                e.preventDefault();
                if (search !== "") {
                  navigate("/search");
                  changeName(search);
                  changeTitle("Search: " + search);
                  setSearch("");
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                if (search !== "") {
                  navigate("/search");
                  changeName(search);
                  changeTitle("Search: " + search);
                  setSearch("");
                }
              }}
            />
          </div>
          <div className={classes.cart_button_container}>
            <IconButton
              aria-label="cart"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <ShoppingCartOutlined />
            </IconButton>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
