import { getJobs } from "@/api/apijobs";
import { useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

const JobListing = () => {
  const { session } = useSession();

  useEffect(() => {
    const fetchJobs = async () => {
      if (session) {
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        if (supabaseAccessToken) {
          console.log(supabaseAccessToken);
          const data = await getJobs(supabaseAccessToken);
          console.log(data);
        } else {
          console.log("Failed to get supabase access token.");
        }
      } else {
        console.log("Session is not loaded yet.");
      }
    };

    fetchJobs();
  }, [session]);

  return <div>JobListing</div>;
};

export { JobListing };
