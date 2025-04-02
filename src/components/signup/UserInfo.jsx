import React, { useState } from 'react';
import { useAuthForm } from '../../hooks/useAuthForm';
import InputField from '../common/InputField';
import TermsAgreement from './TermsAgreement';
import { useSaveUserInfo } from '../../hooks/useAuthData';
import { validateForm } from '../../utils/validation';
import { formatPhoneNumber } from '../../utils/format';
import InputErrorMessage from '../common/InputErrorMessage';

const UserInfo = ({ onNext, onPrev }) => {
  const [state, dispatch] = useAuthForm();
  const [isAgreed, setIsAgreed] = useState(false);

  // 약관 동의 핸들러
  const handleTermsAgree = () => {
    setIsAgreed(true);
  };

  // 유저 정보 mutation
  const mutation = useSaveUserInfo(onNext);

  // 회원가입
  const handleRegister = (e) => {
    if (e) e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, 'userinfo');

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    mutation.mutate({
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
          onSubmit={handleRegister}>
          {/* 이름 */}
          <div>
            <InputField
              label="이름"
              type="text"
              value={state.username}
              placeholder={state.placeholder.username}
              onChange={(e) =>
                dispatch({ type: 'SET_USERNAME', payload: e.target.value })
              }
            />

            <InputErrorMessage error={state.errors.username} />
          </div>

          {/* 닉네임 */}
          <div>
            <InputField
              label="닉네임"
              type="text"
              value={state.nickname}
              placeholder={state.placeholder.nickname}
              onChange={(e) =>
                dispatch({ type: 'SET_NICKNAME', payload: e.target.value })
              }
            />

            <InputErrorMessage error={state.errors.nickname} />
          </div>

          {/* 연락처 */}
          <div>
            <InputField
              label="연락처"
              type="text"
              value={state.phone}
              placeholder={state.placeholder.phone}
              onChange={(e) =>
                dispatch({
                  type: 'SET_PHONE',
                  payload: formatPhoneNumber(e.target.value),
                })
              }
            />

            <InputErrorMessage error={state.errors.phone} />
          </div>

          {/* 약관 동의 */}
          <TermsAgreement onAgree={handleTermsAgree} />

          {/* 버튼 영역 */}
          <div className="flex items-center gap-2 mt-6">
            <button
              type="button"
              onClick={onPrev}
              className="cursor-pointer flex w-full justify-center border border-gray-300 hover:bg-gray-100 dark:hover:bg-base-200 rounded-md px-3 py-1.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-indigo-600">
              이전
            </button>

            <button
              type="submit"
              className={`cursor-pointer flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-indigo-600
                ${
                  !isAgreed
                    ? 'bg-gray-300 hover:bg-gray-200 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              disabled={!isAgreed}>
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
