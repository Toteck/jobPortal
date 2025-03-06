import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Heart, MapPinIcon, TrashIcon } from "lucide-react";
import { Job } from "@/types/job";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { saveJob } from "@/api/apijobs";
import { useEffect, useState } from "react";

type JobCard = {
  job: Job;
  isMyJob: boolean;
  savedInit: boolean;
  onJobSaved: () => void;
};

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}: JobCard) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();

  const {
    fn: fnSavedJob,
    data: dataSavedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob);

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user?.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (dataSavedJob !== undefined) setSaved(dataSavedJob?.length > 0);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {isMyJob && (
            <TrashIcon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>

        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant={"secondary"} className="w-full">
            More details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant={"outline"}
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export { JobCard };
