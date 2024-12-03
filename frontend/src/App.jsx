import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import MyProfile from './pages/MyProfile/MyProfile'
import FindAlliance from "./pages/FindAlliances/FindAlliances";
import Diplomacy from "./pages/Diplomacy/Diplomacy"
import UserProfile from "./pages/UsersProfiles/UserProfile";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/feed",
    element: <FeedPage />,
  },
  {
    path: '/myprofile',
    element: <MyProfile />,
  },
  {
    path: '/findalliances',
    element: <FindAlliance />
  },
  {
    path: '/diplomacy',
    element: <Diplomacy />,
  },
  {
    path: '/userprofile/:userId',
    element: <UserProfile />,
  },
  {
    path: '/my-profile',
    element: <MyProfile />,
  },
  
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
