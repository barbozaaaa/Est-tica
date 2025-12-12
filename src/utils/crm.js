// CRM Utility - Armazena agendamentos no Firebase Firestore
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'

const APPOINTMENTS_COLLECTION = 'appointments'

// Salvar novo agendamento no Firebase
export const saveAppointment = async (appointmentData) => {
  try {
    // Criar novo agendamento com timestamp
    const newAppointment = {
      ...appointmentData,
      createdAt: Timestamp.now(),
      status: 'pending' // pending, confirmed, completed, cancelled
    }
    
    // Salvar no Firestore
    const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), newAppointment)
    
    console.log('Agendamento salvo no Firebase com ID:', docRef.id)
    
    return {
      id: docRef.id,
      ...newAppointment,
      createdAt: newAppointment.createdAt.toDate().toISOString()
    }
  } catch (error) {
    console.error('Erro ao salvar agendamento no Firebase:', error)
    throw error
  }
}

// Obter todos os agendamentos do Firebase
export const getAppointments = async () => {
  try {
    const appointmentsRef = collection(db, APPOINTMENTS_COLLECTION)
    const q = query(appointmentsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const appointments = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      appointments.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      })
    })
    
    return appointments
  } catch (error) {
    console.error('Erro ao recuperar agendamentos do Firebase:', error)
    throw error
  }
}

// Obter um agendamento específico por ID
export const getAppointmentById = async (id) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Erro ao recuperar agendamento do Firebase:', error)
    throw error
  }
}

// Atualizar status de um agendamento
export const updateAppointmentStatus = async (id, status) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id)
    await updateDoc(docRef, {
      status: status,
      updatedAt: Timestamp.now()
    })
    
    // Retornar o agendamento atualizado
    const updatedDoc = await getDoc(docRef)
    if (updatedDoc.exists()) {
      const data = updatedDoc.data()
      return {
        id: updatedDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      }
    }
    return null
  } catch (error) {
    console.error('Erro ao atualizar agendamento no Firebase:', error)
    throw error
  }
}

// Deletar um agendamento
export const deleteAppointment = async (id) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error('Erro ao deletar agendamento do Firebase:', error)
    throw error
  }
}

// Exportar agendamentos (para download)
export const exportAppointments = async () => {
  try {
    const appointments = await getAppointments()
    const dataStr = JSON.stringify(appointments, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `agendamentos_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erro ao exportar agendamentos:', error)
    throw error
  }
}
