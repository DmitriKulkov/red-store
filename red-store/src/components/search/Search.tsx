import React, {FC} from 'react';
import classes from './Search.module.css'
import magn from './pngegg.png'

const Search: FC = () => {
    return (
        <div className={classes.search}>
            <form>
                <input type="search" placeholder='Search'/>
                <img src={magn} alt="search"/>
            </form>
        </div>
    );
};

export default Search;