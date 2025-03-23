import React, { useState } from 'react';
import Rating from '../common/Rating';
import { useAddReview } from '../../hooks/useReviewData';
import { useParams } from 'react-router-dom';
import Toast from '../common/Toast';
import { auth } from '../../firebase/firebaseConfig';
import useAuthStore from '../../stores/useAuthStore';
import NoData from '../common/NoData';
import { BiMessageAltEdit } from 'react-icons/bi';

const ReviewForm = ({ handleNewReview, productId }) => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const user = auth.currentUser;
  const { isAuthenticated } = useAuthStore();

  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const { mutate, isLoading, error } = useAddReview(showToast, handleNewReview);

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
          <textarea
            className="textarea h-28 p-3 border rounded-lg resize-none w-full text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="리뷰를 작성해 주세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}></textarea>

          <div className="flex items-center justify-between">
            <Rating setRating={setRating} />

            <button
              type="submit"
              onClick={handleAddReview}
              disabled={!comment.trim() && !rating}
              className={`self-end rounded-lg px-6 py-2 font-medium transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
        ${
          comment.trim() && rating
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}>
              전송
            </button>
          </div>
        </div>
      ) : (
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
