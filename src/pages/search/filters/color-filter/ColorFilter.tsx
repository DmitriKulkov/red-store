import React, {FC} from 'react';
import ColorList from "../../../../components/color-list/ColorList";
import {Color} from "../../../../entities/color.entity";
import {useActions} from "../../../../hooks/useActions";

interface ColorFilterProps{
    colors: Color[],
    cColors: string[]
}

const ColorFilter:FC<ColorFilterProps> = ({ colors, cColors }) => {

    const {changeColors} = useActions()

    return (
        <div >
            <p>Colors:</p>
            <ColorList
                colors={colors}
                selected={cColors}
                onClick={(color)=> {
                    changeColors(color as string)
                }}/>
        </div>
    );
};

export default ColorFilter;