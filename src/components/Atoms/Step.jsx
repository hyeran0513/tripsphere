import React from 'react';

const Step = ({ currentStep }) => {
  const steps = ['정보 입력', '본인 확인', '추가 정보', '가입 완료'];

  return (
    <ol className="steps steps-horizontal sm:w-full sm:max-w-sm">
      {steps.map((step, index) => (
        <li
          key={index}
          data-content={index < currentStep ? '✓' : index + 1}
          className={`step ${index < currentStep ? 'step-primary' : ''}`}>
          {step}
        </li>
      ))}
    </ol>
  );
};

export default Step;
