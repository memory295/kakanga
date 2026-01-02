// Data types for the application
export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  referenceNumber: string;
  location: string;
  image: string | string[];
  description?: string;
  completionDate?: Date;
  projectValue?: string;
  keyFeatures?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  department?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vacancy {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  postedDate: Date;
  applicationDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  lastLogin?: Date;
}

// Form data types
export interface ProjectFormData {
  title: string;
  category: string;
  client: string;
  referenceNumber: string;
  location: string;
  image: string | string[];
  description?: string;
  completionDate?: Date;
  projectValue?: string;
  keyFeatures?: string[];
}

export interface ServiceFormData {
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface StaffFormData {
  name: string;
  role: string;
  photo: string;
  bio?: string;
  department?: string;
  email?: string;
  phone?: string;
}

export interface VacancyFormData {
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  applicationDeadline?: Date;
}