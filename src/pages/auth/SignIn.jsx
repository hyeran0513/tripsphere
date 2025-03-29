import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useSignInMutation } from '../../hooks/useAuthData';
import InputField from '../../components/common/InputField';
import NotificationModal from '../../components/common/NotificationModal';

const SignIn = () => {
  const [state, dispatch] = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState({ title: '', description: '' });
  const [modalType, setModalType] = useState('error');
  const navigate = useNavigate();

  const showModal = (type, title, description) => {
    setModalType(type);
    setModalText({ title, description });
    setModalOpen(true);
  };

  const loginMutation = useSignInMutation(state, dispatch, showModal, navigate);

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate();
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
            로그인
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleLogin}
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

            <InputField
              label="비밀번호"
              type="password"
              value={state.password}
              isResetPassword={true}
              placeholder={state.placeholder.password}
              onChange={(e) =>
                dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
              }
              error={state.errors.password}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600">
                로그인
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            아직 회원이 아닌가요?{' '}
            <Link
              to="/signup"
              className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
              회원가입
            </Link>
          </p>
        </div>
      </div>

      {/* 모달 */}
      <NotificationModal
        open={modalOpen}
        setOpen={setModalOpen}
        text={modalText}
        type={modalType}
        onNavigate={() => navigate('/')}
      />
    </>
  );
};

export default SignIn;
