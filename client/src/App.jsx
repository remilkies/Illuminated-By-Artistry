// src/App.jsx
import { useState, useRef, useEffect } from "react";
// import { flushSync } from 'react-dom'
import React from 'react';
import './App.css'
import { Col, Container, Row } from 'react-bootstrap';

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
import ArtistProfile from '/artistProfile.JPG';

import Footer from "./components/footer";

const OUT_MS = 600; //duration for old page getting sucked
const IN_MS = 800; //new page descends from hero section hevean
const HERO_PEEK = 0.18;

// FOR ARTIST SECTION - PORTFOLIO
// update this number when you add more artistPortfolio*.JPG o7
// const TOTAL_ARTWORK_COUNT = 12; 

// const PORTFOLIO_ALL = Array.from({ length: TOTAL_ARTWORK_COUNT }, (_, index) => {
//     const id = index + 1;
//     return {
//         id,
//         imageUrl: `/artistPortfolio${id}.JPG`,
//     };
// }).sort((a, b) => b.id - a.id); // Descending order: highest number (newest) first

// // last 3 added for the Artist Spotlight
// const RECENT_ARTWORK = PORTFOLIO_ALL.slice(0, 3);

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
    // ok so passing props here, the first parameter is the page you wann go to and the second one (anchkr) is used if you wanna go to a specific section ie> #booking, #prices
    // anddd you dont need to add the arrow function when you do onClick cayse we got you here o7
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

  // ======================
  // FOR ARTIST SECTION
  // ======================

      // const [artwork] = useState(PORTFOLIO_ALL);
      // const [selectedArtwork, setSelectedArtwork] = useState(null);
  
     
      // useEffect(() => {
      //     if (!selectedArtwork) return;
  
      //     const handleKeyDown = (e) => {
      //         if (e.key === "Escape") setSelectedArtwork(null);
      //     };
  
      //     document.addEventListener("keydown", handleKeyDown);
      //     document.body.classList.add("lightbox-open");
  
      //     return () => {
      //         document.removeEventListener("keydown", handleKeyDown);
      //         document.body.classList.remove("lightbox-open");
      //     };
      // }, [selectedArtwork]);

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
            <a className={`nav-btn ${page === 'artist' ? 'active' : ''}`} onClick={goToPage('artist')} id="artist-btn">ARTIST</a>
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
                  {/* I NEED TO DO SOMETHING ABOUT THE MEET THE ARTIST BUTTON...PASS PROPS SOW E CAN USE THE GO TO PAGE FUNTION THERE ALSO? */}
                  <Bio />
                </section>

                
                  <Row>
                    
                      <Col md={6} id="pricing">
                      

                      <PriceModal />
                    </Col>

                    <Col md={6} id="booking">
                      <BookingForm />
                    </Col>

                  </Row>
                  <Footer />
              </section>
            )}

            {page === 'artist' && (
              <ArtistPage />
//               <section id="artist">
//             <Container fluid>
//                 {/* <Navbar /> */}
//                 <Row>
//                     <Col md={4} className="profile-wrapper">
//                         <div className="artist-profile">
//                             <svg width="0" height="0" style={{ position: 'absolute' }}>
//                                 <defs>
//                                     <clipPath id="profile-clip" clipPathUnits="objectBoundingBox">
//                                         <path d="M 0,1 L 0,0.3 A 0.5,0.3 0,0,1 1,0.3 L 1,1 Z" />
//                                     </clipPath>
//                                 </defs>
//                             </svg>
//                             <img src={ArtistProfile} alt="Artist Profile Img" id="artist-img" />
//                         </div>
//                     </Col>
//                     <Col md={8}>
//                         <p>
// Hi, I’m Lameez, the artist and founder behind Illuminated By Artistry.

// For me, what I do has always been about so much more than tattoos, piercings and permanent brows. I believe these forms of self-expression can be a beautiful part of self-love, healing and becoming comfortable in your own skin.

// People walk through my doors for so many different reasons. Sometimes it’s simply because they want to feel beautiful, confident or more like themselves. 

// Sometimes it’s to celebrate a new chapter, reclaim their confidence, or finally do something they’ve always wanted to do. 

// And sometimes, there’s a much deeper story behind the appointment — a tattoo to honour and remember someone they’ve lost, a meaningful symbol to carry with them, or something that represents a chapter of their life they’ve survived and grown through.

// I feel incredibly privileged to be trusted with those stories.

// I don’t believe I’m here simply to create something beautiful on someone’s skin. I believe I have the opportunity to be a small part of someone’s journey — to create a space where they can express themselves, celebrate themselves, remember someone they love, or simply walk out feeling a little more confident than when they walked in.

// If something I create can make someone look in the mirror and feel beautiful, remind them of their strength, help them carry a memory close to them, or contribute in even the smallest way to their healing and self-love, then I feel like my purpose has been fulfilled.

// That is what Illuminated By Artistry means to me.
// It’s creativity, connection, self-expression and healing — all brought together through the work I love.
//                         </p>
//                     </Col>
//                 </Row>

//                 {/* Artist Spotlight (Latest 3 Artwork) */}
//                 <Row className="recent-artwork">
//                     <img src={titleFlourish} alt="Title Flourish" className="title-flourish left" />
//                     <h2>Artist Spotlight</h2>
//                     <img src={titleFlourish} alt="Title Flourish" className="title-flourish" />
//                     <p>Latest Artwork</p>

//                     {RECENT_ARTWORK.map((item) => (
//                         <Col md={4} key={item.id} className="recent-carousel">
//                             <div className="portfolio-frame">
//                                 <div className="portfolio-image">
//                                     <img src={item.imageUrl} alt={`Recent Artwork ${item.id}`} className="img-fluid" />
//                                 </div>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>

//                 {/* Full Artist Portfolio */}
//                 <section id="portfolio">
//                     <div className="portfolio-title">
//                         <img src={titleFlourish} alt="Title Flourish" className="title-flourish left" />
//                         <h2>Artist Portfolio</h2>
//                         <img src={titleFlourish} alt="Title Flourish" className="title-flourish" />

//                         <Row className="mt-4">
//                             {artwork.map((item, index) => (
//                                 <Col md={3} key={item.id || index} className="artwork-wrapper mb-4">
//                                     <button
//                                         type="button"
//                                         onClick={() => setSelectedArtwork(item)}
//                                         className="artwork-link border-0 bg-transparent p-0 w-100">
//                                         <div className="portfolio-frame">
//                                             <div className="portfolio-image">
//                                                 <img
//                                                     src={item.imageUrl}
//                                                     alt={`Portfolio Image ${item.id}`}
//                                                     className="img-fluid" />
//                                             </div>
//                                         </div>
//                                     </button>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </div>

//                     {/* Lightbox Modal */}
//                     {selectedArtwork && (
//                         <div
//                             className="lightbox-overlay"
//                             onClick={() => setSelectedArtwork(null)}
//                             role="dialog"
//                             aria-modal="true"
//                         >
//                             <button
//                                 type="button"
//                                 className="lightbox-close"
//                                 onClick={() => setSelectedArtwork(null)}
//                                 aria-label="Close"
//                             >
//                                 ×
//                             </button>
//                             <img
//                                 src={selectedArtwork.imageUrl}
//                                 alt={`Selected artwork ${selectedArtwork.id}`}
//                                 className="lightbox-image"
//                                 onClick={(e) => e.stopPropagation()}
//                             />
//                         </div>
//                     )}
//                 </section>
//             </Container>
//         </section>
              )}
          </div>
        </div>
        
      </main>

    </div>
  );
}
