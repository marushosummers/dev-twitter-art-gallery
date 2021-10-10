import React from "react";
import InputForm from "./InputForm";
import Router from "next/router";

const Nav: React.FC<{}> = ({ }) => {

  const handleSubmit = (name: string) => {
    Router.push(`/twitter/${name}`)
  }

  return (
    <div className="">
      Nav
      <InputForm onSubmit={(screen_name: string) => handleSubmit(screen_name)} />
    </div>
  );
};

export default Nav;

