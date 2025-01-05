import './PriceCards.css';

interface PriceCardProps {
    price: number; // Define o tipo da propriedade "price" como string
}

  const PriceCard: React.FC<PriceCardProps> = ({ price }) => {
  return (
    <div className="price-card">
      R${price.toFixed(2)}
    </div>
  );
};

export default PriceCard;