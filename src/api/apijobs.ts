import supabaseClient from "@/utils/supabase";

type SearchProps = {
  location?: string;
  company_id?: string;
  searchQuery?: string;
};

export async function getJobs(
  token: string,
  { location, company_id, searchQuery }: SearchProps
) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), saved: saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}
