import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav>
        <div className="logo">
          <h1>FATEK</h1>
        </div>
        <ul>
          <li>
            <a href="#ancora-home">Home</a>
          </li>
          <li>
            <a href="#ancora-sobre-mim">Sobre Mim</a>
          </li>
          <li>
            <a href="#ancora-projetos">Projetos</a>
          </li>
          <li>
            <a href="#ancora-contatos">Contatos</a>
          </li>
        </ul>
        <div className="hamburger">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
      <div className="menubar">
        <ul>
          <li>
            <a href="#ancora-home">Home</a>
          </li>
          <li>
            <a href="#ancora-sobre-mim">Sobre Mim</a>
          </li>
          <li>
            <a href="#ancora-projetos">Projetos</a>
          </li>
          <li>
            <a href="#ancora-contatos">Contatos</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
