import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home';
import SearchPage from "./search/SearchPage";
const AppRoutes = () => {
    return(
        <Routes>
            <Route path = '/home' element = {<Home/>}/>
            <Route path = '/search' element = {<SearchPage/>}/>
            <Route path = '*' element = {<Home/>}/>
        </Routes>
    )
}
export default AppRoutes;