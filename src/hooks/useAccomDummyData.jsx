import { useState } from 'react';
import {
  addAccommodations,
  addRooms,
  deleteAllAccommodations,
  deleteAllCarts,
  deleteAllFavorites,
  deleteAllRooms,
} from '../services/accomDummyService';

const useExampleData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      await deleteAllAccommodations();
      await deleteAllRooms();
      await deleteAllCarts();
      await deleteAllFavorites();

      const accommodationIds = await addAccommodations();
      await addRooms(accommodationIds);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchData };
};

export default useExampleData;
