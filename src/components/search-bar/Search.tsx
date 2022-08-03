import React, {ChangeEvent, ChangeEventHandler, FormEventHandler, FC, MouseEventHandler} from 'react';
import classes from './Search.module.css'
import magn from './pngegg.png'

interface SearchProps{
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onSubmit?: FormEventHandler<HTMLFormElement>
    onClick?: MouseEventHandler
}
const Search: FC<SearchProps> = ({value, onChange, onSubmit, onClick}) => {
    return (
        <div className={classes.search}>
            <form onSubmit={onSubmit?onSubmit:undefined}>
                <input
                    type="search"
                    placeholder='Search'
                    value={value}
                    onChange={onChange ? onChange:undefined}
                />
                <img src={magn} alt="search" onClick={onClick}/>
            </form>
        </div>
    );
};

export default Search;