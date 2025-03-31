import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
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

// 특정 객실 정보 쿼리
export const getRoomData = async (roomIds) => {
  const roomDataPromises = roomIds.map(async (roomId) => {
    try {
      const roomDoc = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomDoc);

      if (roomSnap.exists()) {
        const data = roomSnap.data();
        const accomData = await fetchAccomData(data.accommodation_id);
        return { ...data, roomId, accomData };
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  });

  const roomData = await Promise.all(roomDataPromises);

  return roomData.filter(Boolean);
};

// 필터링된 숙소 정보 쿼리
export const getFilteredRoomData = async (accomId, filters) => {
  if (!accomId) return null;

  const roomsRef = collection(db, 'rooms');

  let constraints = [];
  constraints.push(where('accommodation_id', '==', accomId));

  // 어른 수
  if (filters.adults > 0) {
    constraints.push(where('capacity.adults', '>=', filters.adults));
  }

  // 미성년자 수
  if (filters.children > 0) {
    constraints.push(where('capacity.children', '>=', filters.children));
  }

  // 체크인 날짜
  let checkInTimestamp = '';
  if (filters.checkIn) {
    let checkIn = new Date(filters.checkIn);
    checkIn.setHours(0, 0, 0, 0);
    checkInTimestamp = Timestamp.fromDate(checkIn);
  }

  // 체크아웃 날짜
  let checkOutTimestamp = '';
  if (filters.checkOut) {
    let checkOut = new Date(filters.checkOut);
    checkOut.setHours(23, 59, 59, 999);
    checkOutTimestamp = Timestamp.fromDate(checkOut);
  }

  const q = query(roomsRef, ...constraints);

  try {
    const accomSnap = await getDocs(q);
    let results = accomSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 체크인 체크아웃 비교
    if (checkInTimestamp && checkOutTimestamp) {
      results = results.filter((accom) => {
        return (
          accom.check_in.toMillis() <= checkOutTimestamp.toMillis() &&
          accom.check_out.toMillis() >= checkInTimestamp.toMillis()
        );
      });
    }

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
