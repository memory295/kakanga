'use client';

import { useInView } from '@/hooks/use-in-view';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import clsx from 'clsx';

const vacancies = [
  {
    title: "Civil Engineer",
    location: "Lilongwe",
    type: "Full-time",
    department: "Engineering",
    description: "We are looking for an experienced Civil Engineer to join our team and oversee construction projects from conception to completion.",
    requirements: [
      "Bachelor's degree in Civil Engineering",
      "5+ years experience in construction",
      "Professional registration preferred",
      "Strong project management skills",
    ],
  },
  {
    title: "Site Supervisor",
    location: "Blantyre",
    type: "Full-time",
    department: "Operations",
    description: "Seeking a skilled Site Supervisor to manage daily construction activities and ensure project milestones are met safely and efficiently.",
    requirements: [
      "Diploma in Construction or related field",
      "3+ years supervisory experience",
      "Knowledge of safety regulations",
      "Strong leadership abilities",
    ],
  },
  {
    title: "Heavy Equipment Operator",
    location: "Various Locations",
    type: "Full-time",
    department: "Operations",
    description: "Experienced heavy equipment operators needed for excavators, graders, and bulldozers across multiple project sites.",
    requirements: [
      "Valid heavy equipment license",
      "3+ years operating experience",
      "Good safety record",
      "Willingness to travel",
    ],
  },
  {
    title: "Quantity Surveyor",
    location: "Lilongwe",
    type: "Full-time",
    department: "Finance",
    description: "Looking for a detail-oriented Quantity Surveyor to manage project costs and prepare accurate bills of quantities.",
    requirements: [
      "Degree in Quantity Surveying",
      "Professional certification",
      "Experience with construction software",
      "Strong analytical skills",
    ],
  },
];

export default function VacanciesPage() {
  const { ref: headerRef, inView: headerInView } = useInView({ 
    threshold: 0.2, 
    rootMargin: '0px 0px -10% 0px', 
    once: true 
  });
  
  const { ref: vacancyRef, inView: vacancyInView } = useInView({ 
    threshold: 0.1, 
    rootMargin: '0px 0px -5% 0px', 
    once: true 
  });

  const { ref: generalRef, inView: generalInView } = useInView({ 
    threshold: 0.3, 
    rootMargin: '0px 0px -10% 0px', 
    once: true 
  });

  return (
    <Layout>
      <PageHeader title="Vacancies" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div 
            ref={headerRef}
            className={clsx(
              'text-center mb-12 transition-all duration-700 ease-out',
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Join Our <span className="text-header">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build your career with Malawi's leading construction company. 
              We offer competitive packages and growth opportunities.
            </p>
          </div>

          {vacancies.length > 0 ? (
            <div ref={vacancyRef} className="space-y-6">
              {vacancies.map((vacancy, index) => (
                <div 
                  key={index}
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
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {vacancy.description}
                      </p>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {vacancy.requirements.map((req, idx) => (
                            <li key={idx} className={clsx(
                              "flex items-center gap-2 body-small transition-all duration-300 ease-out",
                              vacancyInView 
                                ? `opacity-100 translate-x-0 delay-[${(index * 150) + (idx * 50) + 200}ms]` 
                                : 'opacity-0 translate-x-4'
                            )}
                            style={{
                              transitionDelay: vacancyInView ? `${(index * 150) + (idx * 50) + 400}ms` : '0ms'
                            }}>
                              <div className="w-1.5 h-1.5 bg-header rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="lg:flex-shrink-0">
                      <Button 
                        className={clsx(
                          "gap-2 w-full lg:w-auto transition-all duration-500 ease-out transform hover:scale-105",
                          vacancyInView 
                            ? `opacity-100 translate-y-0 delay-[${(index * 150) + 300}ms]` 
                            : 'opacity-0 translate-y-4'
                        )}
                        style={{
                          transitionDelay: vacancyInView ? `${(index * 150) + 500}ms` : '0ms'
                        }}
                      >
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={clsx(
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
                "text-muted-foreground transition-all duration-500 ease-out",
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
              "text-xl font-bold font-heading mb-3 transition-all duration-500 ease-out",
              generalInView ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4'
            )}>
              Don't see a suitable position?
            </h3>
            <p className={clsx(
              "text-muted-foreground mb-6 max-w-xl mx-auto transition-all duration-500 ease-out",
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