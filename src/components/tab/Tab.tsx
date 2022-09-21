import React, { FC, useState } from "react";
import classes from "./Tab.module.css";

interface TabProps {
  header: string;
  className?: string;
}

const Tab: FC<TabProps> = ({ header, className, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={classes.tab__container}>
      <div
        className={classes.tab__header + " " + className}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <h3>{header}</h3>
      </div>
      <div
        className={classes.tab__content}
        style={isOpen ? { display: "block" } : { display: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Tab;
