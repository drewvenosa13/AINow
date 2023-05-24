import { collection, addDoc, serverTimestamp, Timestamp, query, where, getDocs, doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

const pageviewsCollection = collection(db, 'pageviews');

export const recordPageView = async (email, page, timeSpent, startTime) => {
  try {
    // Check if a document for this page and email already exists
    const q = query(pageviewsCollection, where('email', '==', email), where('page', '==', page));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If it doesn't, create a new document
      const docRef = await addDoc(pageviewsCollection, {
        email,
        page,
        timeSpent,
        timestamp: serverTimestamp(),
        updatedAt: Timestamp.fromDate(startTime),  // add startTime as updatedAt field
      });
      return docRef.id;
    } else {
      // If it does, increment the timeSpent field
      querySnapshot.forEach(async (documentSnapshot) => {
        const pageViewDoc = doc(db, 'pageviews', documentSnapshot.id);
        await setDoc(pageViewDoc, {
          timeSpent: increment(timeSpent),
        }, { merge: true });
      });
    }
  } catch (error) {
    throw error;
  }
};