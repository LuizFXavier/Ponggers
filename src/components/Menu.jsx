import React from "react";
import Button from "./Button";
import "../css/Menu.css";

const Menu = ({ titulo, botao1 }) => {
  const reiDelas = () => {
    botao1();
    console.log("click");
  };
  const botao2 = () => {
    console.log("What is a surfist?");
  };
  return (
    <>
      <div className="menu-principal">
        <h1>{titulo}</h1>
        <div className="">
          <Button
            className={"button-menu"}
            onClick={reiDelas}
            texto={"Jogar"}
          />
          <Button
            className={"button-menu"}
            onClick={botao2}
            texto={"Toggers"}
          />
        </div>
      </div>
    </>
  );
};

export default Menu;
