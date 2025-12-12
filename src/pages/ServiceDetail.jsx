import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ServiceDetail.css'

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()

  const servicesData = {
    'extensao-cilios': {
      title: 'Extensão de Cílios',
      icon: '👁️',
      gradient: 'linear-gradient(135deg, #ffc0cb 0%, #ffb6c1 100%)',
      description: 'Aquele olhar de boneca, sem precisar de rímel.',
      fullDescription: [
        'A extensão de cílios é uma técnica especializada que adiciona fios sintéticos aos seus cílios naturais, criando um olhar mais expressivo e marcante.',
        'Cada fio é aplicado individualmente com precisão, respeitando o formato dos seus olhos e o resultado desejado. A técnica garante um visual natural e duradouro.',
        'O procedimento é realizado com produtos de alta qualidade e técnicas profissionais, garantindo conforto e segurança durante todo o processo.',
        'Após a aplicação, você terá cílios perfeitos que duram semanas, economizando tempo na sua rotina de beleza e sempre com aquele olhar de boneca desejado.'
      ],
      duration: '2-3 horas',
      maintenance: 'Retoque a cada 2-3 semanas'
    },
    'design-sobrancelhas': {
      title: 'Design de Sobrancelhas',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #ffc0cb 0%, #d4af37 100%)',
      description: 'Desenhando o arco perfeito que ilumina o seu rosto.',
      fullDescription: [
        'O design de sobrancelhas é uma arte que valoriza suas características faciais únicas. Cada traço é pensado para criar harmonia e equilíbrio no seu rosto.',
        'Utilizo técnicas avançadas de análise facial para determinar o formato ideal das suas sobrancelhas, considerando a estrutura óssea, formato dos olhos e estilo pessoal.',
        'O procedimento inclui depilação com pinça, desenho personalizado e finalização com produtos específicos para manter o resultado perfeito.',
        'Com o design correto, suas sobrancelhas se tornam a moldura perfeita para seus olhos, realçando sua beleza natural e criando um visual mais harmonioso e elegante.'
      ],
      duration: '1 hora',
      maintenance: 'Retoque a cada 3-4 semanas'
    },
    'micropigmentacao-labial': {
      title: 'Micropigmentação Labial',
      icon: '💋',
      gradient: 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)',
      description: 'Trazendo de volta a cor e o contorno que os seus lábios merecem!',
      fullDescription: [
        'A micropigmentação labial é uma técnica que devolve cor, definição e contorno aos seus lábios através da aplicação de pigmentos especiais.',
        'Ideal para quem deseja ter lábios sempre com cor, mesmo sem maquiagem, ou para corrigir assimetrias e definir melhor o contorno labial.',
        'O procedimento é realizado com anestesia tópica para garantir máximo conforto. Os pigmentos são escolhidos especialmente para combinar com sua cor natural e tom de pele.',
        'O resultado é natural, duradouro e realça sua beleza, deixando seus lábios sempre com aparência saudável e definida, mesmo sem maquiagem.'
      ],
      duration: '2 horas',
      maintenance: 'Retoque após 30-45 dias'
    }
  }

  const service = servicesData[serviceId]

  if (!service) {
    return (
      <div className="service-detail-error">
        <h2>Serviço não encontrado</h2>
        <button onClick={() => navigate('/')}>Voltar para Home</button>
      </div>
    )
  }

  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientMessage, setClientMessage] = useState('')
  const [showSchedule, setShowSchedule] = useState(false)

  const handleSchedule = () => {
    setShowSchedule(true)
  }

  const handleSubmitSchedule = (e) => {
    e.preventDefault()
    const phoneNumber = '5511999999999' // ATUALIZE COM SEU NÚMERO REAL
    const message = encodeURIComponent(
      `Olá Thaffny! Gostaria de agendar ${service.title}.\n\n` +
      `Nome: ${clientName}\n` +
      `Telefone: ${clientPhone}\n` +
      `Mensagem: ${clientMessage || 'Gostaria de mais informações sobre este serviço.'}`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    
    // Reset form
    setClientName('')
    setClientPhone('')
    setClientMessage('')
    setShowSchedule(false)
  }

  return (
    <div className="service-detail">
      <button className="service-detail-back" onClick={() => navigate('/')}>
        ← Voltar
      </button>
      
      <div className="service-detail-container">
        <div className="service-detail-header">
          <div className="service-detail-icon" style={{ background: service.gradient }}>
            <span className="service-detail-emoji">{service.icon}</span>
          </div>
          <h1 className="service-detail-title">{service.title}</h1>
          <p className="service-detail-subtitle">{service.description}</p>
        </div>

        <div className="service-detail-content">
          <div className="service-detail-info">
            <h2 className="service-detail-section-title">Sobre o Serviço</h2>
            <div className="service-detail-description">
              {service.fullDescription.map((paragraph, index) => (
                <p key={index} className="service-detail-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="service-detail-specs">
              <div className="service-detail-spec">
                <span className="spec-label">Duração:</span>
                <span className="spec-value">{service.duration}</span>
              </div>
              <div className="service-detail-spec">
                <span className="spec-label">Manutenção:</span>
                <span className="spec-value">{service.maintenance}</span>
              </div>
            </div>
          </div>

          <div className="service-detail-schedule">
            {!showSchedule ? (
              <div className="schedule-prompt">
                <h3 className="schedule-prompt-title">Pronta para agendar?</h3>
                <p className="schedule-prompt-text">
                  Preencha seus dados e vamos agendar seu horário!
                </p>
                <button className="schedule-prompt-button" onClick={handleSchedule}>
                  Agendar Agora
                </button>
              </div>
            ) : (
              <form className="schedule-form" onSubmit={handleSubmitSchedule}>
                <h3 className="schedule-form-title">Agendar {service.title}</h3>
                
                <div className="schedule-form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    type="text"
                    id="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    placeholder="Seu nome"
                  />
                </div>

                <div className="schedule-form-group">
                  <label htmlFor="phone">Telefone/WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div className="schedule-form-group">
                  <label htmlFor="message">Mensagem (opcional)</label>
                  <textarea
                    id="message"
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Alguma observação ou preferência de horário?"
                    rows="4"
                  />
                </div>

                <div className="schedule-form-actions">
                  <button type="button" className="schedule-form-cancel" onClick={() => setShowSchedule(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="schedule-form-submit">
                    Enviar via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail

