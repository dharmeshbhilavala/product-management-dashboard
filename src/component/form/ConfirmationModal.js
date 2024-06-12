// ConfirmationModal 
import React from "react";

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="bg-white rounded-lg shadow-xl max-w-md mx-auto z-10 min-w-[400px]">
        <div className="p-4">
          <h2 className="text-lg font-bold">Confirmation</h2>
          <p className="mt-2">{message}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
