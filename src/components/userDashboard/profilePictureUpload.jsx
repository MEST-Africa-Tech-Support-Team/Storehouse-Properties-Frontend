import React, { useState } from 'react';
import { FaUpload } from "react-icons/fa";

const ProfilePictureUpload = ({ currentImage, onUpload, userName = "User" }) => {
  const [image, setImage] = useState(currentImage || null);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onUpload?.(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {image ? (
        <img
          src={image}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg border-2 border-gray-200">
          {getInitials(userName)}
        </div>
      )}
      <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
        <FaUpload className="text-xs" />
        Upload New
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfilePictureUpload;