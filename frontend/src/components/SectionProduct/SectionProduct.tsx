import React from 'react';
import './SectionProduct.css';

const SectionProduct = () => {
  return (
    <div className="container">
      <div className="cards"> 
        <div className="card-image-principal">
            <img src="/assets/book-6.jpg" alt="Principal" />
        </div>
        <div className="card-column">
          <div className="card-image">
            <img src="/assets/book-7.jpg" alt="Secondary 1" />
          </div>
          <div className="card-image">
            <img src="/assets/book-8.jpg" alt="Secondary 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionProduct;