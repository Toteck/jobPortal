import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role: string) => {
    await user
      ?.update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate("/monografias");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (isLoaded && user) {
      handleRoleSelection("student");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36D7B7" />;
  }

  return null;
};

export { Onboarding };
