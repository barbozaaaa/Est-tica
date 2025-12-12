import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Detectar hash routes e redirecionar para o painel admin
    if (location.hash) {
      const hash = location.hash.substring(1).toLowerCase() // Remove o # e converte para minúsculo
      
      // Aceita diferentes variações do hash para admin
      if (hash === 'admin' || hash === 'esteticavercel' || hash === 'crm' || hash === 'painel') {
        // Limpar o hash da URL e redirecionar para /admin
        window.history.replaceState(null, '', '/admin')
        navigate('/admin', { replace: true })
      }
    }
  }, [location.hash, navigate])

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

