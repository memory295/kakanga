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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const firebaseProjects = await projectsService.getAll();
      
      if (firebaseProjects.length > 0) {
        setProjects(firebaseProjects);
      } else {
        // Convert default data to include Firebase structure
        const defaultData = defaultProjects.map((project, index) => ({
          id: `default-${index}`,
          ...project,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
        setProjects(defaultData);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects');
      // Fallback to default data on error
      const defaultData = defaultProjects.map((project, index) => ({
        id: `default-${index}`,
        ...project,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      setProjects(defaultData);
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

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const firebaseServices = await servicesService.getAll();
      
      if (firebaseServices.length > 0) {
        setServices(firebaseServices);
      } else {
        // Convert default data to include Firebase structure
        const defaultData = defaultServices.map((service, index) => ({
          id: `default-${index}`,
          ...service,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
        setServices(defaultData);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to fetch services');
      // Fallback to default data on error
      const defaultData = defaultServices.map((service, index) => ({
        id: `default-${index}`,
        ...service,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      setServices(defaultData);
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

export const useStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const firebaseStaff = await staffService.getAll();
      
      if (firebaseStaff.length > 0) {
        setStaff(firebaseStaff);
      } else {
        // Convert default data to include Firebase structure
        const defaultData = defaultStaff.map((member, index) => ({
          id: `default-${index}`,
          ...member,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
        setStaff(defaultData);
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to fetch staff');
      // Fallback to default data on error
      const defaultData = defaultStaff.map((member, index) => ({
        id: `default-${index}`,
        ...member,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      setStaff(defaultData);
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

export const useVacancies = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
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
        const defaultData = defaultVacancies.map((vacancy, index) => ({
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
      console.error('Error fetching vacancies:', err);
      setError('Failed to fetch vacancies');
      // Fallback to default data on error
      const defaultData = defaultVacancies.map((vacancy, index) => ({
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