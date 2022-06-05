import React, {ChangeEvent, ChangeEventHandler, FC} from 'react';
import classes from './Search.module.css'
import magn from './pngegg.png'

interface SearchProps{
    value?: string;
    onChange?: (e:string)=>void;
}

const Search: FC<SearchProps> = ({value, onChange}) => {
    return (
        <div className={classes.search}>
            <form>
                <input
                    type="search"
                    placeholder='Search'
                    value={value}
                    onChange={e=> onChange ? onChange(e.target.value):{}}
                />
                <img src={magn} alt="search"/>
            </form>
        </div>
    );
};

export default Search;