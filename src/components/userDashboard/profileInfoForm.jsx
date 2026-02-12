import React from "react";
import { FaUpload } from "react-icons/fa";

const ProfileInfoWithAvatar = ({
  firstName = '',
  lastName = '',
  email = '',
  phone = '',
  profilePhoto,
  onChange,
  onAvatarChange,
}) => {
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="John"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+233 55 123 4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Profile Picture
        </label>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-light-primary/20 flex items-center justify-center
                            text-primary font-semibold text-xl border">
              {getInitials([firstName, lastName].filter(Boolean).join(' '))}
            </div>
          )}

          <label className="inline-flex items-center gap-2 px-4 py-2
                            bg-primary text-white text-sm font-medium
                            rounded-lg cursor-pointer hover:bg-hover transition">
            <FaUpload className="text-xs" />
            Upload New
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const preview = URL.createObjectURL(file);
                // Pass both the File and a preview URL to the parent
                onAvatarChange?.(file, preview);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoWithAvatar;
