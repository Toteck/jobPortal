import supabaseClient from "@/utils/supabase";

export async function getCompanies(token: string) {
  try {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase.from("companies").select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }
}
