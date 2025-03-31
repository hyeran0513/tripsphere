import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useResetPassword } from '../../hooks/useAuthData';
import InputField from '../../components/common/InputField';
import NotificationModal from '../../components/common/NotificationModal';
import { validateForm } from '../../utils/validation';

const ResetPassword = () => {
  const [state, dispatch] = useAuthForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState({ title: '', description: '' });
  const [modalType, setModalType] = useState('error');
  const navigate = useNavigate();

  const showModal = (type, title, description) => {
    setModalType(type);
    setModalText({ title, description });
    setModalOpen(true);
  };

  const { mutate } = useResetPassword(showModal);

  const handleReset = async (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, 'resetPassword');

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    // 포인트 추가 요청
    await mutate(state.email);

    mutate(state.email);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            to="/"
            className="block text-center">
            <p className="font-bold text-2xl">
              TRIP
              <span className="text-indigo-500">SPHERE</span>
            </p>
          </Link>

          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            비밀번호 재설정
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleReset}
            className="space-y-6">
            <InputField
              label="이메일"
              type="email"
              value={state.email}
              placeholder={state.placeholder.email}
              onChange={(e) =>
                dispatch({ type: 'SET_EMAIL', payload: e.target.value })
              }
              error={state.errors.email}
            />

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600">
                비밀번호 재설정하기
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 모달 */}
      <NotificationModal
        open={modalOpen}
        setOpen={setModalOpen}
        text={modalText}
        type={modalType}
        onNavigate={() => navigate('/signin')}
      />
    </>
  );
};

export default ResetPassword;
