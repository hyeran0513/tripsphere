import React, { useEffect, useState } from 'react';

import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { useUserData } from '../../hooks/useUserData';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Loading from '../common/Loading';

const PointModal = ({ onClose }) => {
  const [balance, setBalance] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Firebase 인증 상태가 변경될 때마다 호출
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 컴포넌트가 언마운트될 때 리스너를 정리
    return () => unsubscribe();
  }, []);

  const { data, isLoading, error } = useUserData(user?.uid);

  useEffect(() => {
    if (data) {
      console.log('사용자 정보:', JSON.stringify(data.points));
    }
    setBalance(`현재 총포인트는 ${data.points}포인트입니다`);
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>에러</>;

  const handleBackgroundClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  console.log(data.points);

  const handleCharge = () => {
    if (!isNaN(inputValue) && inputValue !== 0) {
      setBalance(
        `현재 총포인트는 ${
          Number(data.points) + Number(inputValue)
        }포인트입니다`,
      );
      handleClearInput();
    } else {
      setBalance('충전할 포인트를 입력하세요');
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed w-[50%] h-[50%] min-w-[450px]  top-[50%] left-[50%] translate-[-50%] z-10 border bg-white dark:bg-black">
      <div className="relative w-full h-full p-12 ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4">
          <AiOutlineClose size={30} />
        </button>
        <div className="relative w-full h-full ">
          <h2 className="text-2xl font-bold mb-12">포인트 충전</h2>
          <div className="w-full h-8 border-b-2 flex justify-between  items-center gap-1 mb-30">
            <label
              htmlFor="poinCharge"
              className="w-[90%]">
              <input
                type="number"
                id="pointCharge"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="충전할 포인트를 입력하세요"
                className="w-full h-8 text-right font-bold text-2xl"
              />
            </label>

            {inputValue && (
              <button onClick={handleClearInput}>
                <RiCloseCircleLine size={20} />
              </button>
            )}
          </div>
          <button
            onClick={handleCharge}
            type="submit"
            className={
              inputValue
                ? 'btn btn-success w-full mb-4'
                : 'btn btn-soft w-full mb-4'
            }>
            포인트 충전
          </button>
          <div> {balance}</div>
        </div>
      </div>
    </div>
  );
};

export default PointModal;
