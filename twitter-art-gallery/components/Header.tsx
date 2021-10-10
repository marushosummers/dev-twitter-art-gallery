import React from "react";
import Nav from "./Nav";

const Header: React.FC<{}> = ({ }) => {
  return (
    <header className="sticky top-0 z-50 body-font backdrop-filter backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap p-5 flex-row">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 mt-4 sm:mb-0">
          <span className="ml-3 text-xl">Garoo</span>
      </a>
        <nav className="ml-auto flex flex-wrap items-center justify-center">
        <Nav />
      </nav>
    </div>
  </header>
  );
};

export default Header;

