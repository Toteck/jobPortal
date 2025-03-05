import { getJobs } from "@/api/apijobs";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [location, setLocation] = useState(false);
  const [company_id, setCompany_id] = useState(null);
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  console.log(dataJobs);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36D7B7" />;
  }

  return <div>JobListing</div>;
};

export { JobListing };
