import React, { useState } from "react";
import "./NavBar.css";
import { MdShoppingCartCheckout } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleCart = () => {
    setCartActive(!cartActive);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <a href="">
            <h1>FATEK</h1>
          </a>
        </div>
        <ul>
          <li>
            <a>Comprar</a>
          </li>
          <li>
            <a href="#ancora-contatos">Vender</a>
          </li>
          <li>
            <a href="#ancora-projetos">Trocar</a>
          </li>
          <li>
            <a href="#ancora-projetos">Donate</a>
          </li>
          <li>
            <a href="#ancora-home">Home</a> 
          </li>
        </ul>
        <div
          className={`hamburger ${menuActive ? "hamburger-active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div className="cart-icon" onClick={toggleCart}>
          <MdShoppingCartCheckout size={24} />
        </div>
      </nav>
      {/* Menu Hamburguer */}
      <div className={`menubar ${menuActive ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#ancora-home" onClick={toggleMenu}>Comprar</a>
          </li>
          <li>
            <a href="#ancora-sobre-mim" onClick={toggleMenu}>Vender</a>
          </li>
          <li>
            <a href="#ancora-projetos" onClick={toggleMenu}>Trocar</a>
          </li>
          <li>
            <a href="#ancora-contatos" onClick={toggleMenu}>Donate</a>
          </li>
          <li>
            <a href="#ancora-contatos" onClick={toggleMenu}>Home</a>
          </li>
        </ul>
      </div>
      {/* Cart Card */}
      <div className={`cart-card ${cartActive ? "active" : ""}`}>
        <div className="card-head">
        <h2>Meu Carrinho</h2>
        <button onClick={toggleCart} className="close-cart"><IoClose size={20}/></button>
        </div>
        <ul>
          <li>Produto 1 - R$100,00</li>
          <li>Produto 2 - R$50,00</li>
          <li>Produto 3 - R$30,00</li>
        </ul>
        
      </div>
    </>
  );
};

export default NavBar;
