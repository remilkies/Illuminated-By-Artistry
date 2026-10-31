// src/App.jsx
import { useState } from "react";
import React from 'react';


import './App.css'
import { Col, Row } from 'react-bootstrap';

import hangingStarbusrt from './assets/hangingStarburst.svg';
import hangingDecor from './assets/hangingDecor.svg';

import ibaLogo from '/iba-logo.svg';

import moonCrest from './assets/moonCrest.svg';
import captionFlourish from './assets/captionFlourish.svg';

import whatsappIcon from '/whatsapp-icon.svg';
import instagramIcon from '/instagram-icon.svg';
import locationIcon from '/location-icon.svg';

import NoticeBoard from "./components/noticeBoard";
import InstaFeed from './components/instaFeed';

import Navbar from './components/navbar';
import Bio from './components/bio'; 
import PriceModal from "./components/priceModal";
import BookingForm from './components/bookingForm';
import Footer from "./components/footer";


export default function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">

      <main className="container-fluid">

        <section className="hero-container">
          <img src={hangingStarbusrt} alt="Hanging Starburst" className="hanging-starburst" />
          <img src={hangingDecor} alt="Hanging Decor" className="hanging-decor" />
  <Navbar/>

  <div className="hero-content">
    <div className='hero-logo-container'>
      <div className="hero-logo">
      <img src={ibaLogo} alt="IBA Logo" className="logo-icon" />
      </div>
    </div>
    
    <div className="hero-title">
      <img src={moonCrest} alt="Moon Crest" className="moon-crest left" />
      <h1>Illuminated</h1>
      <img src={moonCrest} alt="Moon Crest" className="moon-crest" />
      </div>
    <h2 className="hero-subtitle">By Artistry</h2>
    <div  className="hero-tagline">
    <img src={captionFlourish} alt='caption flourish' className='caption-flourish left'/><p>Piercings. Tattoos. Beauty</p><img src={captionFlourish} alt='caption flourish' className='caption-flourish right'/>
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
        <section id="notice">
      <NoticeBoard/>
        </section>

        <section id="bio">
          <Bio />
        </section>

        <section>
          <InstaFeed/>
        </section>
        <section id="pricing">
          {/* <Pricing /> */}
        </section>


        <section id="booking">
          <Row className='justify-content-center'>
            <Col md={6}>

      <PriceModal/>
      </Col>

            <Col md={6}>
            <BookingForm />
            </Col>
          
          </Row>
        </section>

        <Footer/>
      </main>
    </div>
  );
}