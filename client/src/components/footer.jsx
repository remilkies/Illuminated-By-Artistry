import React, { useState } from 'react';
import './footer.css'
import { Col, Container, Row } from 'react-bootstrap';

import logo from '/iba-logo.svg'
import divider from '../assets/divider.svg';
import titleFlourish from '../assets/titleFlourish.svg';

import whatsappIcon from '/whatsapp-icon.svg';
import instagramIcon from '/instagram-icon.svg';
import emailIcon from '/email-icon.svg';
import locationIcon from '/location-icon.svg';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
            const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                setEmail('');
                setShowSuccessModal(true); // Trigger our custom dark-backdrop modal!
            } else {
                alert(`Error: ${result.error || 'Could not subscribe.'}`);
            }
        } catch (err) {
            console.error("Subscription network error:", err);
            alert("Failed to connect to the server. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Container fluid className="footer">
                <Row>
                    <Col md={6}>
                        <div className='footer-logo'>
                            <img src={logo} className='footer-img' alt='IBA Logo' />
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className='newsletter-container'>
                            <h2 className='newsletter-text'>Let me know when there’s new promotions!</h2>

                            <form onSubmit={handleSubscribe} className='newsletter-subscribe'>
                                <div className='newsletter-email'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </form>
                        </div>

                        <img src={divider} className='contact-divider' alt='' />

                        <div className="contact-us-container">
                            <h2>Contact Us</h2>
                            <div className='contact-us'>
                                <div className="contact-link">
                                    <img src={instagramIcon} className='contact-icon' alt='Instagram' />
                                    <p>@illuminated_by_artistry</p>
                                </div>

                                <div className="contact-link">
                                    <img src={whatsappIcon} className='contact-icon' alt='Whatsapp' />
                                    <p>068 042 4933</p>
                                </div>

                                <div className="contact-link">
                                    <img src={emailIcon} className='contact-icon' alt='Email' />
                                    <p>illuminatedbyartistry@gmail.com</p>
                                </div>

                                <div className="contact-link">
                                    <img src={locationIcon} className='contact-icon' alt='Location' />
                                    <p>Little falls, roodepoort</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

{showSuccessModal && (
            <div className="iba-modal-overlay">
                <div className="iba-modal-card">
                    <div className="iba-modal-header">
                        <img src={titleFlourish} alt="" className="iba-modal-flourish left" />
                        <h3>You're On The List</h3>
                        <img src={titleFlourish} alt="" className="iba-modal-flourish" />
                    </div>
                    
                    <div className="iba-modal-body">
                        <p>✦ Thank you for subscribing! We'll make sure you're the first to know when new flash drops and promotions arrive. 🦇✨</p>
                        <p style={{ fontSize: '0.8rem', opacity: '0.75', marginTop: '0.75rem' }}>
                            We're mindful of how annoying emails can be, so don't worry—you can unsubscribe at any time &lt;3
                        </p>
                    </div>

                    <button 
                        type="button" 
                        className="iba-modal-btn"
                        onClick={() => setShowSuccessModal(false)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        )}
        </>
    )
}