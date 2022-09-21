import React, { FC } from "react";
import classes from "./Select.module.css";

interface SelectProps {
  value: string;
  defaultValue: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { value: number; name: string }[];
}

const Select: FC<SelectProps> = ({
  value,
  defaultValue,
  onChange,
  options,
}) => {
  return (
    <select className={classes.select} value={value} onChange={onChange}>
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
