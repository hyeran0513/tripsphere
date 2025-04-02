import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { BiMailSend } from 'react-icons/bi';
import { formatTime } from '../../utils/format';

const EmailPassword = ({ onNext, onPrev, showToast }) => {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(300);
  const [isCheckClicked, setIsCheckClicked] = useState(false);

  // Firebase 인증 상태 변경을 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsVerified(currentUser.emailVerified);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (timer === 0) return;

    // 1초마다 실행
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }

        // 타이머 1씩 감소
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 인증 완료
  const handleCheckVerification = async () => {
    if (!user) return;

    // 사용자 정보 새로고침
    await user.reload();
    setIsVerified(auth.currentUser?.emailVerified);

    // 인증 확인 버튼 클릭 상태
    setIsCheckClicked(true);

    if (auth.currentUser?.emailVerified) {
      showToast('success', '이메일 인증이 완료되었습니다.');
    } else {
      showToast('error', '아직 이메일 인증이 완료되지 않았습니다.');
    }
  };

  // 이메일 재발송
  const resendVerificationEmail = async () => {
    if (!user || !canResend) return;

    try {
      await sendEmailVerification(user);
      showToast('success', '새로운 이메일 인증 링크가 발송되었습니다.');

      // 5분 동안 재요청 불가
      setCanResend(false);
      setTimer(300);
    } catch (error) {
      console.error('이메일 전송 오류:', error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                {/* 회원가입 인증 메일 제목 */}
                <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
                  <BiMailSend /> 회원가입 인증 메일
                </h2>

                {/* 회원 인증 메일 설명 */}
                <p className="px-4 py-4 text-gray-600 bg-gray-100 dark:bg-base-300 dark:text-gray-200">
                  이 이메일 인증은 회원가입을 위한 필수 절차입니다.
                  <br />
                  인증 메일이 발송되었으니, 아래의{' '}
                  <span className="text-indigo-500 font-bold">
                    [인증 완료]
                  </span>{' '}
                  버튼을 클릭한 후, 홈페이지에서 나머지 회원가입 절차를 마무리해
                  주세요.
                </p>

                <div className="flex items-center gap-2 mt-4">
                  {/* 인증 완료 버튼 */}
                  <button
                    onClick={handleCheckVerification}
                    className={`btn flex-1 ${
                      isVerified
                        ? 'bg-gray-300 hover:bg-gray-200 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                    disabled={isVerified}>
                    인증 완료
                  </button>

                  {/* 인증 메일 재발송 버튼 */}
                  <button
                    onClick={resendVerificationEmail}
                    className={`btn flex-1 ${
                      canResend
                        ? 'border border-gray-300 hover:bg-gray-100 dark:hover:bg-base-200'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}>
                    {canResend
                      ? '인증 메일 재발송'
                      : `인증 메일 재발송 (${formatTime(timer)})`}
                  </button>
                </div>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex items-center gap-2 mt-6">
              <button
                type="button"
                onClick={onPrev}
                className="cursor-pointer flex w-full justify-center border border-gray-300 hover:bg-gray-100 dark:hover:bg-base-200 rounded-md px-3 py-1.5 text-sm font-semibold shadow-xs">
                이전
              </button>

              <button
                type="button"
                onClick={onNext}
                className={`cursor-pointer flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-xs ${
                  !isVerified || !isCheckClicked
                    ? 'bg-gray-300 hover:bg-gray-200 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
                disabled={!isVerified || !isCheckClicked}>
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPassword;
