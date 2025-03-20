import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiCog, BiLock } from 'react-icons/bi';
import InputField from '../common/InputField';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useUserData, useVerifyPassword } from '../../hooks/useUserData';
import Toast from '../common/Toast';

const UserProfile = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const { data: userInfo, isLoading, error } = useUserData();
  const { mutate: verify } = useVerifyPassword();

  // 본인 인증 폼 제출
  const handleVerify = () => {
    verify(state.password, {
      onSuccess: () => {
        showToast('success', '본인 인증 성공했습니다.');
        navigate('/profile');
      },
      onError: () => {
        showToast('error', '본인 인증 실패했습니다.');
      },
    });

    dispatch({ type: 'SET_PASSWORD', payload: '' });
  };

  const [toast, setToast] = useState(null);

  // 토스트
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  if (isLoading) return <>로딩 중...</>;
  if (error) return <>오류</>;

  return (
    <>
      <div className="flex px-4 mb-8">
        {/* 프로필사진 */}
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img
              src={userInfo?.profile_image}
              alt={userInfo?.username}
            />
          </div>
        </div>

        {/* 이름 등 정보 */}
        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium ">
              <h3>
                <a href="#">
                  <strong>{userInfo?.username}님</strong>
                </a>
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-500">{userInfo?.nickname}</p>
          </div>
        </div>

        {/* 개인정보 수정 설정 버튼 */}
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_2').showModal()}>
          <BiCog size={24} />
        </button>
        <dialog
          id="my_modal_2"
          className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <BiLock /> 본인 인증
            </h3>
            <p className="py-4">
              <div className="mb-4">
                개인정보 변경 전 본인 인증을 위해 비밀번호를 입력해주세요.
              </div>

              {/* 비밀번호 */}
              <InputField
                label="비밀번호"
                type="password"
                value={state.password}
                placeholder={state.placeholder.password}
                onChange={(e) =>
                  dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
                }
                error={state.errors.password}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={handleVerify}>
                  확인
                </button>
              </form>
            </div>
          </div>

          <form
            method="dialog"
            className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      {/* 토스트 메시지 */}
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-10">
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </>
  );
};

export default UserProfile;