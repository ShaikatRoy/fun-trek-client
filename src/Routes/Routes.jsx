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

import EnrolledClass from "../pages/Dashboard/EnrolledClass/EnrolledClass";
import SelectedClass from "../pages/Dashboard/SelectedClass/SelectedClass";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Instructors from "../pages/Instructors/Instructors";
import Payment from "../pages/Dashboard/Payment/Payment";

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
            path: "instructors",
            element: <Instructors></Instructors>
        },
        {
            path: "/classes",
            element: <Classes></Classes>
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
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            {
                path: 'manageclasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: 'manageusers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'addclass',
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path: 'myclasses',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: 'selectedclass',
                element: <PrivateRoute><SelectedClass></SelectedClass></PrivateRoute>
            },
            {
                path: 'enrolledclass',
                element: <PrivateRoute><EnrolledClass></EnrolledClass></PrivateRoute>
            }
        ]
    },
    {
        path: '*', 
        element: <ErrorPage></ErrorPage>
      }

  ]);
  