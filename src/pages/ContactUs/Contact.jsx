import React from "react";
import "./contact.css";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* Background Overlay */}
      <div className="contact-overlay" />

      {/* MAIN CONTENT */}
      <div className="contact-content">
        <div className="contact-container">
          <h1 className="contact-heading">Contact Us</h1>
          <p className="contact-subheading">
            Let’s start a conversation about your next property.
          </p>

          <form className="contact-form">
            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your full name" required />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="Your phone number"
                pattern="[0-9]*"
                required
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your email address" required />
            </div>

            {/* Message */}
            <div className="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="Tell us what you're looking for..." required />
            </div>

            <button className="submit-button">Send Message</button>
          </form>

          {/* INFO */}
          <div className="contact-info">
            <h3>Our Office</h3>
            <p>123 Deluxe Avenue<br />Colombo, Sri Lanka</p>

            <h3>Support</h3>
            <p>Email: support@deluxeestates.com</p>
            <p>Phone: +94 77 123 4567</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="contact-footer">
        © 2025 Deluxe Estates · Crafted with elegance
      </footer>

    </div>
  );
}
