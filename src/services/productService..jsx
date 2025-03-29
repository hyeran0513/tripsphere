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

    return roomsData;
  } else {
    return null;
  }
};

// 특정 객실 정보 쿼리
export const getRoomData = async (roomIds) => {
  const roomDataPromises = roomIds.map(async (roomId) => {
    const roomDoc = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomDoc);

    if (roomSnap.exists()) {
      const data = roomSnap.data();
      const accomData = await fetchAccomData(data.accommodation_id);
      return { ...data, roomId, accomData };
    } else {
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

  // 체크인과 체크아웃은 클라이언트에서 처리
  let checkInTimestamp = '';
  if (filters.datePickerDate.startDate) {
    checkInTimestamp = Timestamp.fromDate(
      new Date(filters.datePickerDate.startDate),
    );
  }

  let checkOutTimestamp = '';
  if (filters.datePickerDate.endDate) {
    checkOutTimestamp = Timestamp.fromDate(
      new Date(filters.datePickerDate.endDate),
    );
  }

  const q = query(roomsRef, ...constraints);

  try {
    const accomSnap = await getDocs(q);
    let results = accomSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 체크인 클라이언트에서 처리
    if (checkInTimestamp) {
      results = results.filter(
        (accom) => accom.check_in.toMillis() >= checkInTimestamp.toMillis(),
      );
    }

    // 체크아웃 클라이언트에서 처리
    if (checkOutTimestamp) {
      results = results.filter(
        (accom) => accom.check_out.toMillis() <= checkOutTimestamp.toMillis(),
      );
    }

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
