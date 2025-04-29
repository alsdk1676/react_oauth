import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main/Main";
import Mypage from "../pages/my/Mypage";
import SignIn from "../pages/signIn/SignIn";
import SignInSuccess from "../pages/signIn/SignInSuccess";
import SignUp from "../pages/signUp/SignUp";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout />,
    children : [
      {
        path : "",
        element : <Main />
      },
      {
        path : "/my",
        element : <Mypage />
      }
    ]
  },
  {
    path : "/sign-in",
    element : <SignIn />
  },
  {
    path : "/sign-in-success",
    element : <SignInSuccess />
  },
  {
    path : "/sign-up",
    element : <SignUp />
  },
])

export default router;