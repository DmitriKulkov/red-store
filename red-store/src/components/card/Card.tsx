import React, {FC} from 'react';
import {Link} from 'react-router-dom';

interface CardProps{
    img_ref: string;
    name: string;
    cost: number;
    page: string;
}

const Card:FC<CardProps> = ({img_ref, name, cost, page}) => {
    return (
        <div>
            <Link to={page}>
                <div>
                    <img src={img_ref} alt="item"/>
                </div>
                <div>
                    <h1>{name}</h1>
                    <h1>{cost}</h1>
                </div>
            </Link>
        </div>
    );
};

export default Card;