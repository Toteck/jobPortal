import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import { getSingleJob, updateJob } from "@/api/apijobs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { Job } from "@/types/job";
import { useUser } from "@clerk/clerk-react";

const EditJob = () => {
  const { isLoaded } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [jobData, setJobData] = useState<Job>(
    location.state?.job || ({} as Job)
  );

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { fn: fnUpdateJob } = useFetch(updateJob, {
    job_id: id,
    jobData,
  });

  useEffect(() => {
    if (job) {
      setJobData(job);
    }
  }, [job]);

  useEffect(() => {
    if (isLoaded) fnJob();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await fnUpdateJob(jobData);
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Editar Monografia
      </h1>
      <form className="flex flex-col gap-4">
        <Input
          type="text"
          name="title"
          value={jobData?.title || ""}
          onChange={handleInputChange}
          placeholder="Título"
        />
        <Input
          type="text"
          name="course"
          value={jobData?.course || ""}
          onChange={handleInputChange}
          placeholder="Curso"
        />
        <Input
          type="text"
          name="keywords"
          value={jobData?.keywords || ""}
          onChange={handleInputChange}
          placeholder="Palavras-chave"
        />
        <textarea
          name="description"
          value={jobData?.description || ""}
          onChange={handleInputChange}
          placeholder="Descrição"
          className="h-32 p-2 border rounded"
        />
        <Button onClick={handleSave} className="mt-4">
          Salvar
        </Button>
      </form>
    </div>
  );
};

export { EditJob };
