import React, { useEffect } from 'react';
import InputField from '../common/InputField';
import useAuthStore from '../../stores/useAuthStore';
import { useUserData } from '../../hooks/useUserData';
import { useAddPoints } from '../../hooks/usePointData';
import { useAuthForm } from '../../hooks/useAuthForm';
import { validateForm } from '../../utils/validation';
import { formatNumber } from '../../utils/format';
import InputErrorMessage from '../common/InputErrorMessage';

const PointModal = ({ points, setPoints, pointHistoryRefetch }) => {
  const { user } = useAuthStore();
  const [state, dispatch] = useAuthForm();
  const { data, isLoading, refetch } = useUserData(user?.uid);
  const { mutate } = useAddPoints(user?.uid);

  useEffect(() => {
    if (data?.points) {
      setPoints(data?.points);
      pointHistoryRefetch();
    }
  }, [data?.points]);

  const handlePoint = async (e) => {
    if (e) e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, 'point');

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    // 포인트 추가 요청
    await mutate(Number(state.point));

    // 입력값 초기화
    dispatch({ type: 'SET_POINT', payload: '' });

    // 포인트 갱신
    setPoints((prev) => prev + Number(state.point));

    // 데이터 갱신
    await refetch();
    await pointHistoryRefetch();
  };

  return (
    <>
      <div>
        <InputField
          label="포인트"
          type="email"
          value={state.point}
          placeholder={state.placeholder.point}
          onChange={(e) =>
            dispatch({ type: 'SET_POINT', payload: e.target.value })
          }
        />
        <InputErrorMessage error={state.errors.point} />
      </div>

      <div className="mt-2 text-indigo-500 text-sm">
        보유 포인트:{' '}
        <span className="font-bold">{formatNumber(points || 0)}</span> 포인트
      </div>

      <div className="modal-action">
        <form method="dialog">
          <button
            type="button"
            onClick={handlePoint}
            className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
            {isLoading ? '포인트 적립 중...' : '포인트 적립'}
          </button>
        </form>
      </div>
    </>
  );
};

export default PointModal;
