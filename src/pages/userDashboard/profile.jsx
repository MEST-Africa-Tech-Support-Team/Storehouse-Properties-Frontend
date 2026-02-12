import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import UserSidebar from "../../components/userDashboard/userSidebar";
import ProfileInfoForm from "../../components/userDashboard/profileInfoForm";
import ChangePasswordForm from "../../components/userDashboard/changePasswordForm";
import LastLoginInfo from "../../components/userDashboard/lastLoginInfo";
import DangerZone from "../../components/userDashboard/dangerZone";

import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { refreshAuth } = useAuth();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePhoto: null,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Load user ONCE from authService
  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      setUser({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        profilePhoto: currentUser.profilePhoto || null,
      });
    }

    setIsLoading(false);
  }, []);

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  
  const handleSaveChanges = async () => {
    setIsSaving(true);

    try {
      const token = authService.getToken();
      if (!token) throw new Error("Authentication required");

      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("phone", user.phone);

      // Accept either File or data-URL string for profilePhoto
      if (user.profilePhoto) {
        // If it's already a File, append directly
        if (user.profilePhoto instanceof File) {
          formData.append("profilePhoto", user.profilePhoto);
        } else if (typeof user.profilePhoto === 'string' && user.profilePhoto.startsWith('data:')) {
          // convert dataURL -> Blob
          const resBlob = await (await fetch(user.profilePhoto)).blob();
          formData.append("profilePhoto", resBlob, `avatar.${resBlob.type.split('/')[1] || 'png'}`);
        }
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update profile");
      }

      const data = await res.json();
      const updatedUser = data.user || data;

      // Merge with existing stored user (don't rely solely on backend shape)
      const merged = {
        ...authService.getCurrentUser(),
        ...updatedUser,
      };

      // If the user uploaded a new File, request a cache-busted URL so the new avatar
      // appears immediately (and after refresh / re-login).
      const shouldCacheBust = user.profilePhoto instanceof File;

      // Persist and get the normalized user back from authService
      const persisted = authService.setCurrentUser(merged, { cacheBust: shouldCacheBust }) || authService.getCurrentUser();
      try { refreshAuth(); } catch (e) { /* noop if context unavailable */ }

      // Keep local component state in sync with the persisted/normalized user
      setUser({
        firstName: persisted.firstName || "",
        lastName: persisted.lastName || "",
        email: persisted.email || "",
        phone: persisted.phone || "",
        profilePhoto: persisted.profilePhoto || null,
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePassword = () => {
    toast.success("Password updated successfully");
  };

  const handleDeactivate = () => {
    toast.success("Your account has been deactivated");
  };

  const handleDelete = () => {
    toast.success("Your account has been deleted");
  };

  if (isLoading) {
    return (
      <div className="flex">
        <UserSidebar />
        <div className="ml-0 lg:ml-64 p-6 w-full animate-pulse">
          <div className="bg-white rounded-xl h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <UserSidebar />

      <div className="ml-0 lg:ml-64 p-6 flex-1 max-w-[1400px] w-full space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and security
          </p>
        </div>

        {/* Profile + Password */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-6">
              Profile Information
            </h2>

            <ProfileInfoForm
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              phone={user.phone}
              profilePhoto={user.profilePhoto}
              onChange={handleInputChange}
              /* Accept (file, previewUrl) from child */
              onAvatarChange={(file, preview) =>
                setUser((prev) => ({ ...prev, profilePhoto: file ?? preview }))
              }
            />

            <div className="border-t border-gray-200 pt-6 mt-6 flex justify-end gap-3">
              <button
                onClick={() => toast("Changes discarded")}
                className="px-6 py-2 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/10"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className={`px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg ${
                  isSaving
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/90"
                }`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-6">
              Change Password
            </h2>
            <ChangePasswordForm onSave={handleSavePassword} />
          </div>
        </div>

        {/* Danger + Last Login */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DangerZone
            onDeactivate={handleDeactivate}
            onDelete={handleDelete}
          />

          <LastLoginInfo
            lastLoginDate={new Date().toLocaleString()}
            deviceIP={
              <span className="text-blue-600 cursor-pointer hover:underline">
                Unknown device
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
