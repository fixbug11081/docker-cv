import { createBrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Homepage from "./features/interview/pages/Home";
import Protected from "./features/auth/components/Protected";
import Interview from "./features/interview/pages/Interview";
import Header from "./features/interview/pages/Header";

const ProtectedLayout = ({ children }) => (
  <Protected>
    <Header />
    <main>{children}</main>
  </Protected>
);
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedLayout>
        <Homepage />
      </ProtectedLayout>
    ),
  },
  {
    path: "/interview/:interviewId",
    element: (
      <ProtectedLayout>
        <Interview />
      </ProtectedLayout>
    ),
  },
]);
