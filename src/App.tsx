import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { AppLayout } from "./layouts/app-layout";

import { Onboarding } from "./pages/Onboarding";
import { LandingPage } from "./pages/LadingPage";
import { Jobs } from "./pages/Jobs";
import { Job } from "./pages/Job";
import { PostJob } from "./pages/PostJob";
import { SavedJobs } from "./pages/SavedJobs";
import { MyJobs } from "./pages/MyJobs";
import { ThemeProvider } from "./components/theme-provider";
import { ProtectedRoutes } from "./components/protected-routes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoutes>
            <Onboarding />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/monografias",
        element: (
          <ProtectedRoutes>
            <Jobs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoutes>
            <Job />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/submeter-monografia",
        element: (
          <ProtectedRoutes>
            <PostJob />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoutes>
            <SavedJobs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoutes>
            <MyJobs />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
