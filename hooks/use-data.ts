'use client';

import { useState, useEffect } from 'react';
import {
  projectsService,
  servicesService,
  staffService,
  vacanciesService,
} from '@/lib/firebase-service';
import {
  defaultProjects,
  defaultServices,
  defaultStaff,
  defaultVacancies,
} from '@/lib/default-data';
import { Project, Service, Staff, Vacancy } from '@/lib/types';

export const useProjects = () => {
  // Seed with defaults immediately to prevent loading state
  const seededDefaults = defaultProjects.map((project, index) => ({
    id: `default-${index}`,
    ...project,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const [projects, setProjects] = useState<Project[]>(seededDefaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setError(null);
      const firebaseProjects = await projectsService.getAll();
      
      if (firebaseProjects.length > 0) {
        setProjects(firebaseProjects);
      } else {
        // Keep seeded defaults if Firebase is empty
        setProjects(seededDefaults);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects');
      // Keep seeded defaults on error
      setProjects(seededDefaults);
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

export const useServices = () => {
  // Seed with defaults immediately to prevent loading state
  const seededDefaults = defaultServices.map((service, index) => ({
    id: `default-${index}`,
    ...service,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const [services, setServices] = useState<Service[]>(seededDefaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setError(null);
      const firebaseServices = await servicesService.getAll();
      
      if (firebaseServices.length > 0) {
        setServices(firebaseServices);
      } else {
        // Keep seeded defaults if Firebase is empty
        setServices(seededDefaults);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to fetch services');
      // Keep seeded defaults on error
      setServices(seededDefaults);
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

export const useStaff = () => {
  // Seed with defaults immediately to prevent loading state
  const seededDefaults = defaultStaff.map((member, index) => ({
    id: `default-${index}`,
    ...member,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const [staff, setStaff] = useState<Staff[]>(seededDefaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = async () => {
    try {
      setError(null);
      const firebaseStaff = await staffService.getAll();
      
      if (firebaseStaff.length > 0) {
        setStaff(firebaseStaff);
      } else {
        // Keep seeded defaults if Firebase is empty
        setStaff(seededDefaults);
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to fetch staff');
      // Keep seeded defaults on error
      setStaff(seededDefaults);
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

export const useVacancies = () => {
  // Seed with default data immediately so UI never appears empty
  const seededDefaults: Vacancy[] = defaultVacancies.map((vacancy, index) => ({
    id: `default-${index}`,
    ...vacancy,
    postedDate: new Date(),
    applicationDeadline: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as Vacancy[];

  const [vacancies, setVacancies] = useState<Vacancy[]>(seededDefaults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError(null);
      const firebaseVacancies = await vacanciesService.getAll();
      
      if (firebaseVacancies.length > 0) {
        setVacancies(firebaseVacancies);
      } else {
        // Convert default data to include Firebase structure
        setVacancies(seededDefaults);
      }
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      setError('Failed to fetch vacancies');
      // Fallback to default data on error
      setVacancies(seededDefaults);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveVacancies = async () => {
    try {
      setLoading(true);
      setError(null);
      const firebaseVacancies = await vacanciesService.getActive();
      
      if (firebaseVacancies.length > 0) {
        setVacancies(firebaseVacancies);
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