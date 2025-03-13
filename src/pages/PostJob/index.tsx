import { addNewMonograph } from "@/api/apijobs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

import courses from "../../data/courses.json";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  keywords: z.string().min(1, { message: "Key-words are required" }),
  course: z.string().min(1, {
    message: "Course is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

const PostJob = () => {
  const { isLoaded, user } = useUser();

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      course: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    error: errorCreateJob,
    data: dataCreateJob,
    loading: loadingCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewMonograph);

  const onSubmit = (data) => {
    console.log("Chamando Submit");
    fnCreateJob({
      ...data,
      student_id: user?.id,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) {
      navigate("/monografias");
    }
  }, [loadingCreateJob]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  // if (user?.unsafeMetadata?.role !== "recruiter") {
  //   return <Navigate to={"/jobs"} />;
  // }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Publique seu trabalho cientifico
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-0"
      >
        <Input placeholder="Título do trabalho" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea
          placeholder="Resumo do trabalho"
          {...register("description")}
        />

        <Input
          placeholder="Palavras chaves separadas por vírgula"
          {...register("keywords")}
        />
        {errors.keywords && (
          <p className="text-red-500">{errors.keywords.message}</p>
        )}

        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <div className="flex gap-4 items-center">
          <Controller
            name="course"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha o curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courses.map(({ name }) => {
                      return (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Input
          type="file"
          accept=".pdf, .doc, .docx"
          className="flex-1 file:text-gray-500"
          {...register("resume")}
        />
        {errors.resume && (
          <p className="text-red-500">{errors.resume.message}</p>
        )}

        {errors.course && (
          <p className="text-red-500">{errors.course.message}</p>
        )}

        {errorCreateJob && (
          <p className="text-red-500">{errorCreateJob.message}</p>
        )}

        {loadingCreateJob && <BarLoader width={"100%"} color="#36d7b7" />}

        <Button type="submit" variant={"blue"} size={"lg"} className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export { PostJob };
