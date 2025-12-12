import React, { useState } from 'react'
import './Gallery.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    '/images/WhatsApp Image 2025-12-12 at 15.43.00.jpeg',
    '/images/WhatsApp Image 2025-12-12 at 15.46.31.jpeg',
    '/images/WhatsApp Image 2025-12-12 at 15.46.31 (1).jpeg',
    '/images/WhatsApp Image 2025-12-12 at 15.46.31 (2).jpeg',
    '/images/WhatsApp Image 2025-12-12 at 15.46.32.jpeg'
  ]

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">Galeria</h2>
          <p className="gallery-subtitle">
            Momentos especiais e transformações que celebram a beleza única de cada cliente
          </p>
        </div>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <img 
                src={image} 
                alt={`Galeria ${index + 1}`}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="gallery-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedImage && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={closeModal}>×</button>
            <img src={selectedImage} alt="Imagem ampliada" />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery

