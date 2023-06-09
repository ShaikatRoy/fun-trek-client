import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Classes from "../pages/Classes/Classes";
import DashBoard from "../Layout/DashBoard";
import SelectedClass from "../pages/SelectedClass/SelectedClass";
import EnrolledClass from "../pages/EnrolledClass/EnrolledClass";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/classes",
            element: <PrivateRoute><Classes></Classes></PrivateRoute>,
        },
        {
            path: 'login',
            element: <Login></Login>,
        },
        {
            path: 'signup',
            element: <SignUp></SignUp>
        }
      ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: 'selectedclass',
                element: <SelectedClass></SelectedClass>
            },
            {
                path: 'enrolledclass',
                element: <EnrolledClass></EnrolledClass>
            }
        ]
    }
  ]);
  