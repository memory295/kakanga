'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing...');
  const [tables, setTables] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test 1: Basic connection
        setStatus('Testing basic connection...');
        const { data: healthData, error: healthError } = await supabase
          .from('projects')
          .select('count')
          .limit(1);

        if (healthError) {
          throw new Error(`Health check failed: ${healthError.message}`);
        }

        // Test 2: Check tables exist
        setStatus('Checking if tables exist...');
        const tableChecks = await Promise.all([
          supabase.from('projects').select('id').limit(1),
          supabase.from('services').select('id').limit(1),
          supabase.from('staff').select('id').limit(1),
          supabase.from('vacancies').select('id').limit(1),
        ]);

        const tableNames = ['projects', 'services', 'staff', 'vacancies'];
        const existingTables = tableNames.filter((_, index) => !tableChecks[index].error);
        setTables(existingTables);

        // Test 3: Try to fetch some data
        setStatus('Testing data fetch...');
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .limit(5);

        if (projectsError && projectsError.code !== 'PGRST116') {
          throw new Error(`Data fetch failed: ${projectsError.message}`);
        }

        setStatus(`✅ Success! Found ${existingTables.length}/4 tables, ${projectsData?.length || 0} projects`);
      } catch (err: any) {
        console.error('Supabase test failed:', err);
        setError(err.message);
        setStatus('❌ Connection failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
      <p className="text-sm mb-2"><strong>Status:</strong> {status}</p>
      {tables.length > 0 && (
        <p className="text-sm mb-2">
          <strong>Available tables:</strong> {tables.join(', ')}
        </p>
      )}
      {error && (
        <div className="text-red-600 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}