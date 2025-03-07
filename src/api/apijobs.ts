import { SearchProps } from "@/types/job";
import supabaseClient from "@/utils/supabase";

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

export async function saveJob(
  token: string,
  { alreadySaved }: { alreadySaved: boolean },
  saveData
) {
  const supabase = await supabaseClient(token);
  console.log({ saveData });

  if (alreadySaved) {
    console.log("Deleting Saved Job");
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error Deleting Saved Jobs:", deleteError);
      return null;
    }

    return data;
  } else {
    console.log("Inserting Saved Job");
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error insert save Job:", insertError);
      return null;
    }

    return data;
  }
}

export async function getSingleJob(token: string, { job_id }) {
  try {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("jobs")
      .select(
        "*, company:companies(name, logo_url), applications: applications(*)"
      )
      .eq("id", job_id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error Fetching Job:", error);
    return null;
  }
}

export async function updateHiringStatus(
  token: string,
  { job_id },
  isOpen: boolean
) {
  try {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("jobs")
      .update({ isOpen })
      .eq("id", job_id)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error Updating Job:", error);
    return null;
  }
}
