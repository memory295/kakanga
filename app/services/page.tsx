'use client';

import { useInView } from '@/hooks/use-in-view';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useServices } from '@/hooks/use-data';

const AnimatedSection = ({ children, index = 0 }: { children: React.ReactNode; index?: number }) => {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  
  return (
    <div 
      ref={ref as any}
      className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {children}
    </div>
  );
};

export default function ServicesPage() {
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <Layout>
        <PageHeader
          title="Our Services"
        />
        <div className="section-padding">
          <div className="container-wide">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <p className="mt-6 text-gray-600">Loading services...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    console.error('Services page error:', error);
    // Component will still render with empty state or cached data
  }

  return (
    <Layout>
      <PageHeader
        title="Our Services"
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="caption text-header mb-2 block">
              What We Offer
            </span>
            <h2 className="heading-4 mb-4">
              Comprehensive Construction Solutions
            </h2>
            <p className="body-base max-w-3xl mx-auto text-muted-foreground">
              From initial design to final construction, we provide end-to-end solutions 
              that ensure your project is completed on time, within budget, and to the highest standards.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} index={index}>
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="heading-5 mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="body-base text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {service.features && service.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No services available</h3>
              <p className="text-gray-600">
                Our services information is currently being updated. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="heading-3 text-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="body-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and detailed quote. 
              Let's bring your construction vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}