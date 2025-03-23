import React, { useEffect, useState } from 'react';
import InputField from '../common/InputField';
import useAuthStore from '../../stores/useAuthStore';
import { useUserData } from '../../hooks/useUserData';

const PointModal = () => {
  const [point, setPoint] = useState(null);

  const { user } = useAuthStore();

  const { data, isLoading, error } = useUserData(user?.uid);

  return (
    <>
      <InputField
        label="포인트"
        type="number"
        value={point}
        placeholder="포인트를 입력해 주세요."
        onChange={() => {}}
      />

      <div>보유 포인트: {data.points}</div>

      <button
        type="submit"
        onClick={() => {}}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
        포인트 추가
      </button>
    </>
  );
};

export default PointModal;
