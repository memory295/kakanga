'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { projectsService } from '@/lib/supabase-service';
import { uploadFile } from '@/lib/supabase-storage';
import { toast } from '@/hooks/use-toast';
import { Project } from '@/lib/types';

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    client: '',
    referenceNumber: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Load existing project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await projectsService.getById(projectId);
        if (projectData) {
          setProject(projectData);
          setFormData({
            title: projectData.title,
            description: projectData.description,
            category: projectData.category,
            location: projectData.location,
            client: projectData.client,
            referenceNumber: projectData.referenceNumber || '',
          });
        } else {
          toast({
            title: "Error",
            description: "Project not found",
            variant: "destructive",
          });
          router.push('/dashboard/projects');
        }
      } catch (error) {
        console.error('Load project error:', error);
        toast({
          title: "Error",
          description: "Failed to load project data",
          variant: "destructive",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadProject();
  }, [projectId, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImageFiles(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim() || !formData.category.trim() || !formData.client.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      let uploadedUrls: string[] = [];
      
      // Upload new images if any were selected with error handling
      if (imageFiles.length > 0) {
        try {
          for (const file of imageFiles) {
            try {
              const url = await uploadFile(file, 'projects');
              if (url) uploadedUrls.push(url);
            } catch (uploadError) {
              console.error('Individual image upload error:', uploadError);
              // Continue with other images even if one fails
            }
          }
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          toast({
            title: "Warning",
            description: "Some images failed to upload. Continuing with update.",
            variant: "destructive",
          });
        }
      }

      const projectData: any = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        location: formData.location.trim(),
        client: formData.client.trim(),
        ...(uploadedUrls.length > 0 && {
          image: uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls
        })
      };
      const refTrim = formData.referenceNumber.trim();
      if (refTrim) {
        projectData.referenceNumber = refTrim;
      }

      const success = await projectsService.update(projectId, projectData);
      
      if (success) {
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
        
        // Clean up preview URLs
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        
        router.push('/dashboard/projects');
      } else {
        toast({
          title: "Error",
          description: "Failed to update project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Update project error:', error);
      toast({
        title: "Error",
        description: `An error occurred while updating the project: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">Project not found</p>
          <Link href="/dashboard/projects">
            <Button className="mt-4">Back to Projects</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Project: {project.title}
          </h1>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="Enter project category"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter project description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter project location"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input
                    id="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
                    placeholder="Enter reference number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client *</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Update Project Images</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                <p className="text-sm text-gray-500">
                  Select new images to replace existing ones. Leave empty to keep current images.
                </p>
                
                {/* Current Images */}
                {project.image && !imagePreviews.length && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Current Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {(Array.isArray(project.image) ? project.image : [project.image]).map((imgUrl, index) => (
                        <div key={index} className="aspect-video overflow-hidden rounded-lg border-2 border-gray-200">
                          <img
                            src={imgUrl}
                            alt={`Current ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* New Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">New Images Preview ({imagePreviews.length} images)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-video overflow-hidden rounded-lg border-2 border-gray-200">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin h-4 w-4 border border-white border-t-transparent rounded-full mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Update Project
                </Button>
                <Link href="/dashboard/projects">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}