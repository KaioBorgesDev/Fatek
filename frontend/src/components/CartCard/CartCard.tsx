import React from 'react'
import { IoClose } from "react-icons/io5";

interface CartCardProps {
    cartActive: boolean;
    toggleCart: () => void;
    listProdutos: {name: string, price: number}[];
}
const CartCard : React.FC<CartCardProps>= ({cartActive, toggleCart, listProdutos}) => {
  return (
    <div>{/* Cart Card */}
    <div className={`cart-card ${cartActive ? "active" : ""}`}>
      <div className="card-head">
      <h2>Meu Carrinho</h2>
      <button onClick={toggleCart} className="close-cart"><IoClose size={20}/></button>
      </div>
      <ul>
        {listProdutos.map((produto, index) => (
          <li key={index}>{produto.name} - R${produto.price.toFixed(2)}</li>
        ))}
      </ul>
      
    </div></div>
  )
}

export default CartCard