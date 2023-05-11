import {doc, setDoc} from 'firebase/firestore';
import {db} from '../components/firebase';
import {collection, addDoc} from 'firebase/firestore';

// Create a reference to the Firestore collection you want to interact with
const exampleCollection = db.collection('example');

export const getExampleDocuments = async () => {
  try {
    const querySnapshot = await exampleCollection.get();
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    throw error;
  }
};

export const addExampleDocument = async (documentData) => {
  try {
    const docRef = await exampleCollection.add(documentData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateExampleDocument = async (documentId, updatedData) => {
  try {
    await exampleCollection.doc(documentId).update(updatedData);
  } catch (error) {
    throw error;
  }
};

export const deleteExampleDocument = async (documentId) => {
  try {
    await exampleCollection.doc(documentId).delete();
  } catch (error) {
    throw error;
  }
};

export const createUserInFirestore = async (email) => {
  const userRef = doc(db, "users", email);
  await setDoc(userRef, {
    email: email,
    account: true,
  });
};


export const logPageTimeSpent = async (page_path, time_spent) => {
  const pageViewsRef = collection(db, "pageviews");
  await addDoc(pageViewsRef, {
    page_path: page_path,
    time_spent: time_spent,
    timestamp: new Date(),
  });
};
