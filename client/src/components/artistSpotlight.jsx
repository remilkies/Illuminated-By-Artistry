import React from "react"
import { Col, Row, Container } from "react-bootstrap"

const FEATURED_ARTWORK = [
    {
        id: 1,
        imgUrl: "/artistPortfolio24.JPG"
    },
    {
        id: 2,
        imgUrl: "/artistPortfolio18.JPG"
    },
    {
        id: 3,
        imgUrl: "/artistPortfolio35.JPG"
    },
    {
        id: 4,
        imgUrl: "/artistPortfolio19.JPG"
    },
    {
        id: 5,
        imgUrl: "/artistPortfolio36.JPG"
    },
    {
        id: 6,
        imgUrl: "/artistPortfolio38.JPG"
    },
    {
        id: 7,
        imgUrl: "/artistPortfolio4.JPG"
    },
    {
        id: 8,
        imgUrl: "/artistPortfolio31.JPG"
    },
    {
        id: 9,
        imgUrl: "/artistPortfolio26.JPG"
    },
    {
        id: 10,
        imgUrl: "/artistPortfolio14.JPG"
    }

]

export default function ArtistSpotlight(){
    return(

        <Container fluid>
                        <Row className="spotlight-artwork">
                            <div className="title">
                            <img src={titleFlourish} alt="Title Flourish" className="title-flourish left" />
                            <h2>Illuminated Clients</h2>
                            <img src={titleFlourish} alt="Title Flourish" className="title-flourish" />
                            </div>
<div className="marquee-container">
    <div className="marquee-track">
                            {SPOTLIGHT_ARTWORK.map((item) => (
                                <Col md={3} key={item.id} className="spotlight-carousel">
                                    <div className="portfolio-frame">
                                        <div className="portfolio-image">
                                            <img src={item.imageUrl} alt={`Illuminated Client ${item.id}`} className="img-fluid" />
                                        </div>
                                    </div>
                                </Col>
                            ))}
                            {SPOTLIGHT_ARTWORK.map((item) => (
                                <Col md={3} key={item.id} className="spotlight-carousel">
                                    <div className="portfolio-frame">
                                        <div className="portfolio-image">
                                            <img src={item.imageUrl} alt={`Illuminated Client ${item.id}`} className="img-fluid" />
                                        </div>
                                    </div>
                                </Col>
                            ))}
    </div>
</div>

                        </Row>
                        <button className="iba-btn">Full Portfolio</button>
                        </Container>
    )
}