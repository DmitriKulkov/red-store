import { FC, MouseEventHandler } from "react";
import classes from "./AddButton.module.css";

interface AddButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: any;
}

const AddButton: FC<AddButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={classes.AddButton}>
      {children}
    </button>
  );
};

export default AddButton;
