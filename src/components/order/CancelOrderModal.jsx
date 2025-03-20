import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

const CancelOrderModal = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('단순 변심');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleInitialConfirm = () => {
    setShowConfirmDialog(true);
  };

  const handleFinalConfirm = () => {
    onConfirm(reason);
    onClose();
    setShowConfirmDialog(false);
  };

  return (
    <>
      {/* 취소 사유 선택 모달 */}
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-200 p-6 rounded-lg shadow-lg w-96">
          <Dialog.Title className="text-lg dark:text-black font-bold">
            주문 취소
          </Dialog.Title>
          <div className="mt-4">
            <label className="block mb-2 text-sm dark:text-black font-medium">
              취소 사유
            </label>
            <select
              className="w-full border border-gray-300 dark:text-black rounded p-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}>
              <option value="단순 변심">단순 변심</option>
              <option value="옵션 변경">옵션 변경</option>
              <option value="다른 상품으로 변경">다른 상품으로 변경</option>
              <option value="상품 정보와 다름">상품 정보와 다름</option>
              <option value="상품이 필요 없어짐">상품이 필요 없어짐</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
              onClick={onClose}>
              취소
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleInitialConfirm}>
              확인
            </button>
          </div>
        </div>
      </Dialog>

      {/* 추가 확인 모달 */}
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-100 p-6 rounded-lg shadow-lg w-80">
          <Dialog.Title className="text-lg dark:text-black font-bold">
            정말 취소하시겠습니까?
          </Dialog.Title>
          <p className="mt-2 text-sm dark:text-black">
            선택한 사유: <strong>{reason}</strong>
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
              onClick={() => setShowConfirmDialog(false)}>
              취소
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleFinalConfirm}>
              확인
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CancelOrderModal;
