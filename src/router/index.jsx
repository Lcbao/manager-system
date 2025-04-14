import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserDetailPage from "../pages/UserDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/users/:id",
    element: <UserDetailPage />,
  },
]);

 function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;