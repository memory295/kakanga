'use client';

import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useVacancies } from '@/hooks/use-data';

export default function VacanciesPage() {
  const { vacancies, loading, error } = useVacancies();

  const activeVacancies = vacancies.filter((v) => v.isActive);

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

  if (error) {
    // Non-blocking: show a soft message but continue rendering defaults
    // eslint-disable-next-line no-console
    console.warn('Vacancies page error:', error);
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
              Build your career with Malawi's leading construction company. We
              offer competitive packages and growth opportunities.
            </p>
          </div>

          {activeVacancies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {activeVacancies.map((vacancy) => (
                <Card key={vacancy.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {vacancy.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {vacancy.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {vacancy.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {vacancy.department}
                          </span>
                          {vacancy.applicationDeadline && (
                            <span className="text-red-600 font-medium">
                              Apply by: {vacancy.applicationDeadline.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-4">{vacancy.description}</p>
                        {vacancy.requirements && vacancy.requirements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                            <ul className="space-y-1">
                              {vacancy.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="lg:shrink-0">
                        <Button className="w-full lg:w-auto">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Current Openings</h3>
              <p className="text-gray-600">
                We don't have any vacancies at the moment. Please check back later.
              </p>
            </div>
          )}

          <div className="mt-12 bg-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Don't see a suitable position?</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              We're always looking for talented individuals. Send us your CV and we'll keep it on file for future opportunities.
            </p>
            <Button variant="outline">Submit General Application</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}