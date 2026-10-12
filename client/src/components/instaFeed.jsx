import React, { useState, useEffect } from "react";

const PINNED_PROMOS = [
    {
        id: 1,
        imageUrl: "/promo1.jpg", // Saved directly in your Vite public/ folder
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

    // 🦇 The Noble API Quest (Paused for deployment launch)
    useEffect(() => {
        // const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        // fetch(`${API_BASE_URL}/api/instagram`)
        //   .then(res => res.json())
        //   .then(data => {
        //       if (Array.isArray(data) && data.length > 0) setPosts(data.slice(0, 3));
        //   })
        //   .catch(err => console.log("Using static pinned promos"));
    }, []);

    return (
        <section className="insta-updates-container py-5 text-center">
            

            <h2 className="insta-title mb-5">INSTA UPDATES</h2>


            <div className="container">
                <div className="row justify-content-center gap-4">
                    
                    {posts.map((post, index) => (
                        <div key={post.id || index} className="insta-card-wrapper col-12 col-md-3">
                            <a 
                                href={post.permalink || "https://www.instagram.com/"} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="insta-link"
                            >
                                <div className="insta-frame-card">
                                    

                                    <div className="corner-decor top-left"></div>
                                    <div className="corner-decor top-right"></div>
                                    <div className="corner-decor bottom-left"></div>
                                    <div className="corner-decor bottom-right"></div>

                                    {/* Image Display */}
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
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}