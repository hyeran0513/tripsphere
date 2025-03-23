import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
  addDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// 포인트 내역 조회
export const getPoints = async (userId) => {
  try {
    const q = query(
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
      title: '포인트 추가',
      description: `${points} 포인트가 추가되었습니다!`,
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
