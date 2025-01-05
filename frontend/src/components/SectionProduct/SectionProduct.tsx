import './SectionProduct.css';
import PriceCard from '../PriceCard/PriceCard';

type Product = {
  src: string;
  alt: string;
  price: number 
};

const products: Product[] = [
  { src: "/assets/book-6.jpg", alt: "Principal",  price: 19.90},
  { src: "/assets/book-7.jpg", alt: "Secondary 1",  price: 29.90},
  { src: "/assets/book-8.jpg", alt: "Secondary 2",  price: 9.90},
  // Adicione outros produtos aqui
];

const SectionProduct = () => {
  return (
    <div className="container">
      <div className="cards">
        {/* Card Principal */}
        <div className="card-image-principal">
          <img src={products[0].src} alt={products[0].alt} />
          <PriceCard price={products[0].price}></PriceCard>
        </div>

        {/* Card Secundários */}
        <div className="card-column">
          {products.slice(1).map((product, index) => (
            <div className="card-image" key={index}>
              <img src={product.src} alt={product.alt} />
              <PriceCard price={product.price}></PriceCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionProduct;
