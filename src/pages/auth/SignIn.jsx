import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useSignInMutation } from '../../hooks/useAuthData';
import InputField from '../../components/Atoms/InputField';
import NotificationModal from '../../components/Molecules/NotificationModal';
import InputErrorMessage from '../../components/Atoms/InputErrorMessage';

const SignIn = () => {
  const [state, dispatch] = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState({ title: '', description: '' });
  const [modalType, setModalType] = useState('error');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showModal = (type, title, description) => {
    setModalType(type);
    setModalText({ title, description });
    setModalOpen(true);
  };

  const loginMutation = useSignInMutation(state, dispatch, showModal, navigate);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginMutation.mutateAsync();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            to="/"
            className="block text-center">
            <p className="font-bold text-2xl">
              TRIP<span className="text-indigo-500">SPHERE</span>
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
            {/* 이메일 */}
            <div>
              <InputField
                label="이메일"
                type="email"
                value={state.email}
                placeholder={state.placeholder.email}
                onChange={(e) =>
                  dispatch({ type: 'SET_EMAIL', payload: e.target.value })
                }
              />

              <InputErrorMessage error={state.errors.email} />
            </div>

            {/* 비밀번호 */}
            <div>
              <InputField
                label="비밀번호"
                type="password"
                value={state.password}
                isResetPassword={true}
                placeholder={state.placeholder.password}
                onChange={(e) =>
                  dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
                }
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <InputErrorMessage error={state.errors.password} />
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
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
