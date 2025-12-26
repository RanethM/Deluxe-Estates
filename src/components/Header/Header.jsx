import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="home-header">

      {/* Background Video */}
      <video
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/header-video.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="header-content">
        <h2>
          Discover a <span>home,</span> that defines 
          <span> your </span> lifestyle..
        </h2>

        <p>
          Thoughtfully chosen spaces that elevate how you live, work, and unwind.
        </p>

        <Link to="/search">
          <button>View Properties</button>
        </Link>
      </div>

    </div>
  )
}

export default Header