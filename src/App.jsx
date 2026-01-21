import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// Layouts
import RootLayout from "./components/layouts/RootLayout.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import DashboardLayout from "./components/layouts/userDashboardLayout.jsx";
import AdminLayout from "./components/layouts/AdminLayout.jsx";

// Public Pages
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Explore from "./pages/explore.jsx";
import PropertyDetails from "./pages/propertyDetails.jsx";
import TermsConditions from "./pages/termsAndConditions.jsx";
import CompleteBookingPage from "./pages/confirmBooking.jsx";

// Auth Pages
import Signup from "./pages/authPages/signUp.jsx";
import Login from "./pages/authPages/logIn.jsx";

// User Dashboard Pages
import UserDashboardOverview from "./pages/userDashboard/overview.jsx";
import BookingsPage from "./pages/userDashboard/booking.jsx";
import FavoritesPage from "./pages/userDashboard/favorites.jsx";
import ProfilePage from "./pages/userDashboard/profile.jsx";
import SupportPage from "./pages/userDashboard/support.jsx";

// Admin Dashboard Pages
import AdminOverviewPage from "./pages/adminDashboard/overview.jsx";
import AdminAnalyticsPage from "./pages/adminDashboard/analytics.jsx";
import AdminBookingsPage from "./pages/adminDashboard/bookings.jsx";
import AdminPropertiesPage from "./pages/adminDashboard/properties.jsx";
import AdminSettingsPage from "./pages/adminDashboard/settings.jsx";
import AdminUsersPage from "./pages/adminDashboard/users.jsx";
import AdminAddPropertyPage from "./pages/adminDashboard/addProperty.jsx";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/explore", element: <Explore /> },
      { path: "/property/:id", element: <PropertyDetails /> },
    ],
  },
  {
    element: (
      <AuthProvider>
        <DashboardLayout />
      </AuthProvider>
    ),
    children: [
      { path: "/dashboard", element: <UserDashboardOverview /> },
      { path: "/dashboard/bookings", element: <BookingsPage /> },
      { path: "/dashboard/favorites", element: <FavoritesPage /> },
      { path: "/dashboard/profile", element: <ProfilePage /> },
      { path: "/dashboard/support", element: <SupportPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminOverviewPage /> },
      { path: "analytics", element: <AdminAnalyticsPage /> },
      { path: "bookings", element: <AdminBookingsPage /> },
      { path: "properties", element: <AdminPropertiesPage /> },
      { path: "properties/add", element: <AdminAddPropertyPage /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
    ],
  },
  { path: "/property/:id/terms&conditions", element: <TermsConditions /> },
  { path: "/property/:id/booking/confirm", element: <CompleteBookingPage /> },
  {
    element: (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    ),
    children: [
      { path: "/auth/signup", element: <Signup /> },
      { path: "/auth/login", element: <Login /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
