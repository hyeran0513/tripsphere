import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// 이용약관 조회
export const getTerms = async () => {
  try {
    const termSnapshot = await getDocs(collection(db, 'terms'));
    return termSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
