import { getJobs } from "@/api/apijobs";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Job } from "@/types/job";
import { JobCard } from "@/components/JobCard";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | boolean>(false);
  const [company_id, setCompany_id] = useState<number | null>(null);
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  }: {
    fn: () => void;
    data: Job[] | null | undefined;
    loading: boolean;
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36D7B7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Add filters here */}
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36D7B7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isMyJob={false}
                savedInit={job.saved?.length > 0}
                onJobSaved={() => {}}
              />
            ))
          ) : (
            <div>No Jobs Found 😥</div>
          )}
        </div>
      )}
    </div>
  );
};

export { JobListing };
