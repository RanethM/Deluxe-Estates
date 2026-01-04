import propertyData from '../../data/properties.json';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './propertyPage.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = propertyData.properties.find((p) => p.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const base = import.meta.env.BASE_URL || '/';

  if (!property) return <p className="no-results">Property not found!</p>;

  const images = property.pictures || [];
  const currentImage = images[currentIndex];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Floor plan
  const floorPlan = images.find((img) => img.toLowerCase().includes('fp'));

  return (
    <div className="property-page">
      {/* Breadcrumb / Back */}
      <div className="breadcrumb">
        <a href="/search">&larr; Back to search results</a>
      </div>

      {/* Main Section */}
      <div className="property-main">
        <div className="image-gallery">
          <div className="slider-container">
            <button className="arrow left-arrow" onClick={prevImage}>&lt;</button>
            <img src={currentImage ? base + currentImage : ''} alt={property.type} className="main-image" />
            <button className="arrow right-arrow" onClick={nextImage}>&gt;</button>
          </div>

          <div className="thumbnail-container">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={base + img}
                alt={`Thumbnail ${idx + 1}`}
                className={`thumbnail ${currentIndex === idx ? 'active-thumbnail' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="property-info">
          <div className="price">{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(property.price)}</div>
          <div className="meta">
            {property.bedrooms} beds • {property.tenure} • {property.postalCode}
          </div>
          <h1 className="title">{property.shortdescription}</h1>
          <p className="description">{property.description}</p>
        </div>
      </div>

      {/* Floor Plan */}
      {floorPlan && (
        <div className="floorplan-section">
          <h2>Floor Plan</h2>
          <img src={floorPlan ? base + floorPlan : ''} alt="Floor Plan" className="floorplan-img" />
        </div>
      )}

      {/* Map */}
      <div className="map-section">
        <h2>Location</h2>
        <iframe
          src={property.map}
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '16px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Property Map"
        ></iframe>
      </div>

      {/* FOOTER */}
      <footer className="contact-footer">
        © 2025 Deluxe Estates · Crafted with elegance
      </footer>
    </div>
  );
}
