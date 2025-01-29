
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
import { serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const uploadThumbnail = async (file) => {
  try {
    const storageRef = ref(storage, `thumbnails/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    throw error;
  }
};


const addArticle = async (articleData, thumbnailFile) => {
  try {
    let thumbnailUrl = null;
    if (thumbnailFile) {
      thumbnailUrl = await uploadThumbnail(thumbnailFile);
    }

    const docRef = await addDoc(collection(db, "articles"), {
      ...articleData,
      thumbnail: thumbnailUrl,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
};

const getArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    return articles;
  } catch (error) {
    console.error("Error fetching articles: ", error);
  }
};

const updateArticle = async (id, updatedData) => {
  try {
    const articleRef = doc(db, "articles", id);
    await updateDoc(articleRef, {
      ...updatedData,
      lastModified: serverTimestamp()
    });
    console.log("Article updated successfully");
  } catch (error) {
    console.error("Error updating article: ", error);
    throw error;
  }
};

const getUserArticles = async (userId) => {
  try {
    const articlesRef = collection(db, "articles");
    const q = query(articlesRef, where("authorId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const userArticles = [];
    querySnapshot.forEach((doc) => {
      userArticles.push({ id: doc.id, ...doc.data() });
    });
    
    return userArticles;
  } catch (error) {
    console.error("Error fetching user articles: ", error);
    throw error;
  }
};

const deleteArticle = async (id) => {
  try {
    const articleRef = doc(db, "articles", id);
    await deleteDoc(articleRef);
    console.log("Article deleted successfully");
  } catch (error) {
    console.error("Error deleting article: ", error);
  }
};

export { addArticle, getArticles, updateArticle, deleteArticle, getUserArticles };

