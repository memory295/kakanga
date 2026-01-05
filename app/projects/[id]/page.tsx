'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Calendar, MapPin, User, Building2 } from "lucide-react";
import Link from "next/link";
import { useProjects } from '@/hooks/use-data';
import { defaultProjects } from '@/lib/default-data';

// Generate static params for all default projects
export async function generateStaticParams() {
  return defaultProjects.map((_, index) => ({
    id: `default-${index}`,
  }));
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const { projects, loading } = useProjects();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  if (loading) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-wide">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <p className="mt-6 text-gray-600">Loading project details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-wide">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
              <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
              <Link href="/projects">
                <Button>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle both single image (string) and multiple images (array)
  const images = Array.isArray(project.image) ? project.image : [project.image];

  return (
    <Layout>
      <PageHeader title={project.title} />

      {/* Back Navigation */}
      <section className="py-4 border-b">
        <div className="container-wide">
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Images */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Main Image */}
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <img
                  src={images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video overflow-hidden rounded-md border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-primary' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="space-y-8">
              {/* Category Badge */}
              <div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 mb-4">
                  {project.category}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{project.title}</h1>
              </div>

              {/* Project Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Client</div>
                        <div className="text-gray-600">{project.client}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Location</div>
                        <div className="text-gray-600">{project.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {project.completionDate && (
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Completed</div>
                          <div className="text-gray-600">
                            {new Date(project.completionDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {project.projectValue && (
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Project Value</div>
                          <div className="text-gray-600">{project.projectValue}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Reference Number */}
              {project.referenceNumber && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Reference Number</h3>
                  <p className="text-sm font-mono bg-gray-50 px-3 py-2 rounded border">
                    {project.referenceNumber}
                  </p>
                </div>
              )}

              {/* Description */}
              {project.description && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {project.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in a Similar Project?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us to discuss how we can bring your construction vision to life with the same level of quality and professionalism.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Get Free Quote</Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg">View More Projects</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}