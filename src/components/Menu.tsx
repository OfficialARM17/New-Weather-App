import * as React from "react";
import "./Menu.css"


interface IMenuProps {
  isMenuOpen: boolean;
}

export const Menu = ({ isMenuOpen }: IMenuProps) => {
  return (
    <div className={`app-menu ${isMenuOpen ? "menu-open" : ""}`}>
        <h2>Menu</h2>
        <div className="section-one">
          <h6>Change from Degrees to Fahrenheit</h6>
        </div>
    </div>
  );
};