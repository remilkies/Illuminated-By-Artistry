import React, { useState } from 'react';
import './ProductCard.css';
import priceFlourish from '../assets/titleFlourish.svg'

export default function ProductCard({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className={`ornate-card ${isExpanded ? 'expanded' : 'collapsed'}`}>
      
      {!isExpanded ? (
        /* --- COLLAPSED STATE --- */
        <div className="card-collapsed-content" onClick={() => setIsExpanded(true)}>
          <div className="card-image-container">
            <img src={product.images[0]} alt={product.title} />
          </div>
          <p className='card-collection'>{product.collection}</p>
          <h3 className="card-title">{product.title}</h3>

<div className='card-footer'>
<img src={priceFlourish} className='price-flourish left' alt='price flourish'/>
          <div className="card-price-badge">
            <span>{product.price}</span>
          </div>
          <img src={priceFlourish} className='price-flourish left' alt='price flourish'/>
        </div>
</div>
      ) : (
        /* --- EXPANDED DETAILS STATE --- */
        <div className="card-expanded-content">
          <button className="card-close-btn" onClick={() => setIsExpanded(false)}>
            ✕
          </button>

          <div className="card-expanded-grid">
            {/* LEFT: Thumbnails & Active Preview */}
            <div className="gallery-layout">
              <div className="thumbnails-column">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`thumbnail-thumb ${activeImageIndex === idx ? 'active-glow' : ''}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>

              <div className="active-preview-container">
                <img src={product.images[activeImageIndex]} alt={product.title} />
              </div>
            </div>

            {/* RIGHT: Description & CTA */}
            <div className="details-layout">
              <div>
                <h2 className="description-title">Description</h2>
                <ul className="specs-list">
                  {product.specs.map((spec, i) => (
                    <li key={i}>• {spec}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="inquire-btn"
                onClick={() => alert(`Inquiring about ${product.title}`)}
              >
                INQUIRE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}