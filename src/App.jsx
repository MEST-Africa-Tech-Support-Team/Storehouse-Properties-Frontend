import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./components/layouts/RootLayout.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Explore from "./pages/explore.jsx";
import Signup from "./pages/authPages/signUp.jsx";
import Login from "./pages/authPages/logIn.jsx";
import { Toaster } from "react-hot-toast";
import PropertyDetails from "./pages/propertyDetails.jsx";
import TermsConditions from "./pages/termsAndConditions.jsx";
import CompleteBookingPage from "./pages/confirmBooking.jsx";

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
