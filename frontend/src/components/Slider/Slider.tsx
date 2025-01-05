import React from 'react';
import './Slider.css';
import PriceCard from '../PriceCard/PriceCard';
import { ImageType } from '../../types/ImageType';


const images: ImageType[] = [
  { src: '/assets/book-4.jpg', alt: 'Livro 1', price: 19.90 },
  { src: '/assets/book-8.jpg', alt: 'Livro 2', price: 29.90 },
  { src: '/assets/book-9.jpg', alt: 'Livro 3', price: 10.90 },
  { src: '/assets/book-1.jpg', alt: 'Livro 4', price: 10.90 },
  { src: '/assets/book-2.jpg', alt: 'Livro 5', price: 10.90 },
  { src: '/assets/book-6.jpg', alt: 'Livro 6', price: 10.90 },
];

const Slider: React.FC = () => {
  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image.src} alt={image.alt} className="slide-image" />
            <PriceCard price={image.price} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;