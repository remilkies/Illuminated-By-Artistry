import React from 'react';
import './footer.css'
import { Col, Container, Row } from 'react-bootstrap';

import logo from '/iba-logo.svg'
import divider from '../assets/divider.svg';

import whatsappIcon from '/whatsapp-icon.svg';
import instagramIcon from '/instagram-icon.svg';
import emailIcon from '/email-icon.svg';
import locationIcon from '/location-icon.svg';


export default function Footer() {
    return (
        <>
        <Container fluid className="footer">
            <Row>
                <Col md={6}>
                <div className='footer-logo'>
                    <img src={logo} className='footer-img' alt='IBA Logo'/>
                </div>
                </Col>

        <Col md={6}>
            <div className='newsletter-container'>
                <h2 className='newsletter-text'>Let me know when there’s new promotions!</h2>

                <div className='newsletter-subscribe'>
                    <div className='newsletter-email'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                        />

                    </div>
                    <button>Subscribe</button>
                </div>
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
        </>
    )
}