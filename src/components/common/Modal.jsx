import React from 'react';

const Modal = ({ modalId, buttonTitle, title, children, hideButton }) => {
  return (
    <>
      {!hideButton && (
        <button
          className="btn"
          onClick={() => document.getElementById(`${modalId}`).showModal()}>
          {buttonTitle}
        </button>
      )}

      <dialog
        id={modalId}
        className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div>
        </div>

        <form
          method="dialog"
          className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
