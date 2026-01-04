import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../firebase/config';

/**
 * Creates a new user session in Firebase
 * @returns {Promise<{sessionId: string, userId: string}>} Session and user IDs
 */
export async function createUserSession() {
  try {
    // Sign in anonymously to Firebase Auth
    const userCredential = await signInAnonymously(auth);
    const userId = userCredential.user.uid;

    // Create session document in Firestore
    const sessionRef = await addDoc(collection(db, 'sessions'), {
      userId,
      createdAt: serverTimestamp(),
      lastActivity: serverTimestamp(),
      isActive: true,
      vehicle: null,
      activities: []
    });

    const sessionId = sessionRef.id;

    // Store session info in localStorage
    localStorage.setItem('meu-xodo-session', JSON.stringify({
      sessionId,
      userId
    }));

    console.log('Session created:', { sessionId, userId });

    return { sessionId, userId };
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

/**
 * Updates vehicle information in the session
 * @param {string} sessionId - Session ID
 * @param {object} vehicleData - Vehicle data
 */
export async function updateSessionVehicle(sessionId, vehicleData) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      vehicle: vehicleData,
      lastActivity: serverTimestamp()
    });
    console.log('Vehicle updated in session:', vehicleData);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
}

/**
 * Updates activities in the session
 * @param {string} sessionId - Session ID
 * @param {array} activities - Array of activities
 */
export async function updateSessionActivities(sessionId, activities) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      activities,
      lastActivity: serverTimestamp()
    });
    console.log('Activities updated in session');
  } catch (error) {
    console.error('Error updating activities:', error);
    throw error;
  }
}

/**
 * Gets the current session from localStorage
 * @returns {object|null} Session data or null
 */
export function getCurrentSession() {
  const sessionData = localStorage.getItem('meu-xodo-session');
  return sessionData ? JSON.parse(sessionData) : null;
}

/**
 * Clears the current session
 */
export function clearSession() {
  localStorage.removeItem('meu-xodo-session');
  console.log('Session cleared');
}
