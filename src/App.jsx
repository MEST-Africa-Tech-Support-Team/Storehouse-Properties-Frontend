import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.jsx";

import RootLayout from "./components/layouts/RootLayout.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import DashboardLayout from "./components/layouts/userDashboardLayout.jsx";
import AdminLayout from "./components/layouts/AdminLayout.jsx";

import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Explore from "./pages/explore.jsx";
import PropertyDetails from "./pages/propertyDetails.jsx";
import TermsConditions from "./pages/termsAndConditions.jsx";
import CompleteBookingPage from "./pages/confirmBooking.jsx";
import NotFound from "./pages/notFound.jsx";

import Signup from "./pages/authPages/signUp.jsx";
import Login from "./pages/authPages/logIn.jsx";
import EmailVerification from "./pages/authPages/emailVerification.jsx";
import ForgotPassword from "./pages/authPages/forgotPassword.jsx";
import ResetPassword from "./pages/authPages/resetPassword.jsx";
import CheckEmail from "./pages/authPages/checkEmail.jsx";


import UserDashboardOverview from "./pages/userDashboard/overview.jsx";
import BookingsPage from "./pages/userDashboard/booking.jsx";
import FavoritesPage from "./pages/userDashboard/favorites.jsx";
import ProfilePage from "./pages/userDashboard/profile.jsx";
import SupportPage from "./pages/userDashboard/support.jsx";
import UserBookingDetailPage from "./pages/userDashboard/bookingDetails.jsx";

import AdminOverviewPage from "./pages/adminDashboard/overview.jsx";
import AdminAnalyticsPage from "./pages/adminDashboard/analytics.jsx";
import AdminBookingsPage from "./pages/adminDashboard/bookings.jsx";
import AdminPropertiesPage from "./pages/adminDashboard/properties.jsx";
import AdminSettingsPage from "./pages/adminDashboard/settings.jsx";
import AdminUsersPage from "./pages/adminDashboard/users.jsx";
import AdminAddPropertyPage from "./pages/adminDashboard/addProperty.jsx";
import AdminBookingDetailPage from "./pages/adminDashboard/bookingDetailPage.jsx";
import UserDetailPage from "./pages/adminDashboard/userDetailsPage.jsx";
import AdminRecentBookingsPage from "./pages/adminDashboard/AdminRecentBookingsPage.jsx";
import AdminBookingReviewPage from "./pages/adminDashboard/AdminBookingReviewPage.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/explore", element: <Explore /> },
      { path: "/property/:id", element: <PropertyDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <UserDashboardOverview /> },
      { path: "/dashboard/bookings", element: <BookingsPage /> },
      { path: "/dashboard/favorites", element: <FavoritesPage /> },
      { path: "/dashboard/profile", element: <ProfilePage /> },
      { path: "/dashboard/support", element: <SupportPage /> },
      { path: "/dashboard/bookings/:id", element: <UserBookingDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: "analytics", element: <AdminAnalyticsPage /> },
      { path: "bookings", element: <AdminBookingsPage /> },
      { path: "properties", element: <AdminPropertiesPage /> },
      { path: "properties/add", element: <AdminAddPropertyPage /> },
      { path: "bookings/:id", element: <AdminBookingDetailPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "users/:id", element: <UserDetailPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
      { path: "recent-bookings", element: <AdminRecentBookingsPage /> },
      { path: "review-booking/:id", element: <AdminBookingReviewPage />},
    ],
  },
  {
    path: "/property/terms&conditions",
    element: (
      <ProtectedRoute>
        <TermsConditions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/property/booking/confirmation",
    element: (
      <ProtectedRoute>
        <CompleteBookingPage />
      </ProtectedRoute>
    ),
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/auth/signup", element: <Signup /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/verify-email", element: <EmailVerification /> },
      {path: "/auth/forgot-password", element: <ForgotPassword/>},
      {path: "/auth/reset-password/:token?", element: <ResetPassword/>},
      {path: "/auth/check-email", element: <CheckEmail/>},
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 5000,
            style: {
              background: '#10b981',
            },
          },
          error: {
            duration: 6000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </>
  );
}