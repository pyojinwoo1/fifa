import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-neutral-800 rounded-lg p-8 shadow-lg min-w-[320px] max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;