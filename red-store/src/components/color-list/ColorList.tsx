import React, {FC} from 'react';
import {Color} from "../../entities/color.entity";
import classes from "./ColorList.module.css"

interface ColorListProps {
    colors: Color[],
    onClick: (color: string) => void
}
const ColorList:FC<ColorListProps> = ({colors, onClick}) => {
    return (
        <div className={classes.colors__container}>
            {colors.map((col)=>
                <div
                    key={col.name}
                    style={{height: "20px", width: "20px", borderRadius: "20px", background: col.hex, border: "1px solid black", margin: "2px"}}
                    onClick={()=>onClick(col.name)}
                ></div>
            )}
        </div>
    );
};

export default ColorList;
