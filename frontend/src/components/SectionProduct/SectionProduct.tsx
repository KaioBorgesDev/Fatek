import "./SectionProduct.css";
import PriceCard from "../PriceCard/PriceCard";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  src: string;
  alt: string;
  price: number;
};

const products: Product[] = [
  { id: 1, src: "/assets/book-6.jpg", alt: "Principal", price: 19.90 },
  { id: 2, src: "/assets/book-7.jpg", alt: "Secondary 1", price: 29.90 },
  { id: 3, src: "/assets/book-8.jpg", alt: "Secondary 2", price: 9.90 },
];

const SectionProduct = () => {
  return (
    <div className="container-legacy">
      <div className="cards-legacy">

        <div className="card-image-principal-legacy">
          <Link to={`/comprar/${products[0].id}`}>
            <img src={products[0].src} alt={products[0].alt} />
            <PriceCard price={products[0].price} />
          </Link>
        </div>

        <div className="card-column-legacy">
          {products.slice(1).map((product) => (
            <div className="card-image-legacy" key={product.id}>
              <Link to={`/comprar/${product.id}`}>
                <img src={product.src} alt={product.alt} />
                <PriceCard price={product.price} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SectionProduct;
