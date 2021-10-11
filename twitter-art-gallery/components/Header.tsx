import React from "react";
import Link from 'next/link'
import Nav from "./Nav";

const Header: React.FC<{}> = ({ }) => {
  return (
    <header className="sticky top-0 z-50 body-font backdrop-filter backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap justify-between p-5">
        <Link href="/">
        <a className="flex title-font font-medium items-center text-gray-700 mb-4 mt-4 sm:mb-0">
            <span className="ml-3 text-xl">Garoo</span>
        </a>
        </Link>
        <nav className="ml-auto flex items-center">
          <Nav />
        </nav>
      </div>
    </header>
  );
};

export default Header;

