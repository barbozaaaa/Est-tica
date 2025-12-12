import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Schedule from './components/Schedule'
import Gallery from './components/Gallery'
import ServiceDetail from './pages/ServiceDetail'
import Admin from './pages/Admin'
import './App.css'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Schedule />
      <Contact />
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servico/:serviceId" element={<ServiceDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App

