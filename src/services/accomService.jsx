import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// room 조건을 기반으로 가능한 숙소 ID만 필터링
const getAccommodationIds = async (accommodationIds, filters) => {
  if (!filters?.checkIn || !filters?.checkOut) return accommodationIds;

  const allRoomDocs = await getDocs(collection(db, 'rooms'));

  const checkIn = new Date(filters.checkIn);
  const checkOut = new Date(filters.checkOut);
  const filterAdults = Number(filters.adults ?? 0);
  const filterChildren = Number(filters.children ?? 0);

  const result = new Set();

  allRoomDocs.forEach((doc) => {
    const room = doc.data();

    if (!accommodationIds.includes(room.accommodation_id)) return;
    if (!room.availability || Number(room.stock) <= 0) return;

    const maxAdults = room.capacity?.adults ?? 0;
    const maxChildren = room.capacity?.children ?? 0;
    if (maxAdults < filterAdults || maxChildren < filterChildren) return;

    const roomAvailableFrom =
      room.check_in?.toDate?.() || new Date(room.check_in);
    const roomAvailableTo =
      room.check_out?.toDate?.() || new Date(room.check_out);

    // 날짜만 비교하고 시간은 무시하도록 처리
    const roomAvailableFromDate = new Date(
      roomAvailableFrom.setHours(0, 0, 0, 0),
    );
    const roomAvailableToDate = new Date(roomAvailableTo.setHours(0, 0, 0, 0));
    const checkInDate = new Date(checkIn.setHours(0, 0, 0, 0));
    const checkOutDate = new Date(checkOut.setHours(0, 0, 0, 0));

    // 날짜 범위가 겹치는지 확인
    const isWithinAvailablePeriod =
      checkInDate >= roomAvailableFromDate &&
      checkOutDate <= roomAvailableToDate;

    if (isWithinAvailablePeriod) {
      result.add(room.accommodation_id);
    }
  });

  return [...result];
};

// 숙소 전체 조회 및 조건 필터
export const getFilteredAccommodations = async (filters) => {
  // 숙소 데이터 조회
  const accomSnapshot = await getDocs(collection(db, 'accommodations'));
  let docs = accomSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // 도시 대분류
  if (filters.city && filters.city !== '전체') {
    docs = docs.filter((item) => item.location.city === filters.city);
  }

  // 도시 소분류
  if (filters.sub_city && filters.sub_city !== '전체') {
    docs = docs.filter((item) => item.location.sub_city === filters.sub_city);
  }

  // 체크인 / 체크아웃 / 인원
  let validAccommodationIds = null;
  if (filters.checkIn && filters.checkOut) {
    validAccommodationIds = await getAccommodationIds(
      docs.map((d) => d.id),
      filters,
    );
    docs = docs.filter((doc) => validAccommodationIds.includes(doc.id));
  }

  // rooms 가져와서 숙소에 붙이기
  const roomSnapshot = await getDocs(collection(db, 'rooms'));
  const roomMap = {};

  roomSnapshot.forEach((doc) => {
    const room = doc.data();
    const accomId = room.accommodation_id;
    if (!roomMap[accomId]) {
      roomMap[accomId] = [];
    }
    roomMap[accomId].push({ id: doc.id, ...room });
  });

  docs = docs.map((doc) => ({
    ...doc,
    rooms: roomMap[doc.id] || [],
  }));

  return docs;
};
