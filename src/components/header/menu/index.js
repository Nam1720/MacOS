import React from "react";
import data from "./data";
Menu.propTypes = {};

function Menu(props) {
  return (
    <ul className="top-bar__left display-flex-center  list-style-none">
      {data.map((x) => (
        <li className="item" key={x.id}>
          <button className=" label">{x.navList}</button>
          <div className="dropdown">
            {x.item.map((item, index) => (
              <div key={index}>
                <button className="dropdown-child">{item}</button>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
