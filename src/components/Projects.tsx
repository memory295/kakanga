import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import landLevelingImg from '@/assets/service-land-leveling.jpg';
import roadWorksImg from '@/assets/service-road-works.jpg';
import drillingImg from '@/assets/service-drilling.jpg';
import concreteImg from '@/assets/service-concrete.jpg';

const categories = ['All', 'Leveling', 'Drilling', 'Concrete', 'Roads'];

const projects = [
  {
    title: 'Construction of Laboratory, Cafeteria and Change Room at NOCMA Blantyre Depot',
    category: 'Concrete',
    image: concreteImg,
  },
  {
    title: 'Machinga Irrigation Construction',
    category: 'Leveling',
    image: landLevelingImg,
  },
  {
    title: 'Chitipa – Ilomba (T301 – D002) Road in Chitipa District',
    category: 'Roads',
    image: roadWorksImg,
  },
  {
    title: 'Dunduzu Nkhorongo Road',
    category: 'Roads',
    image: roadWorksImg,
  },
  {
    title: 'Ntchisi Road Project',
    category: 'Roads',
    image: roadWorksImg,
  },
  {
    title: 'Industrial Drilling Project',
    category: 'Drilling',
    image: drillingImg,
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-section-alt">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Our Portfolio
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Explore a selection of our remarkable projects
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="min-w-[100px]"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-lg border border-gray-100"
            >
              <div className="relative h-64">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-semibold text-lg text-primary-foreground leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects">
            <Button size="lg" className="gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
