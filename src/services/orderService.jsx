import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// 유저의 주문 내역 조회
export const fetchUserOrders = async (userId) => {
  if (!userId) return [];

  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('user_id', '==', userId));
  const ordersSnapshot = await getDocs(q);

  const orders = await Promise.all(
    ordersSnapshot.docs.map(async (orderDoc) => {
      const orderData = orderDoc.data();

      // 숙소 정보 불러오기
      const accomRef = doc(db, 'accommodations', orderData.accommodation_id);
      const accomSnap = await getDoc(accomRef);

      return {
        id: orderDoc.id,
        ...orderData,
        accommodation: accomSnap.exists() ? accomSnap.data() : null,
      };
    }),
  );

  return orders;
};

// 주문 취소 (firebase)
export const cancelUserOrder = async ({
  orderId,
  userId,
  usedPoints,
  reason,
}) => {
  const orderRef = doc(db, 'orders', orderId);

  // 주문 상태 업데이트
  await updateDoc(orderRef, {
    payment_status: '결제 취소',
    cancel_reason: reason,
  });

  // 포인트 환불 처리
  if (usedPoints > 0) {
    await addDoc(collection(db, 'points'), {
      user_id: userId,
      points: usedPoints,
      type: 'refund',
      reason: `주문 취소 - ${reason}`,
      created_at: new Date(),
    });

    // users 컬렉션의 포인트 업데이트
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const newPoints = (userData.points || 0) + usedPoints;

      await updateDoc(userRef, {
        points: newPoints, // 유저의 포인트에 환불된 포인트 추가
      });
    }
  }
};

// 주문 완료 생성 (firebase)
export const createUserOrder = async ({
  orderId,
  userId,
  usedPoints,
  reason,
}) => {
  const orderRef = doc(db, 'orders', orderId);

  // 주문 상태 업데이트
  await updateDoc(orderRef, {
    payment_status: '결제 완료',
    cancel_reason: reason,
  });

  // 포인트 환불 처리
  if (usedPoints > 0) {
    await addDoc(collection(db, 'points'), {
      user_id: userId,
      points: usedPoints,
      type: 'success',
      reason: `주문 완료`,
      created_at: new Date(),
    });

    // users 컬렉션의 포인트 업데이트
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const newPoints = (userData.points || 0) + usedPoints;

      await updateDoc(userRef, {
        points: newPoints, // 유저의 포인트에 환불된 포인트 추가
      });
    }
  }
};
