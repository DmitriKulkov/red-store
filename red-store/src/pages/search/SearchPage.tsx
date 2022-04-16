import React, {FC} from 'react';
import classes from './Search.module.css'
import Search from "../../components/search/Search";

const SearchPage:FC = () => {
    return (
        <div className={classes.search}>
            <div className={classes.search__headbar}>
                <Search/>
            </div>
        </div>
    );
};

export default SearchPage;