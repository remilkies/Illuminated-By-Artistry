// src/App.jsx
import { useState } from "react";
import React from 'react';
import './App.css'
import { Col } from 'react-bootstrap';

import hangingStarbusrt from './assets/hangingStarburst.svg';
import hangingDecor from './assets/hangingDecor.svg';

import ibaLogo from './assets/iba-logo.svg';

import moonCrest from './assets/moonCrest.svg';
import captionFlourih from './assets/captionFlourish.svg';

import whatsappIcon from '/whatsapp-icon.svg';
import instagramIcon from '/instagram-icon.svg';
import locationIcon from '/location-icon.svg';

import InstaFeed from './components/instaFeed';

// import Navbar from './components/Navbar';
// import Pricing from './components/Pricing';
// import Bio from './components/Bio';
import PriceModal from "./components/priceModal";
import BookingForm from './components/bookingForm';

export default function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="app">
      {/* <Navbar /> */}
      <main className="container-fluid">

        <section className="hero-container">
          <img src={hangingStarbusrt} alt="Hanging Starburst" className="hanging-starburst" />
          <img src={hangingDecor} alt="Hanging Decor" className="hanging-decor" />
  <nav className="hero-nav">
    <a href="#home">HOME</a>
    <a href="#pricing">PRICING</a>
    <a href="#jewellery">JEWELLERY</a>
    <a href="#booking">BOOK NOW</a>
  </nav>

  <div className="hero-content">
    <div className='hero-logo-container'>
      <img src={ibaLogo} alt="IBA Logo" className="logo-icon" />
    </div>
    
    <div className="hero-title">
      <img src={moonCrest} alt="Moon Crest" className="moon-crest left" />
      <h1>Illuminated</h1>
      <img src={moonCrest} alt="Moon Crest" className="moon-crest" />
      </div>
    <h2 className="hero-subtitle">By Artistry</h2>
    <div  className="hero-tagline">
    <img src={captionFlourih} alt='caption flourish' className='caption-flourish left'/><p>Piercings. Tattoos. Beauty</p><img src={captionFlourih} alt='caption flourish' className='caption-flourish right'/>
    </div>
    <div className='social-icons'>
  <a 
    href="https://www.instagram.com/illuminated_by_artistry/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className='icon'
  >
    <img src={instagramIcon} alt="Instagram Icon" className="instagram-icon" /> 
    <span>@illuminated_by_artistry</span>
  </a>

  <a 
    href="https://wa.me/27680424933" 
    target="_blank" 
    rel="noopener noreferrer" 
    className='icon'
  >
    <img src={whatsappIcon} alt="WhatsApp Icon" className="whatsapp-icon" /> 
    <span>068 042 4933</span>
  </a>

  <a 
    href='https://maps.app.goo.gl/agom2uu2bmghUBEp8' 
    target="_blank" 
    rel="noopener noreferrer" 
    className='icon'
  >
    <img src={locationIcon} alt="Location Icon" className="location-icon" /> 
    <span>Little Falls, Roodepoort</span> 
  </a>
</div>
    
  </div>

        </section>
        
        <section>
          <InstaFeed/>
        </section>
        <section id="pricing">
          {/* <Pricing /> */}
        </section>

        <section id="bio">
          {/* <Bio /> */}
        </section>

        <section id="booking">
          <div className='row justify-content-center'>
            <Col md={6}>

      <PriceModal/>
      </Col>

            <Col md={6}>
            <BookingForm />
            </Col>
          
          </div>
        </section>
      </main>
    </div>
  );
}