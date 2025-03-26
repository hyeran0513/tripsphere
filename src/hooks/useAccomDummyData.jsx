import { useState } from 'react';
import {
  addAccommodations,
  deleteAllAccommodations,
} from '../services/accomDummyService';

const useExampleData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      await deleteAllAccommodations();
      await addAccommodations();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchData };
};

export default useExampleData;
