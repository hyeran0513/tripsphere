import Toast from '../Molecules/Toast';

const ToastMessage = ({ toast, setToast }) => (
  <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-102">
    <Toast
      type={toast.type}
      message={toast.message}
      onClose={() => setToast(null)}
    />
  </div>
);

export default ToastMessage;
