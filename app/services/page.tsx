'use client';

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useServices } from '@/hooks/use-data';

export default function ServicesPage() {
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <Layout>
        <PageHeader title="Our Services" />
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
      <PageHeader title="Our Services" />

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="caption text-header mb-2 block">
              What We Do
            </span>
            <h2 className="text-2xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive construction solutions tailored to meet your every need, from land preparation to complete infrastructure development.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-16">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.id} className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Image */}
                  <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                    <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-md">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                    <span className="text-primary text-sm font-medium mb-2 block">
                      Service {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-semibold mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <div className="grid gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full shrink-0"></div>
                              <span className="text-gray-500 text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {services.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-600">Our services information is currently being updated. Please check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center">
            <span className="text-primary text-sm font-medium mb-2 block">
              Get Started
            </span>
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Contact us today for a free consultation and detailed quote. Let's bring your construction vision to life.
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