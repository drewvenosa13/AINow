import { db } from '../components/firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  serverTimestamp, 
} from 'firebase/firestore';

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
export const addPost = async (post, questionsAnswers) => {
  try {
    const docRef = await addDoc(postsCollection, {
      ...post,
      createdAt: new Date(),
      id: post.title.replace(/\s+/g, '-').toLowerCase(),
      questionsAnswers: questionsAnswers
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