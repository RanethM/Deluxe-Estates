import { useState } from 'react'
import Navbar from './components/NavBar/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home'
import AboutUs from './pages/AboutUs/About'
import Contact from './pages/ContactUs/Contact'
import Search from './search'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyPage from "./pages/properties/PropertyPage";


function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/search" element={<Search />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties/:id" element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
