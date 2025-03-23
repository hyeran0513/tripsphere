import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { BiCheck } from 'react-icons/bi';

const NotificationModal = ({ open, setOpen, text, type, onNavigate }) => {
  // 닫기 핸들러
  const handleClose = () => {
    setOpen(false);

    if (type === 'success') {
      onNavigate();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* 모달 체크 아이콘 */}
                <div
                  className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${
                    type === 'success' ? `bg-green-100` : 'bg-red-100'
                  } sm:mx-0 sm:size-10`}>
                  <BiCheck
                    aria-hidden="true"
                    className={`size-6 text-${type}`}
                  />
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  {/* 모달 제목 */}
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900">
                    {text.title}
                  </DialogTitle>

                  {/* 모달 설명 */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{text.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleClose}
                className={`inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-${type} sm:ml-3 sm:w-auto`}>
                확인
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default NotificationModal;
