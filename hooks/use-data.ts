'use client';

import { useState, useEffect } from 'react';
import {
  projectsService,
  servicesService,
  staffService,
  vacanciesService,
} from '@/lib/supabase-service';
import {
  defaultProjects,
  defaultServices,
  defaultStaff,
  defaultVacancies,
} from '@/lib/default-data';
import { Project, Service, Staff, Vacancy } from '@/lib/types';

export const useProjects = (dashboardMode = false) => {
  // Seed with defaults immediately to prevent loading state (only for public site)
  const seededDefaults = defaultProjects.map((project, index) => ({
    id: `default-${index}`,
    ...project,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const [projects, setProjects] = useState<Project[]>(dashboardMode ? [] : seededDefaults);
  const [loading, setLoading] = useState(dashboardMode);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabaseProjects = await projectsService.getAll();
      
      if (supabaseProjects.length > 0) {
        setProjects(supabaseProjects);
      } else if (!dashboardMode) {
        // Keep seeded defaults if Supabase is empty (only for public site)
        setProjects(seededDefaults);
      } else {
        // Dashboard mode: show empty if no Supabase data
        setProjects([]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects');
      if (!dashboardMode) {
        // Keep seeded defaults on error (only for public site)
        setProjects(seededDefaults);
      } else {
        // Dashboard mode: show empty on error
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
};

export const useServices = (dashboardMode = false) => {
  // Seed with defaults immediately to prevent loading state (only for public site)
  const seededDefaults = defaultServices.map((service, index) => ({
    id: `default-${index}`,
    ...service,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const [services, setServices] = useState<Service[]>(dashboardMode ? [] : seededDefaults);
  const [loading, setLoading] = useState(dashboardMode);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabaseServices = await servicesService.getAll();
      
      if (supabaseServices.length > 0) {
        setServices(supabaseServices);
      } else if (!dashboardMode) {
        // Keep seeded defaults if Supabase is empty (only for public site)
        setServices(seededDefaults);
      } else {
        // Dashboard mode: show empty if no Supabase data
        setServices([]);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to fetch services');
      if (!dashboardMode) {
        // Keep seeded defaults on error (only for public site)
        setServices(seededDefaults);
      } else {
        // Dashboard mode: show empty on error
        setServices([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
  };
};

export const useStaff = (dashboardMode = false) => {
  // Seed with defaults immediately to prevent loading state (only for public site)
  const seededDefaults = defaultStaff.map((member, index) => ({
    id: `default-${index}`,
    ...member,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const [staff, setStaff] = useState<Staff[]>(dashboardMode ? [] : seededDefaults);
  const [loading, setLoading] = useState(dashboardMode);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabaseStaff = await staffService.getAll();
      
      if (supabaseStaff.length > 0) {
        setStaff(supabaseStaff);
      } else if (!dashboardMode) {
        // Keep seeded defaults if Supabase is empty (only for public site)
        setStaff(seededDefaults);
      } else {
        // Dashboard mode: show empty if no Supabase data
        setStaff([]);
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to fetch staff');
      if (!dashboardMode) {
        // Keep seeded defaults on error (only for public site)
        setStaff(seededDefaults);
      } else {
        // Dashboard mode: show empty on error
        setStaff([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return {
    staff,
    loading,
    error,
    refetch: fetchStaff,
  };
};

export const useVacancies = (dashboardMode = false) => {
  // Seed with default data immediately so UI never appears empty (only for public site)
  const seededDefaults: Vacancy[] = defaultVacancies.map((vacancy, index) => ({
    id: `default-${index}`,
    ...vacancy,
    postedDate: new Date(),
    applicationDeadline: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as Vacancy[];

  const [vacancies, setVacancies] = useState<Vacancy[]>(dashboardMode ? [] : seededDefaults);
  const [loading, setLoading] = useState(dashboardMode);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabaseVacancies = await vacanciesService.getAll();
      
      if (supabaseVacancies.length > 0) {
        setVacancies(supabaseVacancies);
      } else if (!dashboardMode) {
        // Convert default data to include Supabase structure (only for public site)
        setVacancies(seededDefaults);
      } else {
        // Dashboard mode: show empty if no Supabase data
        setVacancies([]);
      }
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      setError('Failed to fetch vacancies');
      if (!dashboardMode) {
        // Fallback to default data on error (only for public site)
        setVacancies(seededDefaults);
      } else {
        // Dashboard mode: show empty on error
        setVacancies([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveVacancies = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabaseVacancies = await vacanciesService.getActive();
      
      if (supabaseVacancies.length > 0) {
        setVacancies(supabaseVacancies);
      } else {
        // Filter default data for active vacancies only
        const defaultData = defaultVacancies
          .filter(vacancy => vacancy.isActive)
          .map((vacancy, index) => ({
            id: `default-${index}`,
            ...vacancy,
            postedDate: new Date(),
            applicationDeadline: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));
        setVacancies(defaultData);
      }
    } catch (err) {
      console.error('Error fetching active vacancies:', err);
      setError('Failed to fetch active vacancies');
      // Fallback to default active data on error
      const defaultData = defaultVacancies
        .filter(vacancy => vacancy.isActive)
        .map((vacancy, index) => ({
          id: `default-${index}`,
          ...vacancy,
          postedDate: new Date(),
          applicationDeadline: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
      setVacancies(defaultData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  return {
    vacancies,
    loading,
    error,
    refetch: fetchVacancies,
    refetchActive: fetchActiveVacancies,
  };
};