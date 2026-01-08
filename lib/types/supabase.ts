export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          role: string
          created_at: string
          last_login: string | null
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          role?: string
          created_at?: string
          last_login?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          role?: string
          created_at?: string
          last_login?: string | null
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          category: string
          client: string
          reference_number: string | null
          location: string
          image: string | null
          description: string | null
          completion_date: string | null
          project_value: string | null
          key_features: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          category: string
          client: string
          reference_number?: string | null
          location: string
          image?: string | null
          description?: string | null
          completion_date?: string | null
          project_value?: string | null
          key_features?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          client?: string
          reference_number?: string | null
          location?: string
          image?: string | null
          description?: string | null
          completion_date?: string | null
          project_value?: string | null
          key_features?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          image: string | null
          features: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image?: string | null
          features?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string | null
          features?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      staff: {
        Row: {
          id: string
          name: string
          role: string
          photo: string | null
          bio: string | null
          department: string | null
          email: string | null
          phone: string | null
          linkedin: string | null
          experience: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          photo?: string | null
          bio?: string | null
          department?: string | null
          email?: string | null
          phone?: string | null
          linkedin?: string | null
          experience?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          photo?: string | null
          bio?: string | null
          department?: string | null
          email?: string | null
          phone?: string | null
          linkedin?: string | null
          experience?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vacancies: {
        Row: {
          id: string
          title: string
          location: string
          type: string
          department: string
          description: string
          requirements: string[] | null
          responsibilities: string[] | null
          is_active: boolean
          posted_date: string
          application_deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          location: string
          type: string
          department: string
          description: string
          requirements?: string[] | null
          responsibilities?: string[] | null
          is_active?: boolean
          posted_date?: string
          application_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          location?: string
          type?: string
          department?: string
          description?: string
          requirements?: string[] | null
          responsibilities?: string[] | null
          is_active?: boolean
          posted_date?: string
          application_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}