'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { staffService } from '@/lib/supabase-service';
import { uploadFile } from '@/lib/supabase-storage';
import { toast } from '@/hooks/use-toast';

export default function NewStaff() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
      
      // Upload photo if provided
      if (photoFile) {
        try {
          console.log('Starting staff photo upload:', photoFile.name, 'Size:', photoFile.size);
          uploadedUrl = await uploadFile(photoFile, 'staff');
          console.log('Staff photo upload successful:', uploadedUrl);
        } catch (uploadError) {
          console.error('Photo upload error:', uploadError);
          toast({
            title: "Upload Error",
            description: `Failed to upload photo: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`,
            variant: "destructive",
          });
        }
      }

      const staffData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        department: formData.department.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        bio: formData.bio.trim(),
        photo: (uploadedUrl || formData.photo.trim() || '/images/team/default.jpg'),
        linkedin: formData.linkedin.trim() || undefined,
        experience: formData.experience.trim() || undefined,
      };

      console.log('Creating staff with data:', staffData);
      const docId = await staffService.create(staffData);
      console.log('Staff creation result:', docId);
      
      if (docId) {
        toast({
          title: "Success",
          description: "Staff member added successfully",
        });
        router.push('/dashboard/staff');
      } else {
        toast({
          title: "Error",
          description: "Failed to add staff member",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Create staff error:', error);
      toast({
        title: "Error",
        description: `An error occurred while adding the staff member: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            Add New Staff Member
          </h1>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Staff Details</CardTitle>
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
                <Label htmlFor="bio">Bio/Description</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Enter staff member bio or description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Enter experience or qualifications"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Upload Profile Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setPhotoFile(file);
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPhotoPreview(url);
                    } else {
                      setPhotoPreview(null);
                    }
                  }}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Selected preview"
                    className="mt-2 h-32 w-auto rounded border"
                  />
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin h-4 w-4 border border-white border-t-transparent rounded-full mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Add Staff Member
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