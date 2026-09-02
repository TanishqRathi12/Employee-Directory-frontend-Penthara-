import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {  // Modal component to display content in a modal dialog
  if (!isOpen) return null; 

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the modal content (bubbling)
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,  // Render the modal in the body of the document to ensure it overlays other content
  );
};

export default Modal;
