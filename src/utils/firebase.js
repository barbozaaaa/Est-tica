// Firebase Configuration
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtMW3kLfmEjPac47XD9xTppX4NUfvJ01U",
  authDomain: "estetica-thaffny.firebaseapp.com",
  projectId: "estetica-thaffny",
  storageBucket: "estetica-thaffny.firebasestorage.app",
  messagingSenderId: "646324588276",
  appId: "1:646324588276:web:ff2e3d50aafef954a998a1",
  measurementId: "G-QRNPZJZYX5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Analytics (only in browser environment)
let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export { analytics }
export default app

