import React from "react";
import Link from 'next/link'
import Router from "next/router";
import InputForm from "./InputForm";

interface HeaderProps {
  name: string
};

const Header: React.FC<HeaderProps> = ({ name }) => {

  const handleSubmit = (name: string) => {
    Router.push(`/twitter/${name}`)
  }

  return (
    <header className="sticky top-0 z-40 body-font backdrop-filter backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap justify-between p-5">
        <Link href="/">
        <a className="flex title-font font-medium items-center text-gray-700 mb-4 mt-4 sm:mb-0">
            <span className="ml-3 text-xl">Garoo</span>
        </a>
        </Link>
        <nav className="ml-auto flex items-center">
          <InputForm name={name} onSubmit={(screen_name: string) => handleSubmit(screen_name)} />
        </nav>
      </div>
    </header>
  );
};

export default Header;

