import React from 'react';
import './PriceCards.css';

interface PriceCardProps {
    price: string; // Define o tipo da propriedade "price" como string
  }

  const PriceCard: React.FC<PriceCardProps> = ({ price }) => {
  return (
    <div className="price-card">
      {price}
    </div>
  );
};

export default PriceCard;