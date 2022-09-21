import React, { FC, useState } from "react";
import classes from "../../SearchPage.module.css";
import { Checkbox } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

const PriceFilter: FC = () => {
  const [diapason, setDiapason] = useState<{ a: string; b: string }>({
    a: "0",
    b: "10000",
  });

  const debouncedPriceA = useDebouncedCallback(
    <T extends Function>(callback: T) => {
      callback();
    },
    1000
  );
  const debouncedPriceB = useDebouncedCallback(
    <T extends Function>(callback: T) => {
      callback();
    },
    1000
  );

  const filters = useTypedSelector((state) => state.filters);

  const { changePriceDiapason, changeSortPrice } = useActions();

  return (
    <div>
      <p>Sort by:</p>
      <div className={classes.checkbox_container}>
        <Checkbox
          checked={filters.sortPrice === 1}
          onClick={() => {
            changeSortPrice(1);
          }}
        />
        price increase
      </div>
      <div className={classes.checkbox_container}>
        <Checkbox
          checked={filters.sortPrice === -1}
          onClick={() => {
            changeSortPrice(-1);
          }}
        />
        price decrease
      </div>
      <p>Price interval:</p>
      <div className={classes.filters__price_interval}>
        <p>from: </p>
        <input
          value={diapason.a}
          className={classes.filters__price_interval_input}
          type="text"
          onChange={(e) => {
            debouncedPriceA(() => {
              changePriceDiapason({
                a: isNaN(parseInt(e.target.value, 10))
                  ? filters.priceDiapason.a
                  : parseInt(e.target.value, 10),
                b: filters.priceDiapason.b,
              });
            });
            setDiapason({
              a: e.target.value,
              b: diapason.b,
            });
          }}
        />
        <p>to: </p>
        <input
          value={diapason.b}
          className={classes.filters__price_interval_input}
          type="text"
          onChange={(e) => {
            debouncedPriceB(() => {
              changePriceDiapason({
                a: filters.priceDiapason.a,
                b: isNaN(parseInt(e.target.value, 10))
                  ? filters.priceDiapason.b
                  : parseInt(e.target.value, 10),
              });
            });
            setDiapason({
              a: diapason.a,
              b: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
