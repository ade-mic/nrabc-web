import { db, auth, provider, storage } from "../utils/firebase.js";
import { getFunctions, httpsCallable } from "firebase/functions";

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const functions = getFunctions();
const addAdminRole = httpsCallable(functions, 'addAdminRole');

const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

const createUser = async ({ email, password, firstName, lastName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email,
      firstName,
      lastName,
      role: "user",
      createdAt: new Date(),
    });
    return user;
  } catch (error) {
    throw error;
  }
}

const getAllUsers = async () => {
  try {
    const getAllUsersFunction = httpsCallable(functions, 'getAllUsers');
    const response = await getAllUsersFunction();
    return response.data.users;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

const updateUserRole = async (userId, newRole) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not signed in');
    }
    const response = await addAdminRole({ uid: userId });
    return(response.data.message);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}




export  { loginUser, createUser, logoutUser, getAllUsers, updateUserRole };