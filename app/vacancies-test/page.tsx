'use client';

import { useVacancies } from '@/hooks/use-data';

export default function VacanciesTestPage() {
  const { vacancies, loading, error } = useVacancies();

  console.log('Test page data:', { vacancies, loading, error });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vacancies Test Page</h1>
      
      <div className="mb-4">
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {error || 'None'}</p>
        <p><strong>Total vacancies:</strong> {vacancies.length}</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Vacancies Data:</h2>
        {vacancies.map((vacancy, index) => (
          <div key={vacancy.id || index} className="p-3 border rounded">
            <h3 className="font-semibold">{vacancy.title}</h3>
            <p className="text-sm">Active: {vacancy.isActive ? 'Yes' : 'No'}</p>
          </div>
        ))}
        
        {vacancies.length === 0 && !loading && (
          <p className="text-red-600">No vacancies data found!</p>
        )}
      </div>
    </div>
  );
}