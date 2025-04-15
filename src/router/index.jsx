import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetailPage from "../pages/UserPage/UserDetailPage";
import UserListPage from "../pages/UserPage/UserListPage";
import NavBar from "../components/NavBar";
import PostListPage from "../pages/PostPage/PostListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <NavBar />
      <UserListPage />
      </>
    
  ),
  },
  {
    path: "/users",
    element: (
      <>
      <NavBar />
      <UserListPage />
      </>
    
  ),
  },
  {
    path: "/users/:id",
    element: (
      <>
      <NavBar />
      <UserDetailPage />
      </>
    
  ),
  },
  {
    path: "/posts",
    element: (
      <>
      <NavBar />
      <PostListPage />
      </>
    
  ),
  },
  // {
  //   path: "/posts/:id",
  //   element: (
  //     <>
  //     <NavBar />
  //     <PostDetailPage />
  //     </>
    
  // ),
  // },
]);

 function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;