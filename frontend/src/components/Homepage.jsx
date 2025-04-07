import React from "react";
import "../styles/homepage.css";
import logo from "../assets/logo.png";
import jacketImg from "../assets/Vintage_Jacket.jpg";
import burgerImg from "../assets/Burger_Deal.png";
import designImg from "../assets/Graphic_Design.jpg";
import mugImg from "../assets/Handmade_Mug.jpg";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleFilterClick = (type) => {
    console.log("Filter clicked:", type);
  };

  const handleProductClick = (productName) => {
    console.log("Clicked product:", productName);
  };

  const dummyProducts = [
    { name: "Vintage Jacket", image: jacketImg, type: "clothing" },
    { name: "Burger Deal", image: burgerImg, type: "food" },
    { name: "Graphic Design", image: designImg, type: "services" },
    { name: "Handmade Mug", image: mugImg, type: "miscellaneous" },
  ];

  return (
    <div>
      {/* Nav Bar */}
      <div className="navbar">
        <img src={logo} alt="Campus Bazaar Logo" className="navbar-logo" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content">
        {/* Search Bar */}
        <div className="searchbar-container">
          <input className="searchbar" type="text" placeholder="Search products..." />
        </div>

        {/* Filters */}
        <div className="filters">
          {["Clothing", "Food", "Services", "Miscellaneous"].map((category) => (
            <button
              key={category}
              className="filter-btn"
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sections */}
        {["Flash Sale Items", "Top Ranking Businesses"].map((section, secIdx) => (
          <div className="section" key={secIdx}>
            <h3>{section}</h3>
            <div className="product-grid">
              {dummyProducts.map((product, index) => (
                <div
                  className="product-card"
                  key={`${section}-${index}`}
                  onClick={() => handleProductClick(product.name)}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="product-name">{product.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
