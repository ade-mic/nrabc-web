
import { db, } from "../utils/firebase.js";
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


const createBlog = async (blogData) => {
  try {
    await addDoc(collection(db, "blogs") , {
      ...blogData,
      createdAt: new Date(),
    });
    console.log("Blog created successfully");
  } catch (error) {
    throw error;
  }
}

const fetchBlogs = async () => {
  try {
    const blogs = [];
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
      blogs.push({ ...doc.data(), id: doc.id });
    });
    return blogs;
  } catch (error) {
    throw error;
  }
}

updateBlog = async (blogId, blogData) => {
  try {
    await updateDoc(doc(db, "blogs", blogId), blogData);
    console.log("Blog updated successfully");
  } catch (error) {
    throw error;
  }
}

deleteBlog = async (blogId) => {
  try {
    await deleteDoc(doc(db, "blogs", blogId));
    console.log("Blog deleted successfully");
  } catch (error) {
    throw error;
  }
}
