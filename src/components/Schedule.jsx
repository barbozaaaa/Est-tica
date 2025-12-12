import React, { useState } from 'react'
import { saveAppointment } from '../utils/crm'
import './Schedule.css'

const Schedule = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const services = [
    { value: 'extensao-cilios', label: 'Extensão de Cílios' },
    { value: 'design-sobrancelhas', label: 'Design de Sobrancelhas' },
    { value: 'micropigmentacao-labial', label: 'Micropigmentação Labial' },
    { value: 'consulta', label: 'Consulta/Outro' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar mensagens de erro ao editar
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      // Validar campos obrigatórios
      if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.')
      }

      // Salvar no CRM (localStorage)
      const appointment = saveAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'Não informado',
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: formData.message || '',
        source: 'website_form'
      })

      // Enviar também via WhatsApp
      const phoneNumber = '5511999999999' // ATUALIZE COM SEU NÚMERO REAL
      const whatsappMessage = encodeURIComponent(
        `Olá Thaffny! Gostaria de agendar um horário.\n\n` +
        `Nome: ${formData.name}\n` +
        `Telefone: ${formData.phone}\n` +
        `Email: ${formData.email || 'Não informado'}\n` +
        `Serviço: ${services.find(s => s.value === formData.service)?.label || formData.service}\n` +
        `Data: ${formData.date}\n` +
        `Horário: ${formData.time}\n` +
        `${formData.message ? `Mensagem: ${formData.message}` : ''}`
      )
      
      // Abrir WhatsApp
      window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank')

      // Mostrar sucesso
      setSubmitSuccess(true)
      
      // Limpar formulário
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: '',
        message: ''
      })

      // Esconder mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)

    } catch (error) {
      setSubmitError(error.message || 'Erro ao enviar agendamento. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Obter data mínima (hoje)
  const today = new Date().toISOString().split('T')[0]

  return (
    <section className="schedule" id="schedule">
      <div className="schedule-container">
        <div className="schedule-header">
          <h2 className="schedule-title">Agende Seu Horário</h2>
          <p className="schedule-subtitle">
            Preencha o formulário abaixo e vamos encontrar o melhor horário para você!
          </p>
        </div>

        <form className="schedule-form" onSubmit={handleSubmit}>
          <div className="schedule-form-grid">
            <div className="schedule-form-group">
              <label htmlFor="name">
                Nome Completo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div className="schedule-form-group">
              <label htmlFor="phone">
                Telefone/WhatsApp <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(11) 98765-4321"
              />
            </div>

            <div className="schedule-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
              />
            </div>

            <div className="schedule-form-group">
              <label htmlFor="service">
                Serviço Desejado <span className="required">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um serviço</option>
                {services.map(service => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="schedule-form-group">
              <label htmlFor="date">
                Data Preferida <span className="required">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={today}
              />
            </div>

            <div className="schedule-form-group">
              <label htmlFor="time">
                Horário Preferido <span className="required">*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="schedule-form-group full-width">
            <label htmlFor="message">Mensagem ou Observações</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Alguma observação especial ou preferência?"
              rows="4"
            />
          </div>

          {submitError && (
            <div className="schedule-form-message error">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="schedule-form-message success">
              ✓ Agendamento enviado com sucesso! Você será redirecionado para o WhatsApp.
            </div>
          )}

          <div className="schedule-form-actions">
            <button 
              type="submit" 
              className="schedule-form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Agendamento'}
            </button>
          </div>

          <p className="schedule-form-note">
            <span className="required">*</span> Campos obrigatórios. 
            Após enviar, você será redirecionado para o WhatsApp para confirmar o agendamento.
          </p>
        </form>
      </div>
    </section>
  )
}

export default Schedule
