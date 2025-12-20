import { useState } from 'react'
import Navbar from './components/NavBar/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        
      </Routes>
    </BrowserRouter>
  )
}


export default App
