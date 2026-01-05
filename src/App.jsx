
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayout from "./components/layouts/RootLayout.jsx";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Explore from "./pages/explore.jsx";
import Signup from "./pages/authPages/signUp.jsx";
import Login from "./pages/authPages/logIn.jsx";
import { Toaster } from 'react-hot-toast'; 

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/explore", element: <Explore /> },
    ],
  },
   {path: "/signup", element: <Signup /> },
    {path: "/login", element: <Login /> },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}