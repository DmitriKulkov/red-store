import React, {FC} from 'react';
import classes from "./InformationBar.module.css"

const InformationBar:FC = () => {
    return (
        <div className={classes.info_bar}>
            <div>
                <h3>Помощь и информация:</h3>
                Помощь
                Отследить заказ
                Доставка и возврат
            </div>
            <div>
                <h3>Подробнее о RedShop:</h3>
                О нас
                Инвесторам
            </div>
        </div>
    );
};

export default InformationBar;