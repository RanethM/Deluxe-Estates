

import React, { useEffect } from "react";
import "./About.css";

export default function AboutUs() {
  const teamMembers = [
    { name: "Jordan Bergendhal", role: "Founder & CEO", image: "images/people/jordan-bergendahl.jpg" },
    { name: "Josh Butler", role: "Head of Operations", image: "images/people/josh-butler.jpg" },
    { name: "Anita Williams", role: "Customer Support Lead", image: "images/people/anita-williams.jpg" },
    { name: "Anna Nekrashevich", role: "Support Assistant Lead", image: "images/people/anna-nekrashevich.jpg" }
  ];
useEffect(() => {
  const elements = document.querySelectorAll(".story-card, .fade-up");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active", "show");
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(el => observer.observe(el));
}, []);



  return (
    <div className="about-page">

      {/* HERO */}
      <header className="about-hero">
        <div className="hero-overlay" />
        <div className="hero-content fade-up">
          <h1>Deluxe Estates</h1>
          <p>Luxury living, crafted with trust and elegance</p>
        </div>
      </header>

      {/* STICKY STORY */}
<section className="about-story">
  <div className="container story-grid">

    {/* STICKY COLUMN */}
    <div className="story-left">
      <h2>Who We Are</h2>
      <p>
        A refined real estate experience built on trust,
        elegance, and innovation.
      </p>
    </div>

    {/* SCROLLING COLUMN */}
{/* SCROLLING COLUMN */}
<div className="story-right">

  <div className="story-card">
    <h3>Our Vision</h3>
    <p className="story-lead">
      To redefine luxury living by connecting people with
      spaces that elevate their lifestyle.
    </p>

    <ul className="story-points">
      <li>Curated premium properties across prime locations</li>
      <li>Design-focused living, not just real estate</li>
      <li>Future-ready homes built for modern lifestyles</li>
    </ul>
  </div>

  <div className="story-card">
    <h3>Our Mission</h3>
    <p className="story-lead">
      We simplify property discovery through clarity,
      technology, and personalized service.
    </p>

    <ul className="story-points">
      <li>Smart search tools tailored to real needs</li>
      <li>Transparent pricing with verified listings</li>
      <li>Guidance from first visit to final ownership</li>
    </ul>
  </div>

  <div className="story-card">
    <h3>Our Values</h3>
    <p className="story-lead">
      Our values guide every interaction, decision,
      and experience we deliver.
    </p>

    <ul className="story-points">
      <li><strong>Integrity:</strong> Honest listings, no hidden details</li>
      <li><strong>Excellence:</strong> Premium service at every step</li>
      <li><strong>Trust:</strong> Long-term relationships over quick sales</li>
    </ul>
  </div>

</div>


  </div>
</section>


      {/* WHY US */}
      <section className="why-us">
        <div className="container">
          <h2 className="section-title fade-up">Why Choose Us</h2>

          <div className="features">
            <div className="feature fade-up">
              <h3>Curated Properties</h3>
              <p>Only verified, high-quality listings that meet our standards.</p>
            </div>

            <div className="feature fade-up">
              <h3>Smart Search</h3>
              <p>Advanced filters designed around your lifestyle.</p>
            </div>

            <div className="feature fade-up">
              <h3>Dedicated Support</h3>
              <p>Guidance from discovery to ownership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team">
        <div className="container">
          <h2 className="section-title fade-up">Our Leadership</h2>

          <div className="team-grid">
            {teamMembers.map((m, i) => (
             <div key={i} className="team-card fade-up">
                <div className="team-image">
                  <img src={m.image} alt={m.name} />
                </div>
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <p>© 2025 Deluxe Estates. Crafted with excellence.</p>
      </footer>
    </div>
  );
}
