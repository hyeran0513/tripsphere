import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// 도시 조회
export const getCities = async () => {
  try {
    const citySnapshot = await getDocs(collection(db, 'cities'));
    return citySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
