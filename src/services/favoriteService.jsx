import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { fetchAccomData } from './productService.';

// 사용자 찜 목록 가져오기
const getUserWishlist = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.log('사용자가 없습니다.');
    return;
  }

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.log('users 문서가 존재 X');
      return;
    }

    return { userDocRef, wishlist: userDocSnap.data().wishlist || [] };
  } catch (error) {
    console.log('찜 목록 조회 오류: ' + error.message);
  }
};

// 찜 버튼 제어
export const controlFavorite = async (accommodationId) => {
  const userData = await getUserWishlist();

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
    console.log('찜 버튼 선택 오류: ' + error.message);
  }
};

// 찜 목록에 항목 포함 여부
export const checkFavorite = async (accommodationId) => {
  const userData = await getUserWishlist();
  if (!userData) return;

  return userData.wishlist.includes(accommodationId);
};

// 찜 목록 숙소 정보 조회
export const getFavoriteAccomm = async () => {
  const userData = await getUserWishlist();

  const accomPromises = userData.wishlist.map(async (item) => {
    return fetchAccomData(item);
  });

  const accommodations = await Promise.all(accomPromises);

  return accommodations.filter((accom) => accom !== null);
};
