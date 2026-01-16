import React from 'react';
import { FaPause, FaTrash } from "react-icons/fa";

const DangerZone = ({ onDeactivate, onDelete }) => {
  return (
    <div className="bg-red-50 p-6 rounded-xl border border-red-200 mt-8">
      <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
        <FaPause className="text-red-500" />
        Danger Zone
      </h3>
      <div className="space-y-3">
        <button
          onClick={onDeactivate}
          className="w-full px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <FaPause size={14} />
          Deactivate Account
        </button>
        <button
          onClick={onDelete}
          className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaTrash size={14} />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DangerZone;