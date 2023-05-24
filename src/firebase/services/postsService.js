import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  query,
  where,
  updateDoc,
  serverTimestamp, 
} from 'firebase/firestore';
import axios from '../../axiosConfig';

// Create a reference to the Firestore collection you want to interact with
const postsCollection = collection(db, 'posts');

// Function to retrieve all posts
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(postsCollection);
    const posts = [];
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
    // Generate questions and answers based on post content
    const response = await axios.post('/api/generate-questions-answers', { postContent: post.content });

    const questionsAnswers = response.data;

    const docRef = await addDoc(postsCollection, {
      ...post,
      createdAt: serverTimestamp(),
      id: post.title.replace(/\s+/g, '-').toLowerCase(),
      questionsAnswers: questionsAnswers, // include the generated questions and answers
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Function to retrieve all posts for a given topic
export const getPostsByTopic = async (topicName) => {
  try {
    const q = query(postsCollection, where("topic", "==", topicName));
    const querySnapshot = await getDocs(q);
    const posts = [];
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
    // Generate questions and answers based on post content
    const response = await axios.post('/api/generate-questions-answers', { postContent: post.content });

    const questionsAnswers = response.data;

    const docRef = await addDoc(postsCollection, {
      ...post,
      questionsAnswers: questionsAnswers, // include the generated questions and answers
    });

    const docSnapshot = await getDoc(docRef);
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } catch (error) {
    throw error;
  }
};



export const updatePost = async (postId, updatedPost) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const revisionsRef = collection(postRef, 'revisions');

    await addDoc(revisionsRef, {
      ...updatedPost,
      updatedAt: serverTimestamp(),
    });

    await updateDoc(postRef, {
      ...updatedPost,
      updatedAt: serverTimestamp(),
    });

    return getPostById(postId);
  } catch (error) {
    throw error;
  }
};

export const getPostRevisions = async (postId) => {
  const postRef = doc(db, 'posts', postId);
  const revisionsRef = collection(postRef, 'revisions');
  const revisionsSnap = await getDocs(revisionsRef);

  const revisions = [];
  revisionsSnap.forEach((doc) => {
    revisions.push({ id: doc.id, ...doc.data() });
  });

  return revisions;
};

export const deletePost = async (id) => {
  const postRef = doc(db, 'posts', id);
  await deleteDoc(postRef);
};