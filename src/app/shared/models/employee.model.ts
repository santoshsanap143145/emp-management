export interface Iemployee {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  experience: number;
  company: string;
  dob: string;
  gender: string;
  education: string;
  id: string;
  isEditMode?: boolean;
}

export interface IemployeeRef {
  [key: string]: Iemployee;
}