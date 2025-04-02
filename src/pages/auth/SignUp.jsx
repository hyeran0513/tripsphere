import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailPassword from '../../components/Molecules/EmailPassword';
import EmailVerification from '../../components/Molecules/EmailVerification';
import Completion from '../../components/Molecules/Completion';
import UserInfo from '../../components/Molecules/UserInfo';
import Step from '../../components/Atoms/Step';
import ToastMessage from '../../components/Atoms/ToastMessage';
import { useDeleteUnverifiedUser } from '../../hooks/useAuthData';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [toast, setToast] = useState(null);

  // 토스트 메시지 표시
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // 이전 단계 핸들러
  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // 다음 단계 핸들러
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // 이메일 인증되지 않은 유저 삭제
  useDeleteUnverifiedUser();

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          to="/"
          className="block text-center">
          <p className="font-bold text-2xl">
            TRIP<span className="text-indigo-500">SPHERE</span>
          </p>
        </Link>

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          회원가입
        </h2>
      </div>

      {/* Step 진행바 */}
      <div className="flex min-h-full flex-col justify-center px-6 pt-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Step currentStep={currentStep} />
        </div>
      </div>

      {/* Step 1: 이메일 & 비밀번호 입력 */}
      {currentStep === 1 && (
        <EmailPassword
          onNext={handleNextStep}
          showToast={showToast}
        />
      )}

      {/* Step 2: 이메일 인증 */}
      {currentStep === 2 && (
        <EmailVerification
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          showToast={showToast}
        />
      )}

      {/* Step 3: 유저 정보 입력 */}
      {currentStep === 3 && (
        <UserInfo
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}

      {/* Step 4: 회원가입 완료 */}
      {currentStep === 4 && (
        <Completion
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}

      {/* 토스트 메시지 */}
      {toast && (
        <ToastMessage
          toast={toast}
          setToast={setToast}
        />
      )}
    </>
  );
};

export default SignUp;
