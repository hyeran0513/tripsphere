import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { decrementRoomStock } from './accomService';
import { delCartItemOfroomId } from './cartService';
import { usedPoints } from './pointService';

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
      const newPoints = (userData?.points || 0) + usedPoints;

      await updateDoc(userRef, {
        points: newPoints, // 유저의 포인트에 환불된 포인트 추가
      });
    }
  }
};

// 주문 완료 생성
export const createUserOrder = async ({
  userId,
  room,
  accomId,
  checkin,
  checkout,
  status = 'completed',
  points,
  selectedTime,
}) => {
  const orderRef = collection(db, 'orders');
  const roomRef = doc(db, 'rooms', room);
  const accomRef = doc(db, 'accommodations', accomId);

  const roomSnap = await getDoc(roomRef);
  if (roomSnap.exists()) {
    const roomData = roomSnap.data();
    const updateRooms = [
      ...(roomData.booked_dates || []),
      {
        check_in: checkin,
        check_out: checkout,
      },
    ];
    await updateDoc(roomRef, {
      booked_dates: updateRooms,
    });
  }

  const accomSnap = await getDoc(accomRef);
  if (accomSnap.exists()) {
    const accomData = accomSnap.data();
    const updateAccom = [
      ...(accomData.booked_dates || []),
      {
        check_in: checkin,
        check_out: checkout,
      },
    ];

    await updateDoc(accomRef, {
      booked_dates: updateAccom,
    });
  }

  // 주문 상태 업데이트
  const docRef = await addDoc(orderRef, {
    user_id: userId,
    room_id: room,
    payment_status: status,
    used_points: points,
    duration: serverTimestamp(),
    selectedTime: selectedTime,
  });

  return docRef.id;
};

// 주문 내역 조회
export const getOrderData = async (userId) => {
  if (!userId) return [];

  const q = query(collection(db, 'orders'), where('user_id', '==', userId));
  const cartSnapshot = await getDocs(q);

  const orderItems = await Promise.all(
    cartSnapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();

      const roomRef = doc(db, 'rooms', data.room_id);
      const roomSnap = await getDoc(roomRef);
      const roomData = roomSnap.exists() ? roomSnap.data() : null;

      let accomData = null;

      if (roomData) {
        const accomRef = doc(db, 'accommodations', roomData.accommodation_id);
        const accomSnap = await getDoc(accomRef);
        accomData = accomSnap.exists() ? accomSnap.data() : null;
      }

      return {
        id: docSnap.id,
        ...data,
        room: roomData,
        accom: accomData,
      };
    }),
  );

  return orderItems;
};

// 결제하기
export const checkout = async (orderItem, userId) => {
  const ordersCollection = collection(db, 'orders');

  // const q = query(
  //   ordersCollection,
  //   where('user_id', '==', orderItem.user_id),
  //   where('room_id', '==', orderItem.room_id),
  // );
  // const querySnapshot = await getDocs(q);

  // // 이미 존재하는 주문이 있으면 종료
  // if (!querySnapshot.empty) {
  //   console.error('이미 존재하는 주문입니다. room_id:', orderItem.room_id);
  //   return;
  // }

  // 주문을 orders 컬렉션에 추가
  // 컬랙션에 추가한 문서정보 획득
  const orderDoc = await addDoc(ordersCollection, orderItem);

  // carts 컬렉션에서 해당 room_id를 가진 항목 삭제
  await delCartItemOfroomId(orderItem.room_id);

  // 포인트 사용
  await usedPoints({ userId, points: orderItem.used_points });

  // 재고 차감
  await decrementRoomStock(orderItem.room_id);

  // 추가한 주문 문서 아이디 반환
  return orderDoc.id;
};

// 결제완료된 주문 데이터 조회
export const getOrdersByRoomIds = async (roomIds) => {
  if (!roomIds || roomIds.length === 0) return [];

  const ordersRef = collection(db, 'orders');
  const results = [];

  for (const roomId of roomIds) {
    const q = query(
      ordersRef,
      where('room_id', '==', roomId),
      where('payment_status', '==', 'completed'),
    );

    const querySnapshot = await getDocs(q);

    for (const docSnap of querySnapshot.docs) {
      const orderData = {
        id: docSnap.id,
        ...docSnap.data(),
      };

      // rooms 컬렉션에서 room 정보 조회
      const roomRef = doc(db, 'rooms', orderData.room_id);
      const roomSnap = await getDoc(roomRef);
      const roomData = roomSnap.exists() ? roomSnap.data() : null;

      // accommodations 정보 조회
      let accomData = null;
      if (roomData?.accommodation_id) {
        const accomRef = doc(db, 'accommodations', roomData.accommodation_id);
        const accomSnap = await getDoc(accomRef);
        accomData = accomSnap.exists() ? accomSnap.data() : null;
      }

      results.push({
        ...orderData,
        room: roomData,
        accomData: accomData,
      });
    }
  }

  return results;
};
