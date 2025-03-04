import { useUser } from "@clerk/clerk-react";

import { Navigate, useLocation } from "react-router-dom";

import { ReactNode } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to={"/?sign-in=true"} />;
  }
  return children;
};

export { ProtectedRoutes };
