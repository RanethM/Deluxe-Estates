import { useState } from 'react'
import Navbar from './components/NavBar/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home'
import AboutUs from './pages/AboutUs/About'
import Contact from './pages/ContactUs/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
