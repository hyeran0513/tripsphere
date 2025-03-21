import React, { useState } from 'react';
import EmailPassword from '../../components/signup/EmailPassword';
import EmailVerification from '../../components/signup/EmailVerification';
import Completion from '../../components/signup/Completion';
import Step from '../../components/signup/Step';
import { Link } from 'react-router-dom';
import Toast from '../../components/common/Toast';
import UserInfo from '../../components/signup/UserInfo';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 1));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
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
          회원가입
        </h2>
      </div>

      {/* Step 진행바 */}
      <div className="flex min-h-full flex-col justify-center px-6 pt-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Step currentStep={currentStep} />
        </div>
      </div>

      {/* Step1. 이메일 & 비밀번호 입력 */}
      {currentStep === 1 && (
        <EmailPassword
          onNext={handleNextStep}
          showToast={showToast}
        />
      )}

      {/* Step2. 이메일 인증 */}
      {currentStep === 2 && (
        <EmailVerification
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          showToast={showToast}
        />
      )}

      {/* Step3. 이름, 닉네임, 연락처 입력 + 약관 동의 */}
      {currentStep === 3 && (
        <UserInfo
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}

      {/* Step4. 회원가입 완료 */}
      {currentStep === 4 && (
        <Completion
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}

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

export default SignUp;
