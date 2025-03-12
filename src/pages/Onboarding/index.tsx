import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      navigate("/monografias");
    }
  }, [isLoaded, navigate]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36D7B7" />;
  }

  return null;
};

export { Onboarding };
