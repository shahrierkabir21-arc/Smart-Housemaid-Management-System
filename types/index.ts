export type Role = 'admin' | 'employer' | 'housemaid';
export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status?: ReviewStatus;
  description?: string | null;
  phone?: string | null;
}

export interface Job {
  id: number;
  employer_id: number;
  title: string;
  location: string;
  salary: number | string;
  description: string;
  status: ReviewStatus;
}

export interface Maid {
  id: number;
  name: string;
  description?: string | null;
}

export interface Application {
  id: number;
  status: ReviewStatus;
  jobTitle: string;
  maidName?: string;
}
