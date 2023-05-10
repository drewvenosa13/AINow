import { firestore } from '../components/firebase';

// Create a reference to the Firestore collection you want to interact with
const exampleCollection = firestore.collection('example');

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
