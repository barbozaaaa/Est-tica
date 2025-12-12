import React, { useState, useEffect } from 'react'
import { getAppointments, exportAppointments, updateAppointmentStatus, deleteAppointment } from '../utils/crm'
import './Admin.css'

const Admin = () => {
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      const apts = await getAppointments()
      // Ordenar por data mais recente primeiro
      apts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setAppointments(apts)
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    }
  }

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter)

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus)
      loadAppointments()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status do agendamento')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      try {
        await deleteAppointment(id)
        loadAppointments()
      } catch (error) {
        console.error('Erro ao deletar agendamento:', error)
        alert('Erro ao excluir agendamento')
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statusColors = {
    pending: '#ffc107',
    confirmed: '#28a745',
    completed: '#17a2b8',
    cancelled: '#dc3545'
  }

  const statusLabels = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    completed: 'Concluído',
    cancelled: 'Cancelado'
  }

  return (
    <div className="admin">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Painel de Agendamentos</h1>
          <div className="admin-actions">
            <button className="admin-export-btn" onClick={exportAppointments}>
              Exportar Dados
            </button>
            <button className="admin-refresh-btn" onClick={loadAppointments}>
              Atualizar
            </button>
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <span className="stat-number">{appointments.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="admin-stat-card">
            <span className="stat-number">{appointments.filter(a => a.status === 'pending').length}</span>
            <span className="stat-label">Pendentes</span>
          </div>
          <div className="admin-stat-card">
            <span className="stat-number">{appointments.filter(a => a.status === 'confirmed').length}</span>
            <span className="stat-label">Confirmados</span>
          </div>
        </div>

        <div className="admin-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pendentes
          </button>
          <button 
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmados
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Concluídos
          </button>
        </div>

        <div className="admin-appointments">
          {filteredAppointments.length === 0 ? (
            <div className="admin-empty">
              <p>Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} className="admin-appointment-card">
                <div className="appointment-header">
                  <div className="appointment-info">
                    <h3 className="appointment-name">{appointment.name}</h3>
                    <p className="appointment-phone">{appointment.phone}</p>
                    {appointment.email && appointment.email !== 'Não informado' && (
                      <p className="appointment-email">{appointment.email}</p>
                    )}
                  </div>
                  <div 
                    className="appointment-status"
                    style={{ backgroundColor: statusColors[appointment.status] }}
                  >
                    {statusLabels[appointment.status]}
                  </div>
                </div>
                
                <div className="appointment-details">
                  <div className="appointment-detail">
                    <span className="detail-label">Serviço:</span>
                    <span className="detail-value">{appointment.service}</span>
                  </div>
                  <div className="appointment-detail">
                    <span className="detail-label">Data:</span>
                    <span className="detail-value">{appointment.date}</span>
                  </div>
                  <div className="appointment-detail">
                    <span className="detail-label">Horário:</span>
                    <span className="detail-value">{appointment.time}</span>
                  </div>
                  {appointment.message && (
                    <div className="appointment-detail">
                      <span className="detail-label">Mensagem:</span>
                      <span className="detail-value">{appointment.message}</span>
                    </div>
                  )}
                  <div className="appointment-detail">
                    <span className="detail-label">Criado em:</span>
                    <span className="detail-value">{formatDate(appointment.createdAt)}</span>
                  </div>
                </div>

                <div className="appointment-actions">
                  {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                    <>
                      <button 
                        className="appointment-complete-btn"
                        onClick={() => handleStatusChange(appointment.id, 'completed')}
                      >
                        Finalizado
                      </button>
                      <button 
                        className="appointment-cancel-btn"
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  <a 
                    href={`https://wa.me/${appointment.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="appointment-whatsapp"
                  >
                    WhatsApp
                  </a>
                  <button 
                    className="appointment-delete"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin

