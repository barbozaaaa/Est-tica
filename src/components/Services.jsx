import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Services.css'

const Services = () => {
  const navigate = useNavigate()

  const services = [
    {
      id: 'extensao-cilios',
      title: 'Extensão de Cílios',
      description: 'Aquele olhar de boneca, sem precisar de rímel. Cílios perfeitos que realçam sua beleza natural com técnica e cuidado.',
      icon: '👁️',
      gradient: 'linear-gradient(135deg, #ffc0cb 0%, #ffb6c1 100%)'
    },
    {
      id: 'design-sobrancelhas',
      title: 'Design de Sobrancelhas',
      description: 'Desenhando o arco perfeito que ilumina o seu rosto. Cada traço é pensado para valorizar suas características únicas.',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #ffc0cb 0%, #d4af37 100%)'
    },
    {
      id: 'micropigmentacao-labial',
      title: 'Micropigmentação Labial',
      description: 'Trazendo de volta a cor e o contorno que os seus lábios merecem! Realce natural e duradouro com técnica especializada.',
      icon: '💋',
      gradient: 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)'
    }
  ]

  const handleServiceClick = (serviceId) => {
    navigate(`/servico/${serviceId}`)
  }

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Meus Serviços</h2>
          <p className="services-subtitle">
            Especialidades dedicadas a realçar sua beleza natural com carinho e técnica
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="service-icon" style={{ background: service.gradient }}>
                <span className="service-emoji">{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-cta">
                <span>Saiba mais →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

