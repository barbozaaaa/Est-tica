// CRM Utility - Armazena agendamentos no localStorage
// Em produção, você pode substituir por uma API/backend

export const saveAppointment = (appointmentData) => {
  try {
    // Obter agendamentos existentes
    const existingAppointments = getAppointments()
    
    // Criar novo agendamento com ID e timestamp
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      createdAt: new Date().toISOString(),
      status: 'pending' // pending, confirmed, completed, cancelled
    }
    
    // Adicionar ao array
    existingAppointments.push(newAppointment)
    
    // Salvar no localStorage
    localStorage.setItem('thaffny_appointments', JSON.stringify(existingAppointments))
    
    // Também salvar em um arquivo de backup (para desenvolvimento)
    // Em produção, isso seria enviado para um servidor/API
    console.log('Agendamento salvo:', newAppointment)
    
    return newAppointment
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error)
    throw error
  }
}

export const getAppointments = () => {
  try {
    const appointments = localStorage.getItem('thaffny_appointments')
    return appointments ? JSON.parse(appointments) : []
  } catch (error) {
    console.error('Erro ao recuperar agendamentos:', error)
    return []
  }
}

export const getAppointmentById = (id) => {
  const appointments = getAppointments()
  return appointments.find(apt => apt.id === id)
}

export const updateAppointmentStatus = (id, status) => {
  try {
    const appointments = getAppointments()
    const index = appointments.findIndex(apt => apt.id === id)
    
    if (index !== -1) {
      appointments[index].status = status
      appointments[index].updatedAt = new Date().toISOString()
      localStorage.setItem('thaffny_appointments', JSON.stringify(appointments))
      return appointments[index]
    }
    return null
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error)
    throw error
  }
}

export const deleteAppointment = (id) => {
  try {
    const appointments = getAppointments()
    const filtered = appointments.filter(apt => apt.id !== id)
    localStorage.setItem('thaffny_appointments', JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    throw error
  }
}

export const exportAppointments = () => {
  const appointments = getAppointments()
  const dataStr = JSON.stringify(appointments, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `agendamentos_${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}

