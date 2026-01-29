import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { toast } from "react-hot-toast";

import UserSidebar from "../../components/userDashboard/userSidebar";
import ProfileInfoForm from "../../components/userDashboard/profileInfoForm";
import ProfilePictureUpload from "../../components/userDashboard/profilePictureUpload";
import ChangePasswordForm from "../../components/userDashboard/changePasswordForm";
import LastLoginInfo from "../../components/userDashboard/lastLoginInfo";
import DangerZone from "../../components/userDashboard/dangerZone";

import authService from "../../services/authService";

const ProfilePage = () => {
  const { userName } = useOutletContext();

  const [user, setUser] = useState({
    firstName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    profilePicture: null,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from authService
  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      setUser({
        firstName: currentUser.firstName || "",
        surname: currentUser.surname || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        profilePicture: currentUser.profilePicture || null,
      });
    }

    setIsLoading(false);
  }, []);

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // Save profile (name, email, phone, avatar)
  const handleSaveChanges = async () => {
    setIsSaving(true);

    try {
      const token = authService.getToken();
      if (!token) throw new Error("Authentication required");

      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("surname", user.surname);
      formData.append("email", user.email);
      formData.append("phoneNumber", user.phoneNumber);

      if (user.profilePicture instanceof File) {
        formData.append("profilePicture", user.profilePicture);
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

      // 🔥 Persist updated user
      const existingUser = authService.getCurrentUser();
      const mergedUser = { ...existingUser, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(mergedUser));

      // 🔥 Sync UI
      setUser({
        firstName: mergedUser.firstName,
        surname: mergedUser.surname,
        email: mergedUser.email,
        phoneNumber: mergedUser.phoneNumber,
        profilePicture: mergedUser.profilePicture,
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
            <h2 className="text-xl font-bold text-blue-600 mb-6">
              Profile Information
            </h2>

            <ProfileInfoForm
              firstName={user.firstName}
              surname={user.surname}
              email={user.email}
              phoneNumber={user.phoneNumber}
              onChange={handleInputChange}
            />

            <ProfilePictureUpload
              userName={`${user.firstName} ${user.surname}`}
              currentImage={
                user.profilePicture instanceof File
                  ? URL.createObjectURL(user.profilePicture)
                  : user.profilePicture
              }
              onUpload={(file) =>
                handleInputChange("profilePicture", file)
              }
            />

            <div className="border-t border-gray-200 pt-6 mt-6 flex justify-end gap-3">
              <button
                onClick={() => toast("Changes discarded")}
                className="px-6 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className={`px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg ${
                  isSaving
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-blue-600 mb-6">
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
