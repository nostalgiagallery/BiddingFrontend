import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Signup from "./features/auth/components/Signup";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ResetPassword from "./features/auth/components/ResetPassword";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AlertTemplate from "react-alert-template-basic";
import Login from "./features/auth/components/Login";
import Process from "./pages/Process";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Register from "./features/register/components/Register";
import Bidpage from "./pages/Bidpage";
import { positions, Provider } from "react-alert";

const options = {
  timeout: 4000,
  position: positions.TOP_RIGHT,
  offset: "20px",
  // // you can also just use 'scale'
  // transition: transitions.FADE
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/process",
      element: <Process />,
    },
    {
      path: "/Product-page",
      element: <ProductPage />,
    },
    {
      path: "/Product-details/:id",
      element: <ProductDetailsPage />,
    },
    {
      path: "/Product-register/:id",
      element: <Register />,
    },
    {
      path: "/bid-page/:id",
      element: <Bidpage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ]);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
