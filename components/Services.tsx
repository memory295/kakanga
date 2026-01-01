'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useInView } from '@/hooks/use-in-view';

const services = [
  {
    title: 'House Design and Construction',
    description:
      'Professional design and construction services. We transform your plans into reality with precision, maintaining all features and dimensions as specified.',
    image: '/images/house2.jpg',
  },
  {
    title: 'Civil Works',
    description:
      'Installing culverts for drainage, reshaping surfaces, and building bridges. We improve roads for better access and reduced maintenance.',
    image: '/images/rehab.jpg',
  },
  {
    title: 'Prefabricated Structures',
    description:
      'Professional installation of prefab buildings and steel warehouses. Quick assembly with factory-made components for fast, durable construction.',
    image: '/images/van.jpg',
  },
  {
    title: 'Supply of Construction Materials',
    description:
      'End-to-end import solutions for prefabricated structures and materials from China. Quality assurance with timely delivery guaranteed.',
    image: '/images/IMG_20221019_173829.jpg',
  },
];

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
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
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white/30 rounded-lg border border-gray-100 h-full flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="heading-6 mb-3 group-hover:text-header transition-colors">
                  {service.title}
                </h3>
                <p className="body-base mb-4 flex-1">
                  {service.description}
                </p>
                <Link href="/services" className="inline-flex items-center text-header button-text hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button size="default" className="gap-2">
              View All Services <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;