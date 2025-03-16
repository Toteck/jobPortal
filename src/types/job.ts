export type Job = {
  id: number;
  created_at: string; // Use string para representar o tipo timestamptz
  student_id: string;
  title: string;
  description: string;
  keywords: string;
  course: string;
  resume: string;
  saved?: SaveJobProps[]; // Ajuste o tipo conforme necessário
};

export type SearchProps = {
  location?: string;
  company_id?: string;
  searchQuery?: string;
};

export type SaveJobProps = {
  user_id: string;
  job_id: string;
};
