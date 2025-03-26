import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const getAccomData = async () => {
  const accomCol = collection(db, 'accommodations');

  try {
    const accomSnap = await getDocs(accomCol);
    const accommodations = accomSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const accomIds = accommodations.map((accom) => accom.id);

    const roomCol = collection(db, 'rooms');
    const roomSnap = await getDocs(roomCol);
    const rooms = roomSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 숙소마다 연결된 객실 정보 붙이기
    const results = accommodations.map((accom) => {
      const accomRooms = rooms.filter(
        (room) => room.accommodation_id === accom.id,
      );
      return {
        ...accom,
        rooms: accomRooms,
      };
    });

    return results;
  } catch (error) {
    console.error('숙소 및 객실 정보 가져오기 오류:', error);
    return [];
  }
};
