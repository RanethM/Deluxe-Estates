// Header Component
// Displays hero video, title, subtitle, and call-to-action button for home page
import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

// Home page hero section with video background
const Header = () => {
  const base = import.meta.env.BASE_URL || '/'
  return (
    <div className="home-header">

      {/* Background video for visual impact */}
      <video
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={base + "header-video.mp4"} type="video/mp4" />
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