import { supabase } from './supabase';
import {
  Project,
  Service,
  Staff,
  Vacancy,
  ProjectFormData,
  ServiceFormData,
  StaffFormData,
  VacancyFormData
} from './types';

// Helper function to convert database row to frontend format
const convertDatabaseFields = (data: any) => {
  const converted = { ...data };
  
  // Convert snake_case to camelCase for common fields
  if (data.reference_number) converted.referenceNumber = data.reference_number;
  if (data.completion_date) converted.completionDate = new Date(data.completion_date);
  if (data.project_value) converted.projectValue = data.project_value;
  if (data.key_features) converted.keyFeatures = data.key_features;
  if (data.posted_date) converted.postedDate = new Date(data.posted_date);
  if (data.application_deadline) converted.applicationDeadline = new Date(data.application_deadline);
  if (data.is_active !== undefined) converted.isActive = data.is_active;
  
  // Convert timestamps
  if (data.created_at) converted.createdAt = new Date(data.created_at);
  if (data.updated_at) converted.updatedAt = new Date(data.updated_at);
  
  return converted;
};

// Helper function to convert frontend data to database format
const convertToDatabase = (data: any) => {
  const converted = { ...data };
  
  // Convert camelCase to snake_case for database
  if (data.referenceNumber) {
    converted.reference_number = data.referenceNumber;
    delete converted.referenceNumber;
  }
  if (data.completionDate) {
    converted.completion_date = data.completionDate.toISOString();
    delete converted.completionDate;
  }
  if (data.projectValue) {
    converted.project_value = data.projectValue;
    delete converted.projectValue;
  }
  if (data.keyFeatures) {
    converted.key_features = data.keyFeatures;
    delete converted.keyFeatures;
  }
  if (data.postedDate) {
    converted.posted_date = data.postedDate.toISOString();
    delete converted.postedDate;
  }
  if (data.applicationDeadline) {
    converted.application_deadline = data.applicationDeadline.toISOString();
    delete converted.applicationDeadline;
  }
  if (data.isActive !== undefined) {
    converted.is_active = data.isActive;
    delete converted.isActive;
  }
  
  return converted;
};

// Projects Service
export const projectsService = {
  async getAll(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching projects:', error);
        throw error;
      }

      if (!data) {
        console.warn('No data returned from projects query');
        return [];
      }

      return data.map(item => convertDatabaseFields(item) as Project);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Return empty array instead of throwing to prevent app crashes
      return [];
    }
  },

  async getById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return convertDatabaseFields(data) as Project;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  },

  async create(data: ProjectFormData): Promise<string | null> {
    try {
      console.log('ProjectService.create called with:', data);
      
      const dbData = convertToDatabase({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const { data: result, error } = await supabase
        .from('projects')
        .insert([dbData as any])
        .select('id')
        .single();

      if (error) throw error;
      if (!result) return null;
      
      console.log('Project created successfully with ID:', result.id);
      return result.id;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<ProjectFormData>): Promise<boolean> {
    try {
      const dbData = convertToDatabase({
        ...data,
        updated_at: new Date().toISOString(),
      });

      const { error } = await supabase
        .from('projects')
        .update(dbData as any)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  },
};

// Services Service
export const servicesService = {
  async getAll(): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching services:', error);
        throw error;
      }

      if (!data) {
        console.warn('No data returned from services query');
        return [];
      }

      return data.map(item => convertDatabaseFields(item) as Service);
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Service | null> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return convertDatabaseFields(data) as Service;
    } catch (error) {
      console.error('Error fetching service:', error);
      return null;
    }
  },

  async create(data: ServiceFormData): Promise<string | null> {
    try {
      console.log('ServiceService.create called with:', data);
      
      const dbData = {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: result, error } = await supabase
        .from('services')
        .insert([dbData as any])
        .select('id')
        .single();

      if (error) throw error;
      if (!result) return null;
      
      console.log('Service created successfully with ID:', result.id);
      return result.id;
    } catch (error) {
      console.error('Error creating service:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<ServiceFormData>): Promise<boolean> {
    try {
      const dbData = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('services')
        .update(dbData as any)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating service:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      return false;
    }
  },
};

// Staff Service
export const staffService = {
  async getAll(): Promise<Staff[]> {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching staff:', error);
        throw error;
      }

      if (!data) {
        console.warn('No data returned from staff query');
        return [];
      }

      return data.map(item => convertDatabaseFields(item) as Staff);
    } catch (error) {
      console.error('Error fetching staff:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Staff | null> {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return convertDatabaseFields(data) as Staff;
    } catch (error) {
      console.error('Error fetching staff member:', error);
      return null;
    }
  },

  async create(data: StaffFormData): Promise<string | null> {
    try {
      console.log('StaffService.create called with:', data);
      
      const dbData = {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: result, error } = await supabase
        .from('staff')
        .insert([dbData as any])
        .select('id')
        .single();

      if (error) throw error;
      if (!result) return null;
      
      console.log('Staff created successfully with ID:', result.id);
      return result.id;
    } catch (error) {
      console.error('Error creating staff member:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<StaffFormData>): Promise<boolean> {
    try {
      const dbData = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('staff')
        .update(dbData as any)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating staff member:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting staff member:', error);
      return false;
    }
  },
};

// Vacancies Service
export const vacanciesService = {
  async getAll(): Promise<Vacancy[]> {
    try {
      const { data, error } = await supabase
        .from('vacancies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching vacancies:', error);
        throw error;
      }

      if (!data) {
        console.warn('No data returned from vacancies query');
        return [];
      }

      return data.map(item => convertDatabaseFields(item) as Vacancy);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
      return [];
    }
  },

  async getActive(): Promise<Vacancy[]> {
    try {
      const { data, error } = await supabase
        .from('vacancies')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(item => convertDatabaseFields(item) as Vacancy);
    } catch (error) {
      console.error('Error fetching active vacancies:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Vacancy | null> {
    try {
      const { data, error } = await supabase
        .from('vacancies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return convertDatabaseFields(data) as Vacancy;
    } catch (error) {
      console.error('Error fetching vacancy:', error);
      return null;
    }
  },

  async create(data: VacancyFormData): Promise<string | null> {
    try {
      const dbData = convertToDatabase({
        ...data,
        posted_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const { data: result, error } = await supabase
        .from('vacancies')
        .insert([dbData as any])
        .select('id')
        .single();

      if (error) throw error;
      if (!result) return null;
      
      return result.id;
    } catch (error) {
      console.error('Error creating vacancy:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<VacancyFormData>): Promise<boolean> {
    try {
      const dbData = convertToDatabase({
        ...data,
        updated_at: new Date().toISOString(),
      });

      const { error } = await supabase
        .from('vacancies')
        .update(dbData as any)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating vacancy:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('vacancies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting vacancy:', error);
      return false;
    }
  },
};