import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getJobs(token: string, { searchQuery }) {
  const supabase = await supabaseClient(token);

  console.log("SearchQuery", { searchQuery });

  let query = supabase.from("jobs").select("*");

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
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

  if (alreadySaved) {
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
      .select("*")
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

export async function addNewMonograph(token: string, _, jobData) {
  try {
    const supabase = await supabaseClient(token);

    // fazendo upload do documento
    const random = Math.floor(Math.random() * 90000);
    const fileName = `monografia-${random}-${jobData.student_id}`;

    const { error: storageError } = await supabase.storage
      .from("resumes")
      .upload(fileName, jobData.resume);

    if (storageError) {
      console.error("Error uploading Resume: ", storageError);
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    const { data, error } = await supabase
      .from("jobs")
      .insert([{ ...jobData, resume }])
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error Creating Job:", error);
    return null;
  }
}

export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, companies(name, logo_url))");

  if (error) {
    console.error("Error Fetching Saved Jobs", error);
    return null;
  }

  return data;
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error Fetching Jobs", error);
    return null;
  }

  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Deleting Job", error);
    return null;
  }

  return data;
}
