import supabaseClient from "@/utils/supabase";

export async function getJobs(token: string) {
  const supabase = await supabaseClient(token);

  const query = supabase.from("jobs").select("*");

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}
