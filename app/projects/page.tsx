'use client';

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProjects } from '@/hooks/use-data';

const categories = ['All', 'Construction', 'Fabrication', 'Rehabilitation', 'Installation'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { projects, loading, error } = useProjects();

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  if (loading) {
    return (
      <Layout>
        <PageHeader
          title="Our Projects"
        />
        <div className="section-padding">
          <div className="container-wide">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <p className="mt-6 text-gray-600">Loading projects...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    console.error('Projects page error:', error);
    // Component will still render with empty state or cached data
  }

  return (
    <Layout>
      <PageHeader
        title="Our Projects"
      />

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 text-sm font-medium rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-primary/5 hover:text-primary border border-gray-200 hover:border-primary/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer">
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={Array.isArray(project.image) ? project.image[0] : project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Client:</span>
                        <p className="text-gray-600 mt-1">{project.client}</p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-900">Location:</span>
                      <p className="text-gray-600 mt-1">{project.location}</p>
                    </div>
                    
                    {project.referenceNumber && (
                      <div>
                        <span className="font-medium text-gray-900">Reference:</span>
                        <p className="text-gray-600 mt-1 text-xs font-mono bg-gray-50 px-2 py-1 rounded">
                          {project.referenceNumber}
                        </p>
                      </div>
                    )}

                    {project.description && (
                      <div>
                        <span className="font-medium text-gray-900">Description:</span>
                        <p className="text-gray-600 mt-1 text-sm line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">
                No projects match the selected category. Try selecting a different category.
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
                <Button size="lg" className="shadow-lg">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}