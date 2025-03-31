import React, { useState } from 'react';
import Rating from '../../common/Rating';
import { useAddReview } from '../../../hooks/useReviewData';
import { auth } from '../../../firebase/firebaseConfig';
import useAuthStore from '../../../stores/useAuthStore';
import NoData from '../../common/NoData';
import { BiMessageAltEdit } from 'react-icons/bi';
import ToastMessage from '../../common/ToastMessage';

const ReviewForm = ({ handleNewReview, productId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const user = auth.currentUser;
  const { isAuthenticated } = useAuthStore();
  const [toast, setToast] = useState(null);

  // 토스트 보여주기
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // firebase에 리뷰 추가
  const { mutate, isLoading } = useAddReview(showToast, handleNewReview);

  // 리뷰 추가 핸들러
  const handleAddReview = (e) => {
    if (e) e.preventDefault();

    const review = {
      accommodation_id: productId,
      user_id: user.uid,
      comment,
      rating,
    };

    mutate(review);

    // 초기화
    setComment('');
    setRating('');
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col gap-4 p-5 border rounded-xl mb-10 border-gray-200">
          {/* 리뷰 작성 폼 */}
          <textarea
            className="textarea h-28 p-3 border rounded-lg resize-none w-full text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="리뷰를 작성해 주세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}></textarea>

          <div className="flex items-center justify-between">
            {/* 별점 */}
            <Rating setRating={setRating} />

            {/* 전송 버튼 */}
            <button
              type="submit"
              onClick={handleAddReview}
              disabled={!comment.trim() && !rating}
              className={`cursor-pointer self-end rounded-lg px-6 py-2 font-medium transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
              ${
                comment.trim() && rating
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}>
              {isLoading ? '전송 중...' : '전송'}
            </button>
          </div>
        </div>
      ) : (
        // 노데이터
        <NoData
          text="로그인 후 리뷰를 작성하실 수 있습니다."
          icon={BiMessageAltEdit}
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

export default ReviewForm;
