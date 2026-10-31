import React from "react"
import { Routes, Route, Link } from "react-router-dom";
import Artist from '../pages/Artist';
import Home from '../App'

export default function Navbar(){
    return(
        <>
        <nav className="navbar">
            <Link to="/">
            <a>HOME</a>
            </Link>
<Link to="/">
    <a href="#pricing">PRICING</a>
    </Link>

<Link to="../pages/Artist">
<a>MEET THE ARTIST</a>
</Link>
    
    <Link to="/">
    <a href="#booking">BOOK NOW</a>
    </Link>
    
  </nav>
  
  <Routes>
                <Route path="/" element={<Home />} />
                <Route path="../pages/Artist" element={<Artist />} />
            </Routes>

  </>
    )
}

