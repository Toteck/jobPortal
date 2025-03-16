import { CreatedJobs } from "@/components/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader width={"100%"} className="mb-4" color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata.role === "candidate"
          ? "My Applications"
          : "Meus trabalhos"}
      </h1>
      <CreatedJobs />
    </div>
  );
};

export { MyJobs };
