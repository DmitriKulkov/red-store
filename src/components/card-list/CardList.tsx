import React, { FC } from "react";
import Card from "../card/Card";
import { Product } from "../../entities/product.entity";
import classes from "./CardList.module.css";

interface CardListProps {
  products: Product[];
}

const CardList: FC<CardListProps> = ({ products }) => {
  return (
    <div className={classes.cardList}>
      {products.map((product) => (
        <Card key={product.id} item={product} />
      ))}
    </div>
  );
};
export default CardList;
