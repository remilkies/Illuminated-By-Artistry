import React from "react"
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './bio.css'

import ArtistProfile from '/artistProfile.JPG';

export default function Bio() {
    
    return (

        <Container fluid>
            <Row className="bio-container">
                
            <Col md={4} className="profile-wrapper">
                    <div className="artist-profile">
                        
                        <svg width="0" height="0" style={{ position: 'absolute' }}>
                          <defs>
                            <clipPath id="profile-clip" clipPathUnits="objectBoundingBox">
                              <path d="M 0,1 
                                       L 0,0.3 
                                       A 0.5,0.3 0,0,1 1,0.3 
                                       L 1,1 
                                       Z" />
                            </clipPath>
                          </defs>
                        </svg>

                        <img src={ArtistProfile} alt="Artist Profile Img" id="artist-img"/>
                    </div>
                </Col>

                <Col md={8} className="bio-blurb">
                    <div className="bio-header">
                        <p>Meet the artist</p>
                        <h3>Lameez layloo</h3>
                    </div>
                    <div className="bio-text">
                        <span className="bio-quote">“If something I create can make someone look in the mirror and feel beautiful, remind them of their strength, or contribute to their healing— <br />then my purpose is fulfilled.”</span>
                        <p className="bio-body">At Illuminated By Artistry, body art is a journey of self-expression, connection, and healing. Whether you’re celebrating a new chapter, honouring a memory, or reclaiming your confidence, each piece is crafted in a safe, intentional space designed to help you feel beautiful, empowered, and truly at home in your skin. I feel deeply privileged to be entrusted with your story &lt;3 </p>
                    </div>

                    <button onClick={() => navigate("../pages/Artist.jsx")} className="iba-btn bio-btn"> Meet the Artist</button>
                </Col>
                </Row>
                </Container>


    )
}
