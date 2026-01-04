// Home Page Component
// Displays hero banner, property slider, and benefits section
import Header from '../../components/Header/Header'; 
import './home.css'
import propertiesData from '../../data/properties.json';
import PropertySlider from '../../components/PropertySlider/PropertySlider';  

// Main homepage layout
const HomePage = () => {
  const properties = propertiesData.properties;
  const base = import.meta.env.BASE_URL || '/';
  
  return (
    <>
    <div className="homepage">
      {/* Navigation header */}
      <Header /> 
      
      {/* Hero banner section */}
      <section className="hero">
      <div className="hero-content">
        <h1>Homes That Match Your Lifestyle</h1>
        <p>
          Discover carefully selected houses, apartments, and flats designed to fit
          your needs, budget, and future plans.
        </p>
      </div>
    </section>

    {/* Main Content */}
      <div className="slider-content-container">
        {/* Property Slider Section */}
        {/* Displays a slider showcasing property images */}
        <div className="slider-section">
          <PropertySlider properties={properties} />
        </div>

        {/* Content Section */}
        {/* Highlights the benefits of using the platform */}
        <div className="content-section">
          <h2>Why Choose Us?</h2>
          <p>
            Discover your dream property with our exclusive listings. Whether you're looking for a cozy home or a luxury estate, we have something for everyone.
          </p>
          <ul>
            <li>Wide range of properties</li> {/* Benefit 1 */}
            <li>Expert advice</li> {/* Benefit 2 */}
            <li>Exceptional customer service</li> {/* Benefit 3 */}
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      {/* FOOTER */}
      <footer className="contact-footer">
        © 2025 Deluxe Estates · Crafted with elegance
      </footer>

    </div>


    

    </>
  );

  
}

export default HomePage;