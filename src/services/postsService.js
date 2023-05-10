import { db } from '../components/firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

// Create a reference to the Firestore collection you want to interact with
const postsCollection = collection(db, 'posts');

// Function to retrieve all posts
export const getPosts = async () => {
  try {
    const posts = [];
    const querySnapshot = await getDocs(postsCollection);
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

// Function to add a new post
export const addPost = async (post) => {
  try {
    const docRef = await addDoc(postsCollection, {
      ...post,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Function to retrieve all posts for a given topic
export const getPostsForTopic = async (topicId) => {
  try {
    const posts = [];
    const q = query(collection(db, 'posts'), where('topicId', '==', topicId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

// Function to retrieve a single post by its ID
export const getPostById = async (postId) => {
  try {
    const postDoc = await getDoc(doc(postsCollection, postId));
    if (postDoc.exists()) {
      return { id: postDoc.id, ...postDoc.data() };
    }
    throw new Error(`No post found with ID ${postId}`);
  } catch (error) {
    throw error;
  }
};

// Function to create a new post
export const createPost = async (post) => {
  try {
    const docRef = await addDoc(postsCollection, post);
    const docSnapshot = await getDoc(docRef);
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } catch (error) {
    throw error;
  }
};
