import { Boxes, Download, School } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useFetch } from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const ApplicationCard = ({ job, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = job?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    { job_id: job.job_id }
  );

  return (
    <Card>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job?.title}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <School size={15} />
            {job?.course}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={15} />
            Keywords: {job?.keywords}
          </div>
        </div>
        <hr />
        <p>{job?.description}</p>
      </CardContent>
    </Card>
  );
};

export { ApplicationCard };
