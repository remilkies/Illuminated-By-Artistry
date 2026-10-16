import React, { useState } from "react";
import "./priceModal.css";
import titleFlourish from "../assets/titleFlourish.svg";

const PRICE_DATA = {
  "Facial Piercings": [
    { service: "Nose (Surgical Steel)", price: "R300" },
    { service: "Septum (Surgical Steel)", price: "R350" },
    { service: "Medusa (Surgical Steel)", price: "R350" },
    { service: "Lip (Surgical Steel)", price: "R350" },
    { service: "Eyebrow (Surgical Steel)", price: "R300" },
    { service: "Bridge (Surgical Steel)", price: "R350" },
    { service: "Ashley (Surgical Steel)", price: "R350" },
    { service: "Monroe (Surgical Steel)", price: "R350" },
    { service: "Labret (Surgical Steel)", price: "R350" },
  ],
  "Ear Piercings": [
    { service: "Earlobe (Pair) (Surgical Steel)", price: "R500" },
    { service: "Upper Lobe (Surgical Steel)", price: "R300" },
    { service: "Helix (Surgical Steel)", price: "R300" },
    { service: "Tragus (Surgical Steel)", price: "R300" },
    { service: "Anti-Tragus (Surgical Steel)", price: "R350" },
    { service: "Industrial (Surgical Steel)", price: "R400" },
    { service: "Conch (Surgical Steel)", price: "R300" },
    { service: "Forward Helix (Surgical Steel)", price: "R300" },
    { service: "Daith (Surgical Steel)", price: "R350" },
    { service: "Rook (Surgical Steel)", price: "R350" },
    { service: "Snug (Surgical Steel)", price: "R350" },
    { service: "Flat (Surgical Steel)", price: "R300" },
  ],
  "Oral Piercings": [
    { service: "Smiley (Surgical Steel)", price: "R350" },
    { service: "Tongue (Surgical Steel)", price: "R350" },
  ],
  "Body Piercings": [
    { service: "Belly (Surgical Steel)", price: "R350" },
    { service: "Nipples (Pair) (Surgical Steel)", price: "R600" },
    { service: "Dermals (Titanium)", price: "R800 ea." },
  ],
  "Permanent Make-Up": [
    { service: "Powder Brow", price: "R1350" },
    { service: "Combination Brow", price: "R1450" },
    { service: "Machine Nano Brows", price: "R1600" },
    { service: "Top Eyeliner", price: "R850" },
    { service: "Bottom Eyeliner", price: "R750" },
    { service: "Top & Bottom Eyeliner", price: "R1300" },
  ],
  "PMU Touch Ups": [
    { service: "6-8 Weeks (Brows)", price: "R1350" },
    { service: "Annual", price: "Full Price" },
    { service: "Not My Work", price: "Full Price" },
    { service: "Eyeliner Touch Up", price: "R750" },
  ],
  "Other Services": [
    { service: "Jewellery Change (Excludes Jewellery)", price: "R250" },
  ],
};

export default function PriceListSection() {
    //  null to have all collapsed initially o7
    const [activeCategory, setActiveCategory] = useState("Facial Piercings");
  
    const toggleCategory = (category) => {
      setActiveCategory(activeCategory === category ? null : category);
    };
  
    return (
      <div className="price-section-wrapper">
        <div className="price-card">
          
          {/* Header */}
          <div className="price-header">
            <img src={titleFlourish} alt="" className="title-flourish left" />
            <h2>Price List</h2>
            <img src={titleFlourish} alt="" className="title-flourish" />
          </div>
          <p className="price-subtitle">✦ Tap a category to view prices ✦</p>
  

          <div className="accordion-container">
            {Object.entries(PRICE_DATA).map(([category, items]) => {
              const isExpanded = activeCategory === category;
  
              return (
                <div 
                  key={category} 
                  className={`accordion-item ${isExpanded ? "open" : ""}`}
                >
                  {/* Clickable Header Button */}
                  <button 
                    type="button"
                    className="accordion-header"
                    onClick={() => toggleCategory(category)}
                  >
                    <img src={titleFlourish} alt="" className="header-flourish left" />
                    <span className="category-title">{category}</span>
                    <img src={titleFlourish} alt="" className="header-flourish" />
                    <span className="chevron">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </button>
  

                  {isExpanded && (
                    <div className="accordion-body">
                      {items.map((item, idx) => (
                        <div key={idx} className="price-row">
                          <span className="service-name">{item.service}</span>
                          {/* Leader dots line */}
                          <span className="leader-dots"></span>
                          <span className="service-price">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
  
          {/* Footer Notes */}
          <div className="price-notes">
            <p>✦ All piercing prices are inclusive of plain standard jewellery.</p>
            <p>✦ R100 non-refundable deposit required for PMU bookings.</p>
          </div>
  
        </div>
      </div>
    );
  }