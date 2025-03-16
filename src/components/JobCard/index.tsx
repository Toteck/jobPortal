import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EditIcon, GraduationCap, Heart, Trash2Icon } from "lucide-react";
import { Job } from "@/types/job";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apijobs";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

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
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user?.id,
      job_id: job.id,
    });
    onJobSaved();
    setSaved(!saved);
  };

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  const handleEditJob = () => {
    navigate(`/edit-job/${job.id}`, { state: { job } });
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold leading-6">
          {job.title}

          {isMyJob && (
            <div className="flex gap-2">
              <Trash2Icon
                fill="red"
                size={50}
                className="text-red-300 cursor-pointer"
                onClick={handleDeleteJob}
              />
              <EditIcon
                size={50}
                className="text-blue-300 cursor-pointer"
                onClick={handleEditJob}
              />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <GraduationCap size={15} /> {job.course}
          </div>
        </div>

        <hr />
        <p className="leading-6 text-justify">
          {job.description.substring(0, job.description.indexOf("."))}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/monografia/${job.id}`} className="flex-1">
          <Button variant={"secondary"} className="w-full">
            Mais detalhes
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
