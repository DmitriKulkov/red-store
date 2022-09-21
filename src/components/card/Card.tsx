import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../entities/product.entity";
import classes from "./Card.module.css";

interface CardProps {
  item: Product;
}

const Card: FC<CardProps> = ({ item }) => {
  return (
    <div className={classes.card}>
      <Link to={"/product/" + item.model.slug} className={classes.link}>
        <img src={item.files[0].encoded_img} />
        <div>
          <p>{item.model.name}</p>
          <p>{item.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
