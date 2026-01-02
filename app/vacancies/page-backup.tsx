'use client';

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { useVacancies } from '@/hooks/use-data';

export default function VacanciesPage() {
  const { vacancies, loading, error } = useVacancies();

  // Debug the data
  console.log('Vacancies page:', {
    vacanciesCount: vacancies.length,
    vacancies: vacancies,
    loading,
    error
  });

  // Filter for active vacancies only
  const activeVacancies = vacancies.filter(vacancy => vacancy.isActive);
  
  console.log('Active vacancies count:', activeVacancies.length);

export default function VacanciesPage() {
  const { vacancies, loading, error } = useVacancies();

  // Debug the data
  console.log('Vacancies page:', {
    vacanciesCount: vacancies.length,
    vacancies: vacancies,
    loading,
    error
  });

  // Filter for active vacancies only
  const activeVacancies = vacancies.filter(vacancy => vacancy.isActive);
  
  console.log('Active vacancies count:', activeVacancies.length);

  if (loading) {
    return (
      <Layout>
        <PageHeader title="Join Our Team" />
        <div className="section-padding">
          <div className="container-wide">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <p className="mt-6 text-gray-600">Loading vacancies...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Join Our Team" />
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current <span className="text-primary">Openings</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build your career with Malawi's leading construction company. 
              We offer competitive packages and growth opportunities.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Debug: Total vacancies: {vacancies.length}, Active: {activeVacancies.length}
            </p>
          </div>

          {/* Test rendering with a simple card first */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Debug Information:</h3>
            <div className="space-y-2 text-sm">
              <p>Loading: {loading ? 'Yes' : 'No'}</p>
              <p>Error: {error || 'None'}</p>
              <p>Total vacancies: {vacancies.length}</p>
              <p>Active vacancies: {activeVacancies.length}</p>
            </div>
          </div>

          {activeVacancies.length > 0 ? (
            <div className="space-y-6">
              {activeVacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-white p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-2">{vacancy.title}</h3>
                  <p className="text-gray-600 mb-2">{vacancy.location} • {vacancy.type}</p>
                  <p className="text-gray-700">{vacancy.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg font-semibold">No active vacancies found</p>
              <p className="text-gray-600">Total vacancies in data: {vacancies.length}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
}