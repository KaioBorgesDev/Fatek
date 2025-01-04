import React from 'react';
import './Slider.css';

const Slider = () => {
  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slide">
          <img src="/assets/book-1.jpg" alt="Image 1" />
        </div>
        <div className="slide">
          <img src="/assets/book-2.jpg" alt="Image 2" />
        </div>
        <div className="slide">
          <img src="/assets/book-3.jpg" alt="Image 3" />
        </div>
        <div className="slide">
          <img src="/assets/book-4.jpg" alt="Image 3" />
        </div>
        <div className="slide">
          <img src="/assets/book-5.jpg" alt="Image 3" />
        </div>
       
      </div>
      <div className="slider-scroll">
        <div className="scroll-bar"></div>
      </div>
    </div>
  );
};

export default Slider;