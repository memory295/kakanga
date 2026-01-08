// Simple Supabase connection test
// Run this with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdmrdtzjwygevqxdzsmf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXJkdHpqd3lnZXZxeGR6c21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MDI5NDAsImV4cCI6MjA1MTk3ODk0MH0.wP-x5c89mfZqPvCQnX-KdO64fDNzxiJdmgpP2nvFZJo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Basic connection
    const { data, error } = await supabase
      .from('projects')
      .select('count')
      .limit(1);
      
    console.log('Basic query result:', { data, error });
    
    // Test 2: Check if tables exist
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['projects', 'services', 'staff', 'vacancies']);
      
    console.log('Tables check:', { tables, tableError });
    
    // Test 3: Check RLS policies
    const { data: policies, error: policyError } = await supabase.rpc('get_policies_info');
    console.log('RLS policies check:', { policies, policyError });
    
  } catch (err) {
    console.error('Connection test failed:', err);
  }
}

testConnection();