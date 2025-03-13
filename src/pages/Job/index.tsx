import { getSingleJob, updateHiringStatus } from "@/api/apijobs";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import {
  Briefcase,
  Copy,
  DoorClosed,
  DoorOpen,
  DownloadCloud,
  DownloadIcon,
  KeyRound,
  MapIcon,
  ScrollText,
  Share,
  Share2,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/ApplyJobDrawer";
import { ApplicationCard } from "@/components/ApplicationCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Job = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = job?.resume;
    link.target = "_blank";
    link.click();
  };

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link foi copiado!");
    });
  };

  const handleShare = () => {
    const link = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: "Confira esta monografia no portal do IFMA",
        url: link,
      });
    } else {
      alert("Compartilhamento não suportado neste navegador.");
    }
  };

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl text-justify">
          {job?.title}
        </h1>
      </div>

      <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold">
        <ScrollText />
        Resumo
      </h2>
      <p className="sm:text-lg text-justify leading-6">{job?.description}</p>

      <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold">
        {" "}
        <KeyRound />
        Palavras chave
      </h2>
      <p>{job.keywords}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        O que você deseja fazer?
      </h2>

      <div>
        <Card>
          <CardContent className="flex items-center justify-between">
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 font-bold cursor-pointer"
            >
              <DownloadIcon />
              Baixar
            </Button>
            <Button
              onClick={handleCopyLink}
              className="flex items-center gap-2 font-bold"
            >
              <Copy />
              Copiar link
            </Button>
            <Button
              onClick={handleShare}
              className="flex items-center gap-2 font-bold"
            >
              <Share2 />
              Compartilhar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { Job };

// applied={job?.applications?.find((ap) => ap.candidate_id === user?.id)}
