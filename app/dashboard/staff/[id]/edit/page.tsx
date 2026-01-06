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
import { staffService } from '@/lib/firebase-service';
import { uploadFile } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';
import { Staff } from '@/lib/types';

export default function EditStaff() {
  const router = useRouter();
  const params = useParams();
  const staffId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [staff, setStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
    linkedin: '',
    experience: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Load existing staff data
  useEffect(() => {
    const loadStaff = async () => {
      try {
        const staffData = await staffService.getById(staffId);
        if (staffData) {
          setStaff(staffData);
          setFormData({
            name: staffData.name,
            role: staffData.role,
            department: staffData.department || '',
            email: staffData.email || '',
            phone: staffData.phone || '',
            bio: staffData.bio || '',
            photo: staffData.photo || '',
            linkedin: staffData.linkedin || '',
            experience: staffData.experience || '',
          });
        } else {
          toast({
            title: "Error",
            description: "Staff member not found",
            variant: "destructive",
          });
          router.push('/dashboard/staff');
        }
      } catch (error) {
        console.error('Load staff error:', error);
        toast({
          title: "Error",
          description: "Failed to load staff data",
          variant: "destructive",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadStaff();
  }, [staffId, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.role.trim() || !formData.department.trim()) {
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
      if (photoFile) {
        uploadedUrl = await uploadFile(photoFile, 'staff');
      }

      const staffData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        department: formData.department.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        bio: formData.bio.trim(),
        linkedin: formData.linkedin.trim() || undefined,
        experience: formData.experience.trim() || undefined,
        ...(uploadedUrl && { photo: uploadedUrl })
      };

      const success = await staffService.update(staffId, staffData);
      
      if (success) {
        toast({
          title: "Success",
          description: "Staff member updated successfully",
        });
        
        // Clean up preview URL
        if (photoPreview) {
          URL.revokeObjectURL(photoPreview);
        }
        
        router.push('/dashboard/staff');
      } else {
        toast({
          title: "Error",
          description: "Failed to update staff member",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Update staff error:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating the staff member",
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

  if (!staff) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">Staff member not found</p>
          <Link href="/dashboard/staff">
            <Button className="mt-4">Back to Staff</Button>
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
          <Link href="/dashboard/staff">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Staff
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Staff: {staff.name}
          </h1>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Staff Member Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role/Position *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="Enter role or position"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="Enter department"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Years of experience"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="Enter LinkedIn profile URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio/Description</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Enter brief biography or description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                <p className="text-sm text-gray-500">
                  Select a new photo to replace the current one. Leave empty to keep current photo.
                </p>
                
                {/* Current Photo */}
                {staff.photo && !photoPreview && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Current Photo</Label>
                    <div className="mt-2 w-24 h-24 overflow-hidden rounded-full border-2 border-gray-200">
                      <img
                        src={staff.photo}
                        alt="Current profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* New Photo Preview */}
                {photoPreview && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">New Photo Preview</Label>
                    <div className="mt-2 w-24 h-24 overflow-hidden rounded-full border-2 border-gray-200">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
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
                  Update Staff Member
                </Button>
                <Link href="/dashboard/staff">
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