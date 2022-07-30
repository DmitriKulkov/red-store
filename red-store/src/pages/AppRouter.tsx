import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home';
import SearchPage from "./search/SearchPage";
import ItemPage from "./item/ItemPage";
import CartPage from "./cart/CartPage";
const AppRoutes = () => {
    return(
        <Routes>
            <Route path = '/home' element = {<Home/>}/>
            <Route path = '/search' element = {<SearchPage/>}/>
            <Route path = '/product/:product' element = {<ItemPage/>}/>
            <Route path = '/cart' element = {<CartPage/>}/>
            <Route path = '*' element = {<Home/>}/>
        </Routes>
    )
}
export default AppRoutes;