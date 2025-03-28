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
import { usedPoints } from './pointService';
import { delCartItemOfroomId } from './cartService';
import { decrementRoomStock } from './accomService';

// 유저의 주문 내역 조회 (기존)
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

// 주문아이디 배열로 주문조회 수정 기존 OrderList 에 맞게 수정
export const orderQuery = async (orderIds) => {
  if (!Array.isArray(orderIds) || orderIds.length === 0) return [];

  const orders = await Promise.all(
    orderIds.map(async (orderId) => {
      const orderRef = doc(db, 'orders', orderId);
      const orderSnap = await getDoc(orderRef);
      const orderByRoomInfo = orderSnap.data();

      const roomRef = doc(db, 'rooms', orderByRoomInfo.room_id);
      const roomSnap = await getDoc(roomRef);
      const roomData = roomSnap.exists() ? roomSnap.data() : null;

      let accomData = null;

      if (roomData) {
        const accomRef = doc(db, 'accommodations', roomData.accommodation_id);
        const accomSnap = await getDoc(accomRef);
        accomData = accomSnap.exists() ? accomSnap.data() : null;
      }

      return {
        id: orderId,
        ...orderByRoomInfo,
        room: roomData,
        accom: accomData,
      };
    }),
  );

  return orders.filter((order) => order !== null);
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

  const q = query(
    ordersCollection,
    where('user_id', '==', orderItem.user_id),
    where('room_id', '==', orderItem.room_id),
  );
  const querySnapshot = await getDocs(q);

  // 이미 존재하는 주문이 있으면 종료
  if (!querySnapshot.empty) {
    console.error('이미 존재하는 주문입니다. room_id:', orderItem.room_id);
    return;
  }

  // 주문을 orders 컬렉션에 추가
  await addDoc(ordersCollection, orderItem);

  // carts 컬렉션에서 해당 room_id를 가진 항목 삭제
  await delCartItemOfroomId(orderItem.room_id);

  // 포인트 사용
  await usedPoints({ userId, points: orderItem.used_points });

  // 재고 차감
  await decrementRoomStock(orderItem.room_id);
};
