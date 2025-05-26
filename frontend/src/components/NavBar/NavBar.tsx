import { useState } from "react";
import "./NavBar.css";
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbLogin, TbDoorExit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useToken } from "../../context/TokenProvider";
import { toast } from "react-toastify";
import CartCard from "../CartCard/CartCard";

const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const {token, setToken} = useToken();

  const isLogged = () =>{
      return token != ''
  }

  const exit = () => {
    setToken('');
    toast.success('bye.');
  }
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
          <a href="/">
            <h1>FATEK</h1>
          </a>
        </div>
        <ul>
          <li>
            <Link to={'/sell'}>Vender</Link>
          </li>
          <li>
            <Link to={'/'}>Home</Link> 
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
        <div>    
          { isLogged() ?
          <Link to={'/'} onClick={()=> exit()}><TbLogin size={24} style={{marginLeft: 20}} className="card-icons" /></Link>
           
          :
          <Link to={'/login'}><TbDoorExit size={24} style={{marginLeft: 20}} className="card-icons" /></Link>
          }
          <MdShoppingCartCheckout size={24} onClick={toggleCart} className="card-icons"  />
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

      <CartCard cartActive={cartActive} toggleCart={toggleCart} listProdutos={[{name: 'Livro 1', price: 100}, {name: 'Livro 1', price: 100}, {name: 'Livro 1', price: 100},]}></CartCard>
    </>
  );
};

export default NavBar;
