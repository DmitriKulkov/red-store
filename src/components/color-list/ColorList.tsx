import React, {FC} from 'react';
import {Color} from "../../entities/color.entity";
import classes from "./ColorList.module.css"

interface ColorListProps {
    colors: Color[],
    selected: string[],
    onClick?: (color: string | Color) => void,
    fullColor?: boolean
}
const ColorList:FC<ColorListProps> = ({colors, selected, onClick, fullColor}) => {
    return (
        <div className={classes.container}>
            {colors.map((col)=>
                <div
                    key={col.name}
                    style={{background: col.hex}}
                    className={selected.includes(col.name)? classes.color + " " + classes.color__selected: classes.color}
                    onClick={()=> onClick ? onClick(fullColor ? col : col.name) : null}
                ></div>
            )}
        </div>
    );
};

export default ColorList;
