import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
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

// 숙소 내 객실 정보 쿼리
export const getRoomOfAccomData = async (accomId) => {
  if (!accomId) return null;

  const roomsRef = collection(db, 'rooms');
  const q = query(roomsRef, where('accommodation_id', '==', accomId));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const roomsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      roomId: doc.id,
    }));
    console.log(JSON.stringify(roomsData));
    return roomsData;
  } else {
    return null;
  }
};

// 특정 객실 정보 쿼리
export const getRoomData = async (roomId) => {
  if (!roomId) return;

  const roomDoc = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomDoc);

  if (roomSnap.exists()) {
    const data = roomSnap.data();

    const accomData = await fetchAccomData(data.accommodation_id);

    return { ...data, roomId, accomData };
  } else {
    return null;
  }
};
