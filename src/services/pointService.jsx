import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { formatNumber } from '../utils/format';

// 포인트 내역 조회
export const getPoints = async (userId) => {
  try {
    let q = query(
      collection(db, 'points'),
      where('user_id', '==', userId),
      orderBy('received_date', 'desc'),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('포인트 데이터 조회 오류:', error.message);
  }
};

// 포인트 추가 및 포인트 내역 추가
export const addPoints = async (userId, points) => {
  try {
    const pointsRef = collection(db, 'points');
    const userRef = doc(db, 'users', userId);

    // 포인트 내역 추가
    await addDoc(pointsRef, {
      user_id: userId,
      title: '포인트 적립',
      type: 'add',
      description: `${formatNumber(points)} 포인트가 적립되었습니다!`,
      points: points,
      received_date: serverTimestamp(),
    });

    // 유저 포인트 증가
    await updateDoc(userRef, {
      points: increment(points),
    });
  } catch (error) {
    console.error('포인트 추가 오류:', error.message);
  }
};

// 포인트 사용 및 포인트 사용 내역 추가
export const usedPoints = async ({ userId, points }) => {
  try {
    const pointsRef = collection(db, 'points');
    const userRef = doc(db, 'users', userId);

    const numberPoints = Number(points);

    await updateDoc(userRef, {
      points: increment(-numberPoints),
    });

    // 포인트 내역 추가
    await addDoc(pointsRef, {
      user_id: userId,
      points: numberPoints,
      title: '포인트 사용',
      type: 'used',
      description: `${formatNumber(numberPoints)} 포인트가 결제 금액에 적용되었습니다.`,
      received_date: serverTimestamp(),
    });
  } catch (error) {
    console.error('포인트 사용 오류:', error.message);
  }
};
