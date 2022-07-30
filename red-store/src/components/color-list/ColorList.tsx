import React, {FC} from 'react';
import {Color} from "../../entities/color.entity";
import classes from "./ColorList.module.css"

interface ColorListProps {
    colors: Color[],
    onClick: (color: string | Color) => void,
    fullColor?: boolean
}
const ColorList:FC<ColorListProps> = ({colors, onClick, fullColor}) => {
    return (
        <div className={classes.colors__container}>
            {colors.map((col)=>
                <div
                    key={col.name}
                    style={{height: "20px", width: "20px", borderRadius: "20px", background: col.hex, border: "1px solid black", margin: "2px"}}
                    onClick={()=>onClick(fullColor?col.name:col)}
                ></div>
            )}
        </div>
    );
};

export default ColorList;
