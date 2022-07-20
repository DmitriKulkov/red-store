import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home';
import SearchPage from "./search/SearchPage";
import ItemPage from "./item/ItemPage";
const AppRoutes = () => {
    return(
        <Routes>
            <Route path = '/home' element = {<Home/>}/>
            <Route path = '/search' element = {<SearchPage/>}/>
            <Route path = '/product/:product' element={<ItemPage/>}/>
            <Route path = '*' element = {<Home/>}/>
        </Routes>
    )
}
export default AppRoutes;