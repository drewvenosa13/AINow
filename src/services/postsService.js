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
    const docRef = await addDoc(postsCollection(db,'posts'), {
      ...post,
      createdAt: new Date(),
      id: post.title.replace(/\s+/g, '-').toLowerCase()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Function to retrieve all posts for a given topic
export const getPostsForTopic = async (topic) => {
  try {
    const posts = [];
    const q = query(collection(db, 'posts'), where('topic', '==', topic));
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
export async function getPostById(postId) {
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    return { ...postSnap.data(), id: postSnap.id };
  } else {
    return null;
  }
}

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