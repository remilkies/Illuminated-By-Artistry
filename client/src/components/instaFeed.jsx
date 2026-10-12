import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import './instaFeed.css'
import titleFlourish from '../assets/titleFlourish.svg';
import cornorDecor from '../assets/cornerDecor.svg';

const PINNED_PROMOS = [
    {
        id: 1,
        imageUrl: "/promo1.jpg",
        caption: "Tattoo Promo",
        permalink: "https://www.instagram.com/"
    },
    {
        id: 2,
        imageUrl: "/promo2.jpg",
        caption: "Piercing Special",
        permalink: "https://www.instagram.com/"
    },
    {
        id: 3,
        imageUrl: "/promo3.jpg",
        caption: "Flash Drop",
        permalink: "https://www.instagram.com/"
    },
];

export default function InstaFeed() {
    const [posts, setPosts] = useState(PINNED_PROMOS);

    return (
        <section className="insta-updates-container py-5 text-center">
            
            <div className="insta-title">
                <img src={titleFlourish} alt="Title Flourish" className="title-flourish left" />
                <h2>Active Promotions</h2>
                <img src={titleFlourish} alt="Title Flourish" className="title-flourish" />
            </div>

            <div className="container posts-container">
                <Row className="justify-content-center g-4">
                    {posts.map((post, index) => (
                        /* Use md={4} so 3 cards comfortably fill 12 columns (4 + 4 + 4 = 12) */
                        <Col xs={12} md={4} key={post.id || index} className="insta-card-wrapper d-flex justify-content-center">
                            <a 
                                href={post.permalink || "https://www.instagram.com/"} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="insta-link w-100"
                            >
                                <div className="insta-frame-card">
                                    <img src={cornorDecor} alt="" className="corner-decor top-left" />
                                    <img src={cornorDecor} alt="" className="corner-decor top-right"/>
                                    <img src={cornorDecor} alt="" className="corner-decor bottom-left"/>
                                    <img src={cornorDecor} alt="" className="corner-decor bottom-right" />

                                    <div className="insta-image-container">
                                        {post.imageUrl ? (
                                            <img 
                                                src={post.imageUrl} 
                                                alt={post.caption || "Instagram Post"} 
                                                className="img-fluid" 
                                            />
                                        ) : (
                                            <div className="placeholder-box"></div>
                                        )}
                                    </div>
                                </div>
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>

        </section>
    );
}