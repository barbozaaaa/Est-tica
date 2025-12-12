import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-ornament"></div>
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-line">Thaffny Silva</span>
            <span className="hero-title-line">Barboza</span>
          </h1>
          <p className="hero-subtitle">
            Transformando olhares e sorrisos com paixão e técnica. Especialista em beleza dedicada a fazer você se sentir incrível!
          </p>
          <button className="hero-cta" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Agende Seu Horário</span>
          </button>
        </div>
        <div className="hero-visual">
          <div className="blush-circle blush-1"></div>
          <div className="blush-circle blush-2"></div>
          <div className="blush-circle blush-3"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero

