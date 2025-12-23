import React, { useState, useEffect } from 'react';
import './PropertySlider.css';

const PropertySlider = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!properties || properties.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }, 4000); // change slide every 4 seconds

    return () => clearInterval(interval);
  }, [properties]);

  if (!properties || properties.length === 0) {
    return <p>No properties available</p>;
  }

  return (
    <div className="slider-container">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {properties.map((property) => (
          <div className="slider-card" key={property.id}>
            <img
              src={property.picture.startsWith('/') ? property.picture : `/${property.picture}`}
              alt={`Property ${property.id}`}
              className="slider-image"
            />
            <div className="slider-overlay">
              <p className="slider-price">£{property.price.toLocaleString()}</p>
              <p className="slider-location">{property.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySlider;
