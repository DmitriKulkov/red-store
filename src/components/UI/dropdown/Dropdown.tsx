import React, { FC, useState } from "react";
import classes from "./Dropdown.module.css";
import DropdownButton from "./dropdown-button/DropdownButton";

interface DropdownProps {
  header: string;
  children: React.ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ header, children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  let timer: ReturnType<typeof setTimeout>

  return (
    <div className={classes.dropdown}>
      <DropdownButton
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          timer = setTimeout(() => {
            setIsActive(false);
          }, 100);
        }}
      >
        {header}
      </DropdownButton>
      {isActive && (
        <div
          className={classes.dropdown__content}
          onMouseEnter={() => {
            clearTimeout(timer);
          }}
          onMouseLeave={() => {
            setTimeout(() => setIsActive(false), 100);
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
