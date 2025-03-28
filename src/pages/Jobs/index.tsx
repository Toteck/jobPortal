import { useEffect, useState } from "react";

import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

import { Job } from "@/types/job";

import { getJobs } from "@/api/apijobs";
import { getCompanies } from "@/api/apiCompanies";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/JobCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

import { courses } from "@/data/courses";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [course, setCourse] = useState("");
  const [company_id, setCompany_id] = useState();
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
    course,
    searchQuery,
  });

  // const {
  //   fn: fnCompanies,
  //   data: companies,
  // }: {
  //   fn: () => void;
  //   data: Job[] | null | undefined;
  //   loading: boolean;
  // } = useFetch(getCompanies);

  const handleSearch = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);

    const query = formdata.get("search-query");
    const selectedCourse = formdata.get("course");

    setSearchQuery(query || "");
    setCourse(selectedCourse || "");
  };

  const clearFilters = () => {
    setSearchQuery("");
    // setCompany_id("");
    setCourse("");
  };

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [course, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36D7B7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Trabalhos mais recentes
      </h1>

      {/* Add filters here */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-4 items-center"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button
          type="submit"
          className="h-full sm:w-28 cursor-pointer"
          variant={"blue"}
        >
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Select value={course} onValueChange={(value) => setCourse(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por curso" />
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

        {/* <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Button
          className="flex-1 sm:w-auto"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

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

export { Jobs };
