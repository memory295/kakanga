import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Calendar, MapPin, User, Building2 } from "lucide-react";
import Link from "next/link";
import { defaultProjects } from '@/lib/default-data';
import { projectsService } from '@/lib/supabase-service';
import { notFound } from 'next/navigation';
import ProjectImageGallery from './ProjectImageGallery';

// Generate static params for all default projects
export async function generateStaticParams() {
  return defaultProjects.map((_, index) => ({
    id: `default-${index}`,
  }));
}

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = params;
  let projectWithId: any = null;

  if (id.startsWith('default-')) {
    const projectIndex = parseInt(id.replace('default-', ''));
    const defaultProject = defaultProjects[projectIndex];
    if (!defaultProject) {
      notFound();
    }
    projectWithId = {
      id,
      ...defaultProject,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } else {
    const project = await projectsService.getById(id);
    if (!project) {
      notFound();
    }
    projectWithId = project as any;
  }

  // Handle both single image (string) and multiple images (array)
  const images = Array.isArray(projectWithId.image) ? projectWithId.image : [projectWithId.image];

  return (
    <Layout>
      <PageHeader title={projectWithId.title} />

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
            <ProjectImageGallery images={images} title={projectWithId.title} />

            {/* Project Details */}
            <div className="space-y-8">
              {/* Category Badge */}
              <div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 mb-4">
                  {projectWithId.category}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{projectWithId.title}</h1>
              </div>

              {/* Project Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Client</div>
                        <div className="text-gray-600">{projectWithId.client}</div>
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
                        <div className="text-gray-600">{projectWithId.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {projectWithId.completionDate && (
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Completed</div>
                          <div className="text-gray-600">
                            {new Date(projectWithId.completionDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {projectWithId.projectValue && (
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Project Value</div>
                          <div className="text-gray-600">{projectWithId.projectValue}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Reference Number */}
              {projectWithId.referenceNumber && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Reference Number</h3>
                  <p className="text-sm font-mono bg-gray-50 px-3 py-2 rounded border">
                    {projectWithId.referenceNumber}
                  </p>
                </div>
              )}

              {/* Description */}
              {projectWithId.description && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
                  <p className="text-gray-600 leading-relaxed">{projectWithId.description}</p>
                </div>
              )}

              {/* Key Features */}
              {projectWithId.keyFeatures && projectWithId.keyFeatures.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {projectWithId.keyFeatures.map((feature, index) => (
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