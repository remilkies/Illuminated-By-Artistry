import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import titleFlourish from '../assets/titleFlourish.svg';
import ArtistProfile from '/artistProfile.JPG';
import Navbar from "../components/navbar";

// update this number when you add more artistPortfolio*.JPG o7
const TOTAL_ARTWORK_COUNT = 12; 

const PORTFOLIO_ALL = Array.from({ length: TOTAL_ARTWORK_COUNT }, (_, index) => {
    const id = index + 1;
    return {
        id,
        imageUrl: `/artistPortfolio${id}.JPG`, /
    };
}).sort((a, b) => b.id - a.id); // Descending order: highest number (newest) first

// last 3 added for the Artist Spotlight
const RECENT_ARTWORK = PORTFOLIO_ALL.slice(0, 3);

export default function PortfolioPage() {
    const [artwork] = useState(PORTFOLIO_ALL);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

   
    useEffect(() => {
        if (!selectedArtwork) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedArtwork(null);
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.classList.add("lightbox-open");

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("lightbox-open");
        };
    }, [selectedArtwork]);

    return (
        <section id="artist">
            <Container fluid>
                <Navbar />
                <Row>
                    <Col md={4} className="profile-wrapper">
                        <div className="artist-profile">
                            <svg width="0" height="0" style={{ position: 'absolute' }}>
                                <defs>
                                    <clipPath id="profile-clip" clipPathUnits="objectBoundingBox">
                                        <path d="M 0,1 L 0,0.3 A 0.5,0.3 0,0,1 1,0.3 L 1,1 Z" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <img src={ArtistProfile} alt="Artist Profile Img" id="artist-img" />
                        </div>
                    </Col>
                    <Col md={8}>
                        <p>
Hi, I’m Lameez, the artist and founder behind Illuminated By Artistry.

For me, what I do has always been about so much more than tattoos, piercings and permanent brows. I believe these forms of self-expression can be a beautiful part of self-love, healing and becoming comfortable in your own skin.

People walk through my doors for so many different reasons. Sometimes it’s simply because they want to feel beautiful, confident or more like themselves. 

Sometimes it’s to celebrate a new chapter, reclaim their confidence, or finally do something they’ve always wanted to do. 

And sometimes, there’s a much deeper story behind the appointment — a tattoo to honour and remember someone they’ve lost, a meaningful symbol to carry with them, or something that represents a chapter of their life they’ve survived and grown through.

I feel incredibly privileged to be trusted with those stories.

I don’t believe I’m here simply to create something beautiful on someone’s skin. I believe I have the opportunity to be a small part of someone’s journey — to create a space where they can express themselves, celebrate themselves, remember someone they love, or simply walk out feeling a little more confident than when they walked in.

If something I create can make someone look in the mirror and feel beautiful, remind them of their strength, help them carry a memory close to them, or contribute in even the smallest way to their healing and self-love, then I feel like my purpose has been fulfilled.

That is what Illuminated By Artistry means to me.
It’s creativity, connection, self-expression and healing — all brought together through the work I love.
                        </p>
                    </Col>
                </Row>

                {/* Artist Spotlight (Latest 3 Artwork) */}
                <Row className="recent-artwork">
                    <img src={titleFlourish} alt="Title Flourish" className="title-flourish left" />
                    <h2>Artist Spotlight</h2>
                    <img src={titleFlourish} alt="Title Flourish" className="title-flourish" />
                    <p>Latest Artwork</p>

                    {RECENT_ARTWORK.map((item) => (
                        <Col md={4} key={item.id} className="recent-carousel">
                            <div className="portfolio-frame">
                                <div className="portfolio-image">
                                    <img src={item.imageUrl} alt={`Recent Artwork ${item.id}`} className="img-fluid" />
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* Full Artist Portfolio */}
                <section id="portfolio">
                    <div className="portfolio-title">
                        <img src={titleFlourish} alt="Title Flourish" className="title-flourish left" />
                        <h2>Artist Portfolio</h2>
                        <img src={titleFlourish} alt="Title Flourish" className="title-flourish" />

                        <Row className="mt-4">
                            {artwork.map((item, index) => (
                                <Col md={3} key={item.id || index} className="artwork-wrapper mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedArtwork(item)}
                                        className="artwork-link border-0 bg-transparent p-0 w-100">
                                        <div className="portfolio-frame">
                                            <div className="portfolio-image">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={`Portfolio Image ${item.id}`}
                                                    className="img-fluid" />
                                            </div>
                                        </div>
                                    </button>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Lightbox Modal */}
                    {selectedArtwork && (
                        <div
                            className="lightbox-overlay"
                            onClick={() => setSelectedArtwork(null)}
                            role="dialog"
                            aria-modal="true"
                        >
                            <button
                                type="button"
                                className="lightbox-close"
                                onClick={() => setSelectedArtwork(null)}
                                aria-label="Close"
                            >
                                ×
                            </button>
                            <img
                                src={selectedArtwork.imageUrl}
                                alt={`Selected artwork ${selectedArtwork.id}`}
                                className="lightbox-image"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
                </section>
            </Container>
        </section>
    );
}