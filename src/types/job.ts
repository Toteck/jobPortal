export type Job = {
  id: number;
  created_at: string; // Use string para representar o tipo timestamptz
  recruiter_id: string;
  title: string;
  company_id: number;
  description: string;
  location: string;
  requirements: string;
  isOpen: boolean;
  company: {
    name: string;
    logo_url: string;
  };
  saved: any[]; // Ajuste o tipo conforme necessário
};
