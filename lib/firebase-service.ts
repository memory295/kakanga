import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
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

// Convert Firestore Timestamp to Date
const timestampToDate = (timestamp: any): Date => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate();
  }
  return new Date();
};

// Projects Service
export const projectsService = {
  async getAll(): Promise<Project[]> {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: timestampToDate(doc.data().createdAt),
        updatedAt: timestampToDate(doc.data().updatedAt),
      } as Project));
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Project | null> {
    try {
      const docRef = doc(db, 'projects', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: timestampToDate(data.createdAt),
          updatedAt: timestampToDate(data.updatedAt),
        } as Project;
      }
      return null;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  },

  async create(data: ProjectFormData): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<ProjectFormData>): Promise<boolean> {
    try {
      const docRef = doc(db, 'projects', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'projects', id));
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
      const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: timestampToDate(doc.data().createdAt),
        updatedAt: timestampToDate(doc.data().updatedAt),
      } as Service));
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Service | null> {
    try {
      const docRef = doc(db, 'services', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: timestampToDate(data.createdAt),
          updatedAt: timestampToDate(data.updatedAt),
        } as Service;
      }
      return null;
    } catch (error) {
      console.error('Error fetching service:', error);
      return null;
    }
  },

  async create(data: ServiceFormData): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'services'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating service:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<ServiceFormData>): Promise<boolean> {
    try {
      const docRef = doc(db, 'services', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      return true;
    } catch (error) {
      console.error('Error updating service:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'services', id));
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
      const q = query(collection(db, 'staff'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: timestampToDate(doc.data().createdAt),
        updatedAt: timestampToDate(doc.data().updatedAt),
      } as Staff));
    } catch (error) {
      console.error('Error fetching staff:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Staff | null> {
    try {
      const docRef = doc(db, 'staff', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: timestampToDate(data.createdAt),
          updatedAt: timestampToDate(data.updatedAt),
        } as Staff;
      }
      return null;
    } catch (error) {
      console.error('Error fetching staff member:', error);
      return null;
    }
  },

  async create(data: StaffFormData): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'staff'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating staff member:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<StaffFormData>): Promise<boolean> {
    try {
      const docRef = doc(db, 'staff', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      return true;
    } catch (error) {
      console.error('Error updating staff member:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'staff', id));
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
      const q = query(collection(db, 'vacancies'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          postedDate: timestampToDate(data.postedDate),
          applicationDeadline: data.applicationDeadline ? timestampToDate(data.applicationDeadline) : undefined,
          createdAt: timestampToDate(data.createdAt),
          updatedAt: timestampToDate(data.updatedAt),
        } as Vacancy;
      });
    } catch (error) {
      console.error('Error fetching vacancies:', error);
      return [];
    }
  },

  async getActive(): Promise<Vacancy[]> {
    try {
      const q = query(
        collection(db, 'vacancies'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          postedDate: timestampToDate(data.postedDate),
          applicationDeadline: data.applicationDeadline ? timestampToDate(data.applicationDeadline) : undefined,
          createdAt: timestampToDate(data.createdAt),
          updatedAt: timestampToDate(data.updatedAt),
        } as Vacancy;
      });
    } catch (error) {
      console.error('Error fetching active vacancies:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Vacancy | null> {
    try {
      const docRef = doc(db, 'vacancies', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          postedDate: timestampToDate(data.postedDate),
          applicationDeadline: data.applicationDeadline ? timestampToDate(data.applicationDeadline) : undefined,
          createdAt: timestampToDate(data.createdAt),
          updatedAt: timestampToDate(data.updatedAt),
        } as Vacancy;
      }
      return null;
    } catch (error) {
      console.error('Error fetching vacancy:', error);
      return null;
    }
  },

  async create(data: VacancyFormData): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'vacancies'), {
        ...data,
        postedDate: Timestamp.now(),
        applicationDeadline: data.applicationDeadline ? Timestamp.fromDate(data.applicationDeadline) : null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating vacancy:', error);
      return null;
    }
  },

  async update(id: string, data: Partial<VacancyFormData>): Promise<boolean> {
    try {
      const docRef = doc(db, 'vacancies', id);
      const updateData: any = {
        ...data,
        updatedAt: Timestamp.now(),
      };
      
      if (data.applicationDeadline) {
        updateData.applicationDeadline = Timestamp.fromDate(data.applicationDeadline);
      }
      
      await updateDoc(docRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating vacancy:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'vacancies', id));
      return true;
    } catch (error) {
      console.error('Error deleting vacancy:', error);
      return false;
    }
  },
};