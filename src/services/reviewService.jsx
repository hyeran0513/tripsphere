import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { fetchUserData } from './userService';

// 특정 숙소에 대한 리뷰 전체 내용 쿼리
export const fetchAllReviewData = async (accomId) => {
  if (!accomId) return;

  // 숙소 문서 ID와 일치하는 리뷰 조회
  const reviewsCollection = collection(db, 'reviews');
  const reviewsQuery = query(
    reviewsCollection,
    where('accommodation_id', '==', accomId),
    orderBy('created_at', 'desc'),
  );
  const reviewSnapshot = await getDocs(reviewsQuery);

  if (reviewSnapshot.empty) {
    return null;
  }

  // 해당 reviews 컬렉션의 user_id를 사용하여 사용자 정보 조회 및 포함
  const reviewsWithUserInfo = [];

  for (const doc of reviewSnapshot.docs) {
    const reviewData = doc.data();
    const userInfo = await fetchUserData(reviewData.user_id);

    if (userInfo) {
      reviewsWithUserInfo.push({
        ...reviewData,
        userInfo,
      });
    }
  }

  return reviewsWithUserInfo;
};

// 리뷰 추가
export const addReview = async (review) => {
  try {
    const newReview = {
      ...review,
      created_at: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'reviews'), newReview);

    // 숙소 정보 업데이트
    const accomRef = doc(db, 'accommodations', review.accommodation_id);
    await runTransaction(db, async (transaction) => {
      const accomSnap = await transaction.get(accomRef);

      if (!accomSnap.exists()) throw new Error('숙소 정보 없습니다.');

      const { total_rating = 0, review_count = 0 } = accomSnap.data();

      transaction.update(accomRef, {
        total_rating: total_rating + review.rating,
        review_count: review_count + 1,
      });
    });

    return docRef;
  } catch (error) {
    console.error('리뷰 추가 오류: ' + error.message);
  }
};

// 숙소별 평균 평점 계산
export const getAverageRatings = async (accomId) => {
  const accomSnap = await getDoc(doc(db, 'accommodations', accomId));
  const { total_rating = 0, review_count = 0 } = accomSnap.data() || {};

  return review_count > 0
    ? Math.round((total_rating / review_count) * 10) / 10
    : 0;
};
