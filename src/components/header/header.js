import React from "react";
import Menu from "./menu";
import Status from "./status";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="top-bar display-flex-center justify-content-between position-fix">
      <Menu />
      <Status />
    </div>
  );
}

export default Header;
