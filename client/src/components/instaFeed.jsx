import React, { useState, useEffect } from "react";

export default function InstaFeed() {
    // 🦇 Placeholder state (TO DO: Swap API data or widget later)
    const [posts, setPosts] = useState([
        { id: 1, imageUrl: null, caption: "Latest flash drop" },
        { id: 2, imageUrl: null, caption: "Healed work" },
        { id: 3, imageUrl: null, caption: "In progress" },
    ]);

    // TODO tomorrow: Fetch real posts from backend or drop an embed widget here
    useEffect(() => {
        // fetch('http://localhost:5050/api/instagram')
        //   .then(res => res.json())
        //   .then(data => setPosts(data))
    }, []);

    return (
        <section className="insta-updates-container py-5 text-center">
            
            {/* Header */}
            <h2 className="insta-title mb-5">INSTA UPDATES</h2>

            {/* 3-Card Grid */}
            <div className="container">
                <div className="row justify-content-center gap-4">
                    
                    {posts.map((post, index) => (
                        <div key={post.id || index} className="insta-card-wrapper col-12 col-md-3">
                            <div className="insta-frame-card">
                                
                                
                                <div className="corner-decor top-left"></div>
                                <div className="corner-decor top-right"></div>
                                <div className="corner-decor bottom-left"></div>
                                <div className="corner-decor bottom-right"></div>

                                {/* Image or placeholder slot */}
                                <div className="insta-image-container">
                                    {post.imageUrl ? (
                                        <img src={post.imageUrl} alt={post.caption} className="img-fluid" />
                                    ) : (
                                        <div className="placeholder-box">
                                            
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}