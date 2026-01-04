import propertyData from './data/properties.json';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css';
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Search() {
  const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();

  const monthMap = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
  };

  /* ===============================
      SEARCH HANDLERS
  ============================== */
  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const propertyType = formData.get("propertyType");
    const searchArea = formData.get("searchArea");
    const minBedrooms = parseInt(formData.get("NoOfBedroomMin"), 10) || 0;
    const maxBedrooms = parseInt(formData.get("NoOfBedroomMax"), 10) || Infinity;
    const minPrice = parseInt(formData.get("priceMin"), 10) || 0;
    const maxPrice = parseInt(formData.get("priceMax"), 10) || Infinity;
    const startDate = formData.get("startDate") ? new Date(formData.get("startDate")) : null;
    const endDate = formData.get("endDate") ? new Date(formData.get("endDate")) : null;

    const filtered = propertyData.properties.filter((property) => {
      const addedDate = new Date(
        property.added.year,
        monthMap[property.added.month] - 1,
        property.added.day
      );

      return (
        (propertyType === "type" || property.type === propertyType) &&
        (searchArea === "area" || property.location.includes(searchArea)) &&
        property.bedrooms >= minBedrooms &&
        property.bedrooms <= maxBedrooms &&
        property.price >= minPrice &&
        property.price <= maxPrice &&
        (!startDate || addedDate >= startDate) &&
        (!endDate || addedDate <= endDate)
      );
    });

    setFilteredProperties(filtered);
  };

  const handleClear = () => {
    setFilteredProperties(propertyData.properties);
    document.querySelector(".Search-form").reset();
  };

  const handleExploreMore = (id) => {
    navigate(`/properties/${id}`);
  };

  const handleDrag = (event) => {
  const scrollMargin = 50; // px from top/bottom where scrolling starts
  const scrollSpeed = 10;  // pixels per interval

  const { clientY } = event;

  // Scroll up if near top
  if (clientY < scrollMargin) {
    window.scrollBy({ top: -scrollSpeed, behavior: 'smooth' });
  }

  // Scroll down if near bottom
  if (clientY > window.innerHeight - scrollMargin) {
    window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
  }

  
};




  /* ===============================
      FAVOURITES LOGIC
  ============================== */
  const addToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const isFavourited = (id) =>
    favourites.some((fav) => fav.id === id);


  

  /* ===============================
      DRAG & DROP
  ============================== */
  const handleDragStart = (event, property) => {
    event.dataTransfer.setData("property", JSON.stringify(property));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // Only handle property drops, not favourite drops
    const propertyData = event.dataTransfer.getData("property");
    if (propertyData) {
      const property = JSON.parse(propertyData);
      addToFavourites(property);
    }
    // Set dropEffect to copy for successful drops
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleFavouriteDragStart = (event, id) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("favouriteId", id);
  };

  const handleFavouriteDragEnd = (event, id) => {
    // If dropEffect is 'none', it means the item was dropped outside a valid drop zone
    if (event.dataTransfer.dropEffect === "none") {
      removeFromFavourites(id);
    }
  };

  // Check if a property is already in favorites
  const isFavorited = (id) => favorites.some((fav) => fav.id === id);



  return (
    <div className="page-wrapper">
      <main className="main-layout">

        {/* ===============================
            SEARCH + FAVOURITES (TOP SECTION)
        ============================== */}
        <section className="top-section">
          <div className="search-section">
            {/* SEARCH FORM */}
            <form className="Search-form" onSubmit={handleSearch}>
              <h2 className="section-title">Search Properties</h2>

              <div className="form-row">
                <div className="form-item">
                  <label>Property Type:</label>
                  <select name="propertyType">
                    <option value="type">All Types</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Maisonette">Land</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>

                <div className="form-item">
                  <label>Search Area:</label>
                  <select name="searchArea">
                    <option value="area">Any Area</option>
                    <option value="BR1">BR1</option>
                    <option value="BR2">BR2</option>
                    <option value="BR3">BR3</option>
                    <option value="BR4">BR4</option>
                    <option value="BR5">BR5</option>
                    <option value="BR6">BR6</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-item">
                  <label>No of Bedrooms:</label>
                  <select name="NoOfBedroomMin">
                    <option value="">No Min</option>
                    {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
                  </select>
                  <select name="NoOfBedroomMax">
                    <option value="">No Max</option>
                    {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>

                <div className="form-item">
                  <label>Price Range:</label>
                  <select name="priceMin">
                    <option value="">No Min</option>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i} value={(i+1)*50000}>${(i+1)*50000}</option>
                    ))}
                  </select>
                  <select name="priceMax">
                    <option value="">No Max</option>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i} value={(i+1)*50000}>${(i+1)*50000}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-item">
                  <label>Date Added:</label>
                  <input type="date" name="startDate" />
                  <input type="date" name="endDate" />
                </div>
              </div>

              <div className="form-row">
                <button type="submit" className="btn-submit">Search</button>
                <button type="reset" className="btn-clear" onClick={handleClear}>Clear</button>
              </div>
            </form>
          </div>

          {/* FAVOURITES */}
          <div
            className="favourites-list"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <h2>Favourites</h2>

            {favourites.length > 0 ? (
              <>
                {favourites.map((fav) => (
                  <div
                    key={fav.id}
                    className="favourite-item"
                    draggable
                    onDragStart={(e) => handleFavouriteDragStart(e, fav.id)}
                    onDragEnd={(e) => handleFavouriteDragEnd(e, fav.id)}
                  >
                    <img src={fav.picture} alt={fav.type} />
                    <div>
                      <h3 className="favorite-type">{fav.type}</h3>
                      <button
                        className="remove-button"
                        onClick={() => removeFromFavourites(fav.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  className="clear-button favorites-clear"
                  onClick={clearFavourites}
                >
                  Clear All Favourites
                </button>
              </>
            ) : (
              <p>Drag properties here or click ❤️</p>
            )}
          </div>
        </section>

        {/* ===============================
            OUR PROPERTIES (BOTTOM SECTION)
        ============================== */}
        <section className="results-section">
          <h2 className="section-title">Our Properties</h2>

          <div className="property-gallery">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="property-card"
                draggable
                onDragStart={(e) => handleDragStart(e, property)}
                onDrag={(e) => handleDrag(e)}
              >
                <div className="property-image-container">
                  <img src={property.picture} className="property-image" />

                  <div className="price-badge">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(property.price)}
                  </div>

                  <button
                    className="explore-button"
                    onClick={() => handleExploreMore(property.id)}
                  >
                    Explore More
                  </button>
                </div>

                <div
                  className={`heart-icon ${isFavourited(property.id) ? 'favourited' : ''}`}
                  onClick={() =>
                    isFavourited(property.id)
                      ? removeFromFavourites(property.id)
                      : addToFavourites(property)
                  }
                >
                  {isFavourited(property.id) ? <FaHeart /> : <FaRegHeart />}
                  <span className="heart-label">
                    {isFavourited(property.id) ? 'Added!' : 'Add to Favourites'}
                  </span>
                </div>

                <div className="card-property-details">
                  <h3>{property.type}</h3>
                  <p className="address">{property.location}</p>
                  <p className="desc">{property.shortdescription}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="contact-footer">
          © 2025 Deluxe Estates · Crafted with elegance
        </footer>

      </main>
    </div>
  );
}
