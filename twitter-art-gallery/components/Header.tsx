import React from "react";
import Nav from "./Nav";

const Header: React.FC<{}> = ({ }) => {
  return (
    <div className="sticky top-0 z-50">
      GAROU
      <Nav />
    </div>
  );
};

export default Header;

