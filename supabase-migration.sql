-- Supabase Migration for Kakanga Constructions
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email text NOT NULL,
    display_name text,
    role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login timestamp with time zone,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title text NOT NULL,
    category text NOT NULL,
    client text NOT NULL,
    reference_number text,
    location text NOT NULL,
    image text, -- Can be single URL or JSON array for multiple images
    description text,
    completion_date timestamp with time zone,
    project_value text,
    key_features text[], -- Array of strings
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    image text,
    features text[], -- Array of strings
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create staff table
CREATE TABLE IF NOT EXISTS public.staff (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    role text NOT NULL,
    photo text,
    bio text,
    department text,
    email text,
    phone text,
    linkedin text,
    experience text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create vacancies table
CREATE TABLE IF NOT EXISTS public.vacancies (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title text NOT NULL,
    location text NOT NULL,
    type text NOT NULL,
    department text NOT NULL,
    description text NOT NULL,
    requirements text[], -- Array of strings
    responsibilities text[], -- Array of strings (optional)
    is_active boolean DEFAULT true,
    posted_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    application_deadline timestamp with time zone,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Modify existing tables to allow NULL values in specific columns (in case tables were created with NOT NULL constraints)
ALTER TABLE public.projects ALTER COLUMN image DROP NOT NULL;
ALTER TABLE public.projects ALTER COLUMN reference_number DROP NOT NULL;
ALTER TABLE public.services ALTER COLUMN image DROP NOT NULL;
ALTER TABLE public.services ALTER COLUMN features DROP NOT NULL;
ALTER TABLE public.staff ALTER COLUMN photo DROP NOT NULL;
ALTER TABLE public.vacancies ALTER COLUMN requirements DROP NOT NULL;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
DROP TRIGGER IF EXISTS update_staff_updated_at ON public.staff;
DROP TRIGGER IF EXISTS update_vacancies_updated_at ON public.vacancies;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vacancies_updated_at BEFORE UPDATE ON public.vacancies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);

CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);

CREATE INDEX IF NOT EXISTS idx_services_created_at ON public.services (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_staff_created_at ON public.staff (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_staff_department ON public.staff (department);

CREATE INDEX IF NOT EXISTS idx_vacancies_created_at ON public.vacancies (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vacancies_is_active ON public.vacancies (is_active);
CREATE INDEX IF NOT EXISTS idx_vacancies_department ON public.vacancies (department);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies for each table to avoid conflicts
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on users table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'users' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.users';
    END LOOP;
    
    -- Drop all policies on projects table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'projects' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.projects';
    END LOOP;
    
    -- Drop all policies on services table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'services' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.services';
    END LOOP;
    
    -- Drop all policies on staff table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'staff' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.staff';
    END LOOP;
    
    -- Drop all policies on vacancies table
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'vacancies' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.vacancies';
    END LOOP;
END $$;

-- Create user policies for authenticated users only
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for public read access (allow everyone to read data)
-- These policies allow BOTH anonymous AND authenticated users to read
CREATE POLICY "Allow everyone to read projects" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Allow everyone to read services" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Allow everyone to read staff" ON public.staff
    FOR SELECT USING (true);

CREATE POLICY "Allow everyone to read vacancies" ON public.vacancies
    FOR SELECT USING (true);

-- Create policies for authenticated write access (only logged in users can edit/delete)
CREATE POLICY "Authenticated users can insert projects" ON public.projects
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects" ON public.projects
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete projects" ON public.projects
    FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert services" ON public.services
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update services" ON public.services
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete services" ON public.services
    FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert staff" ON public.staff
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update staff" ON public.staff
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete staff" ON public.staff
    FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert vacancies" ON public.vacancies
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update vacancies" ON public.vacancies
    FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete vacancies" ON public.vacancies
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- Drop ALL existing storage policies to avoid conflicts
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on storage.objects
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON storage.objects';
    END LOOP;
END $$;

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for uploads bucket (public read, authenticated write)
CREATE POLICY "Anyone can view uploads" ON storage.objects
    FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update uploads" ON storage.objects
    FOR UPDATE USING (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete uploads" ON storage.objects
    FOR DELETE USING (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);