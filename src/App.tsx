import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { AppLayout } from "./layouts/app-layout";

import { Onboarding } from "./pages/Onboarding";
import { LandingPage } from "./pages/LadingPage";
import { JobListing } from "./pages/JobListing";
import { Job } from "./pages/Job";
import { PostJob } from "./pages/PostJob";
import { SavedJobs } from "./pages/SavedJobs";
import { MyJobs } from "./pages/MyJobs";
import { ThemeProvider } from "./components/theme-provider";

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
        element: <Onboarding />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <Job />,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/saved-job",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
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
