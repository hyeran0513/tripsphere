import {
  collection,
  doc,
  getDocs,
  runTransaction,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAverageRatings } from './reviewService';

// room 조건을 기반으로 가능한 숙소 ID만 필터링
const getAccommodationIds = async (accommodationIds, filters) => {
  if (!filters?.checkIn || !filters?.checkOut) return accommodationIds;

  const allRoomDocs = await getDocs(collection(db, 'rooms'));

  let checkInTimestamp = '';
  let checkOutTimestamp = '';
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

    // 체크인 날짜
    if (filters.checkIn) {
      let checkIn = new Date(filters.checkIn);
      checkIn.setHours(0, 0, 0, 0);
      checkInTimestamp = Timestamp.fromDate(checkIn);
    }

    // 체크아웃 날짜
    if (filters.checkOut) {
      let checkOut = new Date(filters.checkOut);
      checkOut.setHours(23, 59, 59, 999);
      checkOutTimestamp = Timestamp.fromDate(checkOut);
    }

    const isWithinAvailablePeriod =
      room.check_in.toMillis() <= checkOutTimestamp.toMillis() &&
      room.check_out.toMillis() >= checkInTimestamp.toMillis();

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

    let checkInTimestamp = '';
    let checkOutTimestamp = '';

    // 체크인 날짜
    if (filters.checkIn) {
      let checkIn = new Date(filters.checkIn);
      checkIn.setHours(0, 0, 0, 0);
      checkInTimestamp = Timestamp.fromDate(checkIn);
    }

    // 체크아웃 날짜
    if (filters.checkOut) {
      let checkOut = new Date(filters.checkOut);
      checkOut.setHours(23, 59, 59, 999);
      checkOutTimestamp = Timestamp.fromDate(checkOut);
    }

    const isWithinAvailablePeriod =
      room.check_in.toMillis() <= checkOutTimestamp.toMillis() &&
      room.check_out.toMillis() >= checkInTimestamp.toMillis();

    let accomId = '';
    if (isWithinAvailablePeriod) {
      accomId = room.accommodation_id;
    }

    if (!roomMap[accomId]) {
      roomMap[accomId] = [];
    }
    roomMap[accomId].push({ id: doc.id, ...room });
  });

  // 평균 평점 조회
  const averageRatingMap = await getAverageRatings();

  docs = docs.map((doc) => ({
    ...doc,
    rooms: roomMap[doc.id] || [],
    average_rating: averageRatingMap[doc.id] || null,
  }));

  return docs;
};

// 재고 차감
export const decrementRoomStock = async (roomId, quantity = 1) => {
  const roomRef = doc(db, 'rooms', roomId);

  await runTransaction(db, async (transaction) => {
    const roomDoc = await transaction.get(roomRef);

    if (!roomDoc.exists()) {
      throw new Error('객실이 존재X');
    }

    const currentStock = roomDoc.data().stock;

    if (currentStock < quantity) {
      throw new Error('재고가 부족합니다.');
    }

    transaction.update(roomRef, {
      stock: currentStock - quantity,
    });
  });
};
