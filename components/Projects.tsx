'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '@/hooks/use-data';

const categories = ['All', 'Construction', 'Fabrication', 'Rehabilitation', 'Installation'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { projects, loading, error } = useProjects();

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-section-alt">
        <div className="container-wide">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Projects error:', error);
    // Component will still render with empty state or cached data
  }

  return (
    <section id="projects" className="section-padding bg-section-alt">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">
            Our Portfolio
          </span>
          <h2 className="heading-3 font-heading mb-4">Recent Projects</h2>
          <p className="body-base max-w-2xl mx-auto">
            Explore our diverse portfolio of successful construction projects across Malawi, 
            showcasing our expertise and commitment to excellence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-white text-gray-600 hover:bg-primary/5 hover:text-primary border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-200">
                <img
                  src={Array.isArray(project.image) ? project.image[0] : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 leading-tight">
                  {project.title}
                </h3>
                
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">Client</h4>
                  <p className="text-xs text-muted-foreground mb-3">{project.client}</p>
                </div>

                {project.referenceNumber && (
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">Reference</h4>
                    <p className="text-xs text-muted-foreground">{project.referenceNumber}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">Location</h4>
                  <p className="text-xs text-muted-foreground">{project.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
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