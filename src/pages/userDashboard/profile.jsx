import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { toast } from 'react-hot-toast';

import UserSidebar from "../../components/userDashboard/userSidebar";
import ProfileInfoForm from "../../components/userDashboard/profileInfoForm";
import ProfilePictureUpload from "../../components/userDashboard/profilePictureUpload";
import ChangePasswordForm from "../../components/userDashboard/changePasswordForm";
import LastLoginInfo from "../../components/userDashboard/lastLoginInfo";
import DangerZone from "../../components/userDashboard/dangerZone";

const ProfilePage = () => {
  const { userName } = useOutletContext();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    profilePicture:
      "https://images.unsplash.com/photo-1580480716042-9a4b3d53c3e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
          setUser((prev) => ({ ...prev, ...savedUser }));
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(user));
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 800);
  };

  const handleSavePassword = () => {
    if (user.newPassword !== user.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    toast.success("Password changed successfully!");
  };

  const handleDeactivate = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="font-medium">Deactivate account?</span>
          <span className="text-sm text-gray-600">
            Are you sure you want to deactivate your account?
          </span>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.success("Account deactivated.");
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Deactivate
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="font-medium text-red-600">Delete account?</span>
          <span className="text-sm text-gray-600">
            This action cannot be undone. All your data will be permanently deleted.
          </span>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                toast.success("Account deleted.");
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  if (isLoading) {
    return (
      <div className="flex">
        <UserSidebar />
        <div className="ml-64 p-6 max-w-[1400px] w-full">
          <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <UserSidebar />
      <div className="ml-64 p-6 max-w-[1400px] w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-1">
            You have 4 favorite properties for your next trip
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-blue-600 mb-6">
              Profile Information
            </h2>

            <ProfileInfoForm
              fullName={user.fullName}
              email={user.email}
              phoneNumber={user.phoneNumber}
              onChange={handleInputChange}
            />

            <ProfilePictureUpload
              userName={user.fullName}
              currentImage={user.profilePicture}
              onUpload={(newImage) =>
                handleInputChange("profilePicture", newImage)
              }
            />

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => console.log("Cancelled")}
                  className="px-6 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className={`px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors ${
                    isSaving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-blue-600 mb-6">
              Change Password
            </h2>

            <ChangePasswordForm
              oldPassword={user.oldPassword}
              newPassword={user.newPassword}
              confirmPassword={user.confirmPassword}
              onOldPasswordChange={(value) =>
                handleInputChange("oldPassword", value)
              }
              onNewPasswordChange={(value) =>
                handleInputChange("newPassword", value)
              }
              onConfirmPasswordChange={(value) =>
                handleInputChange("confirmPassword", value)
              }
              onSave={handleSavePassword}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <DangerZone onDeactivate={handleDeactivate} onDelete={handleDelete} />
          <LastLoginInfo
            lastLoginDate="December 2, 2024 at 2:30 PM"
            deviceIP="MacBook Pro - 192.168.1.100"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;