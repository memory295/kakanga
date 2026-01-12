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
            We offer comprehensive construction solutions tailored to meet your every need, delivering excellence in every project we undertake.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services
            .filter(service => service.title !== 'Civil Works')
            .slice(0, 3)
            .map((service, index) => (
            <div 
              key={service.id}
              className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image with Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={Array.isArray(service.image) ? service.image[0] : service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="heading-4 mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>
                <p className="body-base mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                
                {service.features && service.features.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover Effect Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/services">
            <Button size="lg" className="gap-3 group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="font-semibold">Explore All Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;