'use client';

import { useInView } from '@/hooks/use-in-view';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import clsx from 'clsx';
import { useVacancies } from '@/hooks/use-data';

export default function VacanciesPage() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  const { ref: vacancyRef, inView: vacancyInView } = useInView<HTMLDivElement>({ threshold: 0.1, once: true });
  const { ref: generalRef, inView: generalInView } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  
  const { vacancies, loading, error } = useVacancies();

  if (loading) {
    return (
      <Layout>
        <PageHeader
          title="Join Our Team"
        />
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
    console.error('Vacancies page error:', error);
    // Component will still render with empty state or cached data
  }

  // Filter for active vacancies only
  const activeVacancies = vacancies.filter(vacancy => vacancy.isActive);

  return (
    <Layout>
      <PageHeader
        title="Join Our Team"
      />

      {/* Current Openings */}
      <section className="section-padding">
        <div className="container-wide">
          <div 
            ref={headerRef}
            className={clsx(
              'text-center mb-12 transition-all duration-700 ease-out',
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="heading-3 font-heading mb-4">
              Join Our <span className="text-header">Team</span>
            </h2>
            <p className="body-base max-w-2xl mx-auto">
              Build your career with Malawi's leading construction company. 
              We offer competitive packages and growth opportunities.
            </p>
          </div>

          {activeVacancies.length > 0 ? (
            <div ref={vacancyRef} className="space-y-6">
              {activeVacancies.map((vacancy, index) => (
                <div 
                  key={vacancy.id}
                  className={clsx(
                    "bg-white/30 hover:bg-white/60 rounded-lg p-6 md:p-8 transition-all duration-500 border border-gray-200 hover:shadow-sm transform",
                    vacancyInView 
                      ? `opacity-100 translate-y-0 delay-[${index * 100}ms]` 
                      : 'opacity-0 translate-y-6'
                  )}
                  style={{
                    transitionDelay: vacancyInView ? `${index * 150}ms` : '0ms'
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="heading-4 mb-3">
                        {vacancy.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4 body-small">
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
                      <p className="body-base mb-4">
                        {vacancy.description}
                      </p>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {vacancy.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 body-small">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="lg:shrink-0">
                      <Button className="w-full lg:w-auto">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div ref={vacancyRef} className={clsx(
              "text-center py-16 bg-muted/50 rounded-lg transition-all duration-700 ease-out",
              vacancyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              <Briefcase className={clsx(
                "w-16 h-16 text-muted-foreground mx-auto mb-4 transition-all duration-500 ease-out",
                vacancyInView ? 'opacity-100 scale-100 delay-200' : 'opacity-0 scale-90'
              )} />
              <h3 className={clsx(
                "heading-5 mb-2 transition-all duration-500 ease-out",
                vacancyInView ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'
              )}>
                No Current Openings
              </h3>
              <p className={clsx(
                "body-base transition-all duration-500 ease-out",
                vacancyInView ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-4'
              )}>
                We don't have any vacancies at the moment. Please check back later.
              </p>
            </div>
          )}

          {/* General Application */}
          <div 
            ref={generalRef}
            className={clsx(
              "mt-12 bg-header/10 rounded-lg p-8 text-center transition-all duration-700 ease-out",
              generalInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h3 className={clsx(
              "heading-5 mb-3 transition-all duration-500 ease-out",
              generalInView ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4'
            )}>
              Don't see a suitable position?
            </h3>
            <p className={clsx(
              "body-base mb-6 max-w-xl mx-auto transition-all duration-500 ease-out",
              generalInView ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'
            )}>
              We're always looking for talented individuals. Send us your CV and we'll 
              keep it on file for future opportunities.
            </p>
            <Button 
              variant="outline" 
              className={clsx(
                "gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 ease-out transform hover:scale-105",
                generalInView ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-4'
              )}
            >
              Submit General Application <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}