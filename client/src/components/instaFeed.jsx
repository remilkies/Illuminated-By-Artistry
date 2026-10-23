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
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        if (!selectedPost) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedPost(null);
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.classList.add("lightbox-open");

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("lightbox-open");
        };
    }, [selectedPost]);

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

                        <Col xs={12} md={4} key={post.id || index} className="insta-card-wrapper d-flex justify-content-center">
                            {/* button instead of <a> because clicking opens the lightbox now */}
                            <button
                                type="button"
                                onClick={() => setSelectedPost(post)}
                                className="insta-link w-100"
                                aria-label={`View ${post.caption} full size`}
                            >
                                <div className="insta-frame-card">
                                    <img src={cornorDecor} alt="" className="corner-decor top-left" />
                                    <img src={cornorDecor} alt="" className="corner-decor top-right" />
                                    <img src={cornorDecor} alt="" className="corner-decor bottom-left" />
                                    <img src={cornorDecor} alt="" className="corner-decor bottom-right" />

                                    <div className="insta-image-container">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl}
                                                alt={post.caption || "Promotion"}
                                                className="img-fluid"
                                            />
                                        ) : (
                                            <div className="placeholder-box"></div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        </Col>
                    ))}
                </Row>
            </div>

            {selectedPost && (
                <div
                    className="lightbox-overlay"
                    onClick={() => setSelectedPost(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedPost.caption}
                >
                    <button
                        type="button"
                        className="lightbox-close"
                        onClick={() => setSelectedPost(null)}
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <img
                        src={selectedPost.imageUrl}
                        alt={selectedPost.caption}
                        className="lightbox-image"
                        
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

        </section>
    );
}