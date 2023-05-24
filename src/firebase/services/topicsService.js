import { db } from '../components/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

// Create a reference to the Firestore collection you want to interact with
const topicsCollection = collection(db, 'topics');

// Function to retrieve all topics
export const getTopics = async () => {
  try {
    const querySnapshot = await getDocs(topicsCollection);
    const topics = [];
    querySnapshot.forEach((doc) => {
      topics.push({ id: doc.id, ...doc.data() });
    });
    return topics;
  } catch (error) {
    throw error;
  }
};

// Function to retrieve a single topic by its ID
export const getTopicById = async (topicId) => {
  try {
    const topicDoc = await getDoc(doc(topicsCollection, topicId));
    if (topicDoc.exists()) {
      return { id: topicDoc.id, ...topicDoc.data() };
    }
    throw new Error(`No topic found with ID ${topicId}`);
  } catch (error) {
    throw error;
  }
};
