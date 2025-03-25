import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// 여러 숙소들 정보 쿼리
// 지역과, 가격을 조건으로 쿼리를 날려야함.
// export const fetchAccomListData = async (accomRegion, priceRange) => {
//   const querySnapshot = await getDocs(collection(db, 'accommodations')); // 조건 없이 모든 숙소 정보를 쿼리함

//   let array = [];
//   querySnapshot.forEach((doc) => {
//     // console.log(doc.data());
//     array.push(doc.data());
//   });

//   return array.length > 0 ? array : null;
// };

export const getAllAccomData = async (filters) => {
  const accomDoc = collection(db, 'accommodations');
  let constraints = [];
  // 성인 수 필터
  if (filters.adultCount > 0) {
    constraints.push(where('capacity.adults', '>=', filters.adultCount));
  }

  // 도시 대분류 필터
  if (filters.selectedCity) {
    constraints.push(where('location.city', '==', filters.selectedCity));
  }

  // 도시 소분류 지역 필터
  if (filters.selectedSubCity) {
    constraints.push(where('location.sub_city', '==', filters.selectedSubCity));
  }

  // 체크인 날짜 필터
  if (filters.checkIn) {
    let checkInTimestamp = Timestamp.fromDate(new Date(filters.checkIn));
    constraints.push(where('check_in', '>=', checkInTimestamp));
  }
  let checkOutTimestamp;
  // 체크아웃 날짜 필터
  // Firestore에서 필터링하지 않고, 이후 클라이언트에서 필터링
  if (filters.checkOut) {
    checkOutTimestamp = Timestamp.fromDate(new Date(filters.checkOut));
  }

  const q = query(accomDoc, ...constraints);

  try {
    const accomSnap = await getDocs(q);
    let results = accomSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 체크아웃 날짜 필터 적용
    // 클라이언트 측 필터링
    // 임시 데이터의 시간들이 과거로 들어가있어서
    // 필터링 중지후 일괄 호출.
    if (checkOutTimestamp) {
      results = results.filter(
        (accom) => accom.check_out.toMillis() <= checkOutTimestamp.toMillis(),
      );
    }

    return results;
  } catch (error) {
    console.error('상품 검색 오류', error);
    return [];
  }
};
