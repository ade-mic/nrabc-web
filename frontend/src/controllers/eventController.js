import { db } from '../utils/firebase';
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const eventCollectionRef = collection(db, "events");

// Create Event
const createEvent = async (eventData) => {
  try {
    const docRef = await addDoc(eventCollectionRef, eventData);
    return { id: docRef.id, ...eventData };
  } catch (error) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};

// Read Single Event
const getEvent = async (eventId) => {
  try {
    const eventDoc = await getDoc(doc(db, "events", eventId));
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() };
    }
    return null;
  } catch (error) {
    throw new Error(`Error fetching event: ${error.message}`);
  }
};

// Read All Events
const getAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(eventCollectionRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(`Error fetching events: ${error.message}`);
  }
};

// Update Event
const updateEvent = async (eventId, updatedData) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, updatedData);
    return { id: eventId, ...updatedData };
  } catch (error) {
    throw new Error(`Error updating event: ${error.message}`);
  }
};

// Delete Event
const deleteEvent = async (eventId) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    return true;
  } catch (error) {
    throw new Error(`Error deleting event: ${error.message}`);
  }
};

export {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent
};
