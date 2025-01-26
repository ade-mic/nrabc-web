import { db, auth, provider, storage } from "../utils/firebase.js";
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



class UserController {
  // Fetch all users
  static async getAllUsers(req, res) {
    try {
      const users = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error: error.message });
    }
  }

  // Fetch a specific user by ID
  static async getUser(req, res) {
    try {
      const userId = req.params.id;
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        res.json({ id: userSnap.id, ...userSnap.data() });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  }

  // Create a new user
  static async createUser(req, res) {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
  
    // Early check for password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    // Password strength validation
    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordStrengthRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long and include both letters and numbers.",
      });
    }
  
    try {
      // Attempt to create a user with Firebase Auth
      console.log("Creating user...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add user details to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { email, firstName, lastName, uid: user.uid });
  
      // Generate an ID token
      const idToken = await user.getIdToken();
  
      // Send success response
      return res.json({
        message: "User created successfully",
        user: { uid: user.uid, email, firstName, lastName, token: idToken },
      });
    } catch (error) {
      // Handle Firebase authentication errors
      if (error.code === "auth/email-already-in-use") {
        return res.status(400).json({ message: "User with this email already exists." });
      }
  
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Error creating user", error: error.message });
    }
  }

  // Login a user with email and password
  static async loginUser(data) {
 
    const { email, password } = data;
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      return { uid: user.uid, email: user.email, token: idToken };
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Invalid email or password");
    }
  }


  static async logOut(req, res) {
    try {
      await signOut(auth);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Error logging out", error: error.message });
    }
  }

  // Delete a user
  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  }

  // Update a user
  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, req.body);

      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  }

  // Login with Google
  static async loginWithGoogle(req, res) {
    try {
      const result = await signInWithPopup(auth, provider);
      res.json({ message: "Google login successful", user: result.user });
    } catch (error) {
      res.status(401).json({ message: "Google login failed", error: error.message });
    }
  }
}

export default UserController;
