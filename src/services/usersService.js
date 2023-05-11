import { db } from '../components/firebase';
import { collection, addDoc } from 'firebase/firestore';

const usersCollection = collection(db, 'users');

export const addUser = async (user) => {
  try {
    const docRef = await addDoc(usersCollection, user);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};