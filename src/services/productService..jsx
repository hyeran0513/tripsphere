import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// 숙소 정보 쿼리
export const fetchAccomData = async (accomId) => {
  if (!accomId) return;

  const accomDoc = doc(db, 'accommodations', accomId);
  const accomSnap = await getDoc(accomDoc);

  if (accomSnap.exists()) {
    const data = accomSnap.data();
    return { ...data, accomId };
  } else {
    return null;
  }
};
