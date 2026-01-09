'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');
  const [tables, setTables] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Wrap any thenable/promise-like (including Supabase query builders) with a timeout
  function withTimeout<T>(promiseLike: any, ms = 5000): Promise<T> {
    const p = Promise.resolve(promiseLike as any) as Promise<T>;
    return Promise.race([
      p,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms)) as Promise<T>,
    ]);
  }

    

  useEffect(() => {
    const testConnection = async () => {
      try {
        if (!isSupabaseConfigured) {
          setStatus('Supabase not configured');
          setError('Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
          return;
        }

        // Test 1: Basic connection (fast)
        setStatus('Testing basic connection...');
        const healthRes: any = await withTimeout(
          supabase.from('projects').select('id').limit(1),
          4000
        );
        if (healthRes?.error) {
          throw new Error(`Health check failed: ${healthRes.error.message}`);
        }

        // Test 2: Check tables exist
        setStatus('Checking tables...');
        const tableChecks: any[] = await Promise.all([
          withTimeout(supabase.from('projects').select('id').limit(1), 4000),
          withTimeout(supabase.from('services').select('id').limit(1), 4000),
          withTimeout(supabase.from('staff').select('id').limit(1), 4000),
          withTimeout(supabase.from('vacancies').select('id').limit(1), 4000),
        ]);

        const tableNames = ['projects', 'services', 'staff', 'vacancies'];
        const existingTables = tableNames.filter((_, index) => !tableChecks[index]?.error);
        setTables(existingTables);

        // Test 3: Fetch small sample
        setStatus('Fetching sample data...');
        const sampleRes: any = await withTimeout(
          supabase.from('projects').select('*').limit(3),
          4000
        );
        if (sampleRes?.error && sampleRes.error.code !== 'PGRST116') {
          throw new Error(`Data fetch failed: ${sampleRes.error.message}`);
        }

        setStatus(`✅ Success: ${existingTables.length}/4 tables, ${sampleRes?.data?.length || 0} projects`);
      } catch (err: any) {
        console.error('Supabase test failed:', err);
        setError(err.message || String(err));
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