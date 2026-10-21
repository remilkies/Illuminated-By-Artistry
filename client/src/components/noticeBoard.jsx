import React from "react";
import noticeBoard from "../assets/noticeBoard.svg";
import titleFlourish from '../assets/titleFlourish.svg';
import divider from "../assets/divider.svg";
import heart from "../assets/heart.svg";
import "./noticeBoard.css"; 

export default function NoticeBoard() {
    return (
        <div className="notice-container">
            {/* The SVG Notice Board container with chains */}
            <div className="notice-board">
                
                <div className="notice-header">
                    <h1 className="notice-title">
                        <img src={titleFlourish} alt="Title Flourish" className="title-flourish left" />
                        Important
                        <img src={titleFlourish} alt="Title Flourish" className="title-flourish right" />
                    </h1>
                    <h3 className="notice-subtitle">Studio Update</h3>
                </div>

                <img src={divider} className="divider" alt="divider" />

                <div className="notice-body">
                    <p>
                        For the safety, comfort and peace of mind of both myself and my clients,
                        Illuminated By Artistry will now be a
                    </p>
                    <p className="female-only">Female-only studio.</p>
                    <p>
                        Moving forward, all tattoo, piercing and aesthetic appointments will be 
                        exclusively available to female clients.
                    </p>

                    <span className="thanks">
                        <p>Thank you</p>
                        <img src={heart} className="heart" alt="heart" />
                    </span>

                    <p>
                        to all of my amazing clients who continue to support and respect the boundaries 
                        I have put in place. Your trust and support mean the world to me. <br /> 
                        <strong>ILLUMINATED BY ARTISTRY</strong>
                    </p>
                </div>

            </div>
        </div>
    );
}