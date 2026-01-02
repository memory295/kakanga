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
    // Log but do not block rendering defaults
    // eslint-disable-next-line no-console
    console.warn('Services page error:', error);
  }

  return (
    <Layout>
      <PageHeader title="Our Services" />

      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="caption text-header mb-2 block">What We Do</span>
            <h2 className="heading-3 mb-4">Our Services</h2>
            <p className="body-base max-w-2xl mx-auto">
              We offer comprehensive construction solutions tailored to meet your every need, from land preparation to complete infrastructure development.
            </p>
          </div>

          {/* Cards grid (restored styling) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
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
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {services.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-4 text-center py-16">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-600">Our services information is currently being updated. Please check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="heading-3 text-foreground mb-4">Ready to Start Your Project?</h2>
            <p className="body-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and detailed quote. Let's bring your construction vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Get Free Quote</Button>
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