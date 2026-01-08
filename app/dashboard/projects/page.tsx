'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FolderOpen,
  Calendar,
  User,
  MapPin,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useProjects } from '@/hooks/use-data';
import { projectsService } from '@/lib/supabase-service';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';

export default function ProjectsDashboard() {
  const { projects, loading, error, refetch } = useProjects(true);
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleting, setDeleting] = useState<string | null>(null);

  const categories = ['All', 'Construction', 'Fabrication', 'Rehabilitation', 'Installation'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setDeleting(projectId);
      try {
        const success = await projectsService.delete(projectId);
        if (success) {
          toast({
            title: "Success",
            description: "Project deleted successfully",
          });
          refetch();
        } else {
          toast({
            title: "Error",
            description: "Failed to delete project",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the project",
          variant: "destructive",
        });
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FolderOpen className="mr-2 h-6 w-6" />
              Projects Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your construction project portfolio
            </p>
          </div>
          <Link href="/dashboard/projects/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Project
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={Array.isArray(project.image) ? project.image[0] : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Link href={`/dashboard/projects/${project.id}/edit`}>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                    >
                      {deleting === project.id ? (
                        <div className="animate-spin h-3 w-3 border border-red-600 border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {project.title}
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <User className="h-3 w-3 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{project.client}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{project.location}</span>
                  </div>

                  {project.referenceNumber && (
                    <div className="flex items-start gap-2">
                      <FileText className="h-3 w-3 mt-0.5 shrink-0" />
                      <span className="line-clamp-1 font-mono text-xs">
                        {project.referenceNumber}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Updated: {project.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'All'
                  ? 'No projects match your current filters.'
                  : 'Get started by creating your first project.'}
              </p>
              <Link href="/dashboard/projects/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}