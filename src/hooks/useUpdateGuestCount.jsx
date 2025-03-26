import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useQueryClient } from '@tanstack/react-query';

// cart 게스트 조절 훅
const useUpdateGuestCount = () => {
  const queryClient = useQueryClient();

  const updateGuestCount = async (cartId, guestCount, type, delta) => {
    const newCount = Math.max(0, (guestCount?.[type] ?? 0) + delta);

    const updatedGuestCount = {
      ...guestCount,
      [type]: newCount,
    };

    await updateDoc(doc(db, 'carts', cartId), {
      guest_count: updatedGuestCount,
    });

    queryClient.invalidateQueries(['carts']);
  };

  return updateGuestCount;
};

export default useUpdateGuestCount;
