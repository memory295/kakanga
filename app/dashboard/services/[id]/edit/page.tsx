'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { servicesService } from '@/lib/firebase-service';
import { uploadFile } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { Service } from '@/lib/types';

export default function EditService() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [service, setService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    features: [''],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load existing service data
  useEffect(() => {
    const loadService = async () => {
      try {
        const serviceData = await servicesService.getById(serviceId);
        if (serviceData) {
          setService(serviceData);
          setFormData({
            title: serviceData.title,
            description: serviceData.description,
            image: serviceData.image,
            features: serviceData.features && serviceData.features.length > 0 ? serviceData.features : [''],
          });
        } else {
          toast({
            title: "Error",
            description: "Service not found",
            variant: "destructive",
          });
          router.push('/dashboard/services');
        }
      } catch (error) {
        console.error('Load service error:', error);
        toast({
          title: "Error",
          description: "Failed to load service data",
          variant: "destructive",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadService();
  }, [serviceId, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        features: newFeatures
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      let uploadedUrl: string | undefined;
      if (imageFile) {
        uploadedUrl = await uploadFile(imageFile, 'services');
      }

      const serviceData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        features: formData.features.filter(f => f.trim() !== ''),
        ...(uploadedUrl && { image: uploadedUrl })
      };

      const success = await servicesService.update(serviceId, serviceData);
      
      if (success) {
        toast({
          title: "Success",
          description: "Service updated successfully",
        });
        
        // Clean up preview URL
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        
        router.push('/dashboard/services');
      } else {
        toast({
          title: "Error",
          description: "Failed to update service",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Update service error:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating the service",
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

  if (!service) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">Service not found</p>
          <Link href="/dashboard/services">
            <Button className="mt-4">Back to Services</Button>
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
          <Link href="/dashboard/services">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Service: {service.title}
          </h1>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter service description"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Service Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                <p className="text-sm text-gray-500">
                  Select a new image to replace the current one. Leave empty to keep current image.
                </p>
                
                {/* Current Image */}
                {service.image && !imagePreview && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Current Image</Label>
                    <div className="mt-2 w-32 h-20 overflow-hidden rounded-lg border-2 border-gray-200">
                      <img
                        src={service.image}
                        alt="Current service"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* New Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">New Image Preview</Label>
                    <div className="mt-2 w-32 h-20 overflow-hidden rounded-lg border-2 border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Service Features</Label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1"
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin h-4 w-4 border border-white border-t-transparent rounded-full mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Update Service
                </Button>
                <Link href="/dashboard/services">
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