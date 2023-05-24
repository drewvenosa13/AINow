import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../components/firebase';

const pagesCollection = collection(db, 'pages');
const staticPagesCollection = collection(pagesCollection, 'static');

export const addStaticPage = async (pageId) => {
  try {
    const docRef = await addDoc(staticPagesCollection, {
      id: pageId,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getStaticPage = async (pageId) => {
  const staticPageDoc = doc(staticPagesCollection, pageId);
  const staticPageSnapshot = await getDoc(staticPageDoc);
  return staticPageSnapshot.data();
};

export const updateStaticPage = async (pageId, pageData) => {
  const staticPageDoc = doc(staticPagesCollection, pageId);
  await updateDoc(staticPageDoc, {
    ...pageData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteStaticPage = async (pageId) => {
  const staticPageDoc = doc(staticPagesCollection, pageId);
  await deleteDoc(staticPageDoc);
};
