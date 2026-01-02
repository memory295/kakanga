'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useInView } from '@/hooks/use-in-view';
import { useServices } from '@/hooks/use-data';

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <section id="services" className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Services error:', error);
    // Component will still render with empty state or cached data
  }

  return (
    <section ref={ref as any} id="services" className={`section-padding bg-background transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="caption text-header mb-2 block">
            What We Do
          </span>
          <h2 className="heading-3 mb-4">
            Our Services
          </h2>
          <p className="body-base max-w-2xl mx-auto">
            We offer comprehensive construction solutions tailored to meet your every need, from land preparation to complete infrastructure development.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((service, index) => (
            <div 
              key={service.id}
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {service.description}
              </p>
              {service.features && service.features.length > 0 && (
                <div className="space-y-1">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-500">
                      <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button className="gap-2 group">
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;