import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAverageRatings } from './reviewService';

// 사용자 찜 목록 가져오기
const getUserWishlist = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.error('users 문서가 존재 X');
      return;
    }

    return { userDocRef, wishlist: userDocSnap.data().wishlist || [] };
  } catch (error) {
    console.error('찜 목록 조회 오류: ' + error.message);
  }
};

// 찜 버튼 제어
export const controlFavorite = async (userId, accommodationId) => {
  const userData = await getUserWishlist(userId);

  if (!userData) return;

  const { userDocRef, wishlist } = userData;

  try {
    // 찜 목록에 포함되어 있으면, 제거
    if (wishlist.includes(accommodationId)) {
      await updateDoc(userDocRef, { wishlist: arrayRemove(accommodationId) });
      return 'remove';
    } else {
      // 찜 목록에 포함되어 있지 않으면, 추가
      await updateDoc(userDocRef, { wishlist: arrayUnion(accommodationId) });
      return 'add';
    }
  } catch (error) {
    console.error('찜 버튼 선택 오류: ' + error.message);
  }
};

// 찜 목록에 항목 포함 여부
export const checkFavorite = async (userId, accommodationId) => {
  const userData = await getUserWishlist(userId);
  if (!userData) return;

  return userData.wishlist.includes(accommodationId);
};

// 찜 목록 숙소 정보 조회
export const getFavoriteAccomm = async (userId) => {
  const userData = await getUserWishlist(userId);

  // 평균 평점 조회
  const averageRatingMap = await getAverageRatings();

  // 숙소
  const accomPromises = userData.wishlist.map(async (item) => {
    const accomDoc = doc(db, 'accommodations', item);
    const accomSnap = await getDoc(accomDoc);

    if (accomSnap.exists()) {
      const data = accomSnap.data();
      return {
        ...data,
        id: accomSnap.id,
        average_rating: averageRatingMap[accomSnap.id] || null,
      };
    } else {
      return null;
    }
  });

  const accommodations = await Promise.all(accomPromises);
  const filteredAccommodations = accommodations.filter(
    (accom) => accom !== null,
  );

  // 객실
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

  const favoriteItems = filteredAccommodations.map((accom) => ({
    ...accom,
    rooms: roomMap[accom.id] || [],
  }));

  return favoriteItems;
};
