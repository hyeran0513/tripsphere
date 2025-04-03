import React, { useState } from 'react';
import { useAuthForm } from '../../hooks/useAuthForm';
import InputField from '../Atoms/InputField';
import { useSignupMutation } from '../../hooks/useAuthData';
import { validateForm } from '../../utils/validation';
import InputErrorMessage from '../Atoms/InputErrorMessage';

const EmailPassword = ({ onNext, showToast }) => {
  const [state, dispatch] = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { mutate } = useSignupMutation(showToast, onNext);

  const handleRegister = (e) => {
    if (e) e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, 'emailPassword');

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    mutate({
      email: state.email,
      password: state.password,
      username: state.username,
      nickname: state.nickname,
      phone: state.phone,
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST">
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
              placeholder={state.placeholder.password}
              onChange={(e) =>
                dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
              }
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <InputErrorMessage error={state.errors.password} />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <InputField
              label="비밀번호 확인"
              type="password"
              value={state.passwordConfirm}
              placeholder={state.placeholder.passwordConfirm}
              onChange={(e) =>
                dispatch({
                  type: 'SET_PASSWORDCONFIRM',
                  payload: e.target.value,
                })
              }
              showPassword={showPasswordConfirm}
              onTogglePassword={() =>
                setShowPasswordConfirm(!showPasswordConfirm)
              }
            />

            <InputErrorMessage error={state.errors.passwordConfirm} />
          </div>

          {/* 버튼 영역 */}
          <div>
            <button
              type="button"
              onClick={handleRegister}
              className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600">
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailPassword;
