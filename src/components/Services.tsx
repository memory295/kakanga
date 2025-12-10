import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import landLevelingImg from '@/assets/service-land-leveling.jpg';
import roadWorksImg from '@/assets/service-road-works.jpg';
import drillingImg from '@/assets/service-drilling.jpg';
import concreteImg from '@/assets/service-concrete.jpg';

const services = [
  {
    title: 'House Design and Construction',
    description:
      'Professional design and construction services. We transform your plans into reality with precision, maintaining all features and dimensions as specified.',
    image: concreteImg,
  },
  {
    title: 'Civil Works',
    description:
      'Installing culverts for drainage, reshaping surfaces, and building bridges. We improve roads for better access and reduced maintenance.',
    image: roadWorksImg,
  },
  {
    title: 'Prefabricated Structures',
    description:
      'Professional installation of prefab buildings and steel warehouses. Quick assembly with factory-made components for fast, durable construction.',
    image: landLevelingImg,
  },
  {
    title: 'Supply of Construction Materials',
    description:
      'End-to-end import solutions for prefabricated structures and materials from China. Quality assurance with timely delivery guaranteed.',
    image: drillingImg,
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="caption text-primary mb-2 block">
            What We Do
          </span>
          <h2 className="heading-2 mb-4">
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
              className="group bg-white/30 rounded-lg border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="heading-5 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="body-small mb-4">
                  {service.description}
                </p>
                <Link to="/services" className="inline-flex items-center text-primary button-text hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
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