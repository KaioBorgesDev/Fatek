import { useEffect, useState } from "react";
import "./NavBar.css";
import { MdShoppingCartCheckout, MdNotifications } from "react-icons/md";
import { TbLogin, TbDoorExit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useToken } from "../../context/TokenProvider";
import { toast } from "react-toastify";
import CartCard from "../CartCard/CartCard";
import NotificationCard from "../NotificationCard/NotificationCard";


const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const { token, setToken } = useToken();
  const [isAdmin, setIsAdmin] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);
  const toggleNotification = () => setNotificationActive(!notificationActive);


  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("http://localhost:5002/isAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setIsAdmin(false);
      }
    };

    if (token) {
      checkAdminStatus();
    }
  }, [token]);

  const isLogged = () => {
    return token != ""
  }

  const exit = () => {
    setToken("");
    toast.success("bye.");
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
            <Link to={"/sell"}>Vender</Link>
          </li>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/wishlist"}>Desejados</Link>
          </li>
          <li>
            <Link to={"/messages"}>Mensagens</Link>
          </li>
          <li>
            <Link to={"/enviados"}>Entregados</Link>
          </li>
          <li>
            {isAdmin ? <Link to={"/admin"}>Admin</Link> : ""}
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
          {isLogged() ?
            <Link to={"/"} onClick={() => exit()}><TbLogin size={24} style={{ marginLeft: 20 }} className="card-icons" /></Link>

            :
            <Link to={"/login"}><TbDoorExit size={24} style={{ marginLeft: 20 }} className="card-icons" /></Link>
          }
          <MdNotifications
            size={24}
            onClick={toggleNotification}
            className="card-icons"
            style={{ marginRight: 10 }}
          />
          <MdShoppingCartCheckout
            size={24}
            onClick={toggleCart}
            className="card-icons"
          />
        </div>

      </nav>
      {/* Menu Hamburguer */}
      <div className={`menubar ${menuActive ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#ancora-sobre-mim" onClick={toggleMenu}>Vender</a>
          </li>
          <li>
            <a href="#ancora-contatos" onClick={toggleMenu}>Home</a>
          </li>
        </ul>
      </div>

      <CartCard cartActive={cartActive} toggleCart={toggleCart} />
      <NotificationCard notificationActive={notificationActive} toggleNotification={toggleNotification} />
    </>
  );
};

export default NavBar;
