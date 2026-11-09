// src/App.jsx
import { useState, useRef } from "react";
// import { flushSync } from 'react-dom'
import React from 'react';
import './App.css'
import { Col } from 'react-bootstrap';

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

// import Navbar from './components/Navbar';
import Bio from './components/Bio';
import PriceModal from "./components/priceModal";
import BookingForm from './components/bookingForm';

import ArtistPage from "./pages/Artist";

import Footer from "./components/footer";

const OUT_MS = 600; //duration for old page getting sucked
const IN_MS = 800; //new page descends from hero section hevean
const HERO_PEEK = 0.18;

export default function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState('home'); //'home' | 'artist' //IDEA make the artist section on the hopepage a dropdown with some portfolio pieces and then you can like meet the artist (maybe a seperate sneak peak btn)
  const [phase, setPhase] = useState('idle'); // 'idel' | 'out' | 'in'
  const busy = useRef(false);
  const stageRef = useRef(null);

  const scrollToTarget = (anchor, behavior = 'auto') => {
    if (anchor) document.querySelector(anchor)?.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  };

  //scroll so content area sits just at the gates of hero hevean and wait for your cue
  const scrollToStage = () =>
    new Promise((resolve) => {
      const target =
        stageRef.current.getBoundingClientRect().top + window.innerHeight * HERO_PEEK;
      if (Math.abs(window.scrollY - target) < 4) return resolve();
      window.scrollTo({ top: target, behavior: 'smooth' });
      const started = performance.now();
      const check = () =>
        Math.abs(window.scrollY - target) < 2 || performance.now() - started > 1200 //little 1.2s saftly net <3
          ? resolve()
          : requestAnimationFrame(check);
      check();
    });

  const goToPage = (nextPage, anchor) => (e) => {
    e.preventDefault();
    if (busy.current) return; //ingnore click mid-animation o7


    if (nextPage === page) {
      scrollToTarget(anchor, 'smooth');
      return;
    }

    // const swap = () => {
    //   // flushSync UPDATE DOM RIGHT NOW so the browser can snapshot the new page
    //   flushSync(() => setPage(nextPage));
    //   scrollToTarget(anchor);
    // };

    // sorryy no animation for old browsers (or people who use reduce motion setting)
    // const canAnimate =
    //   document.startViewTransition &&
    //   !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // if (canAnimate) document.startViewTransition(swap);
    // else swap();

    //insta swap >:D
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPage(nextPage);
      scrollToTarget(anchor);
      return;
    }

    busy.current = true;
    scrollToStage().then(() => {
      setPhase('out'); //old page goes to hevean
      console.log('WATCH AS I MAKE THIS PAGE DISSAPPER')
      setTimeout(() => {
        setPage(nextPage); //cosume change off stage
        console.log('AND FOR MY NEXT TRICK, A NEW PAGE APPEARS')
        setPhase('in'); //act 2: page comes from stage top o7
        console.log('TADAAAA')
        setTimeout(() => {
          setPhase('idle');
          busy.current = false;
          if (anchor) scrollToTarget(anchor, 'smooth'); //Pricing/book now o7
        }, IN_MS);

      }, OUT_MS);
    });
  };

  // AND THEN MAYBE WHEN YOU'RE ON ANY OTHER PAGE THEN THE BOOKING POPS UP AS A MODAL INSTEAD >:D


  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  //   setPage(2);
  // }

  return (
    <div className="app">
      {/* <Navbar /> */}
      <main className="container-fluid">

        <section className="hero-container">
          <img src={hangingStarbusrt} alt="Hanging Starburst" className="hanging-starburst" />
          <img src={hangingDecor} alt="Hanging Decor" className="hanging-decor" />


          <nav className="hero-nav">
            <a className={`nav-btn ${page === 'home' ? 'active' : ''}`}
              onClick={goToPage('home')}>HOME</a>

            <a className="nav-btn"
              onClick={goToPage('home', '#pricing')}>PRICING</a>
            {/* <a className={`nav-btn ${page === 'jewellary' ? 'active : ''}`}
      href="#jewellary" onClick={goToPage('Jewellary')}>JEWALLARY</a> */}
            <a className={`nav-btn ${page === 'artist' ? 'active' : ''}`} onClick={() => goToPage('artist')} id="artist-btn">ARTIST</a>
            {/* maybe make the booking btn sticky in the bottom right corner o7 */}
            <a className="nav-btn"
             onClick={goToPage('home', '#booking')}>BOOK NOW</a>

          </nav>

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
            <div className="hero-tagline">
              <img src={captionFlourish} alt='caption flourish' className='caption-flourish left' /><p>Piercings. Tattoos. Beauty</p><img src={captionFlourish} alt='caption flourish' className='caption-flourish right' />
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

        <div ref={stageRef}
          className={`page-stage ${phase !== 'idle' ? 'page-stage--busy' : ''}`}
          style={{ '--out-ms': `${OUT_MS}ms`, '--in-ms': `${IN_MS}ms` }}
        >
          <div className={`page-stage__inner page-stage__inner--${phase}`}>
            {/* I'VE FINALLY FIGURED OUT HOW STATES WORK */}
            {page === 'home' && (
              <section id="home">

                <section id="notice">
                  <NoticeBoard />
                </section>

                <section>
                  <InstaFeed />
                </section>
        

                <section id="bio">
                  <Bio />
                </section>

                
                  <div className='row justify-content-center'>
                    <section id="pricing">
                      <Col md={6}>
                      

                      <PriceModal />
                    </Col>
                    </section>
<section id="booking">
                    <Col md={6}>
                      <BookingForm />
                    </Col>
</section>
                  </div>
                
              </section>
            )}

            {page === 'artist' && (
              <ArtistPage />
              )}
          </div>
        </div>
        <Footer />
      </main>

    </div>
  );
}
