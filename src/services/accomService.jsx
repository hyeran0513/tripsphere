import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const getAccomData = async (filters) => {
  const accomCol = collection(db, 'accommodations');
  let accomConstraints = [];

  // 도시 대분류
  if (filters.selectedCity) {
    accomConstraints.push(where('location.city', '==', filters.selectedCity));
  }

  // 도시 소분류
  if (filters.selectedSubCity) {
    accomConstraints.push(
      where('location.sub_city', '==', filters.selectedSubCity),
    );
  }

  // 숙소 유형
  if (filters.selectedType) {
    accomConstraints.push(where('type', '==', filters.selectedType));
  }

  try {
    const accomQuery = query(accomCol, ...accomConstraints);
    const accomSnap = await getDocs(accomQuery);
    const accommodations = accomSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const accomIds = accommodations.map((accom) => accom.id);

    // 객실에 대한 필터링 쿼리
    let roomConstraints = [];

    // 숙소 아이디 기반 필터링
    if (accomIds.length > 0) {
      roomConstraints.push(where('accommodation_id', 'in', accomIds));
    }

    // 체크인
    if (filters.checkIn) {
      let checkInTimestamp = Timestamp.fromDate(new Date(filters.checkIn));
      roomConstraints.push(where('check_in', '<=', checkInTimestamp));
    }

    // 체크아웃
    if (filters.checkOut) {
      let checkOutTimestamp = Timestamp.fromDate(new Date(filters.checkOut));
      roomConstraints.push(where('check_out', '>=', checkOutTimestamp));
    }

    // 어른 수
    if (filters.adultCount > 0) {
      roomConstraints.push(where('capacity.adults', '>=', filters.adultCount));
    }

    // 미성년자 수
    if (filters.childrenCount > 0) {
      roomConstraints.push(
        where('capacity.children', '>=', filters.childrenCount),
      );
    }

    // 객실 쿼리
    const roomQuery = query(collection(db, 'rooms'), ...roomConstraints);
    const roomSnap = await getDocs(roomQuery);
    const rooms = roomSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const results = accommodations.map((accom) => {
      const accomRooms = rooms.filter(
        (room) => room.accommodation_id === accom.id,
      );

      return {
        ...accom,
        rooms: accomRooms,
      };
    });

    return results;
  } catch (error) {
    console.error('숙소 및 객실 정보 조회 오류:', error);
    return [];
  }
};
