'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { vacanciesService } from '@/lib/firebase-service';
import { toast } from '@/hooks/use-toast';
import { Vacancy } from '@/lib/types';

export default function EditVacancy() {
  const router = useRouter();
  const params = useParams();
  const vacancyId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    location: '',
    type: 'Full-time' as 'Full-time' | 'Part-time' | 'Contract' | 'Temporary',
    requirements: [''],
    responsibilities: [''],
    applicationDeadline: '',
    isActive: true,
  });

  // Load existing vacancy data
  useEffect(() => {
    const loadVacancy = async () => {
      try {
        const vacancyData = await vacanciesService.getById(vacancyId);
        if (vacancyData) {
          setVacancy(vacancyData);
          setFormData({
            title: vacancyData.title,
            description: vacancyData.description,
            department: vacancyData.department,
            location: vacancyData.location,
            type: vacancyData.type as any,
            requirements: vacancyData.requirements && vacancyData.requirements.length > 0 ? vacancyData.requirements : [''],
            responsibilities: vacancyData.responsibilities && vacancyData.responsibilities.length > 0 ? vacancyData.responsibilities : [''],
            applicationDeadline: vacancyData.applicationDeadline ? vacancyData.applicationDeadline.toISOString().split('T')[0] : '',
            isActive: vacancyData.isActive,
          });
        } else {
          toast({
            title: "Error",
            description: "Vacancy not found",
            variant: "destructive",
          });
          router.push('/dashboard/vacancies');
        }
      } catch (error) {
        console.error('Load vacancy error:', error);
        toast({
          title: "Error",
          description: "Failed to load vacancy data",
          variant: "destructive",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadVacancy();
  }, [vacancyId, router]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'requirements' | 'responsibilities', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const addArrayItem = (field: 'requirements' | 'responsibilities') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'responsibilities', index: number) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        [field]: newArray
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.department.trim() || !formData.location.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const vacancyData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        department: formData.department.trim(),
        location: formData.location.trim(),
        type: formData.type,
        requirements: formData.requirements.filter(r => r.trim() !== ''),
        responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline) : undefined,
        isActive: formData.isActive,
      };

      const success = await vacanciesService.update(vacancyId, vacancyData);
      
      if (success) {
        toast({
          title: "Success",
          description: "Vacancy updated successfully",
        });
        router.push('/dashboard/vacancies');
      } else {
        toast({
          title: "Error",
          description: "Failed to update vacancy",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Update vacancy error:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating the vacancy",
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

  if (!vacancy) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">Vacancy not found</p>
          <Link href="/dashboard/vacancies">
            <Button className="mt-4">Back to Vacancies</Button>
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
          <Link href="/dashboard/vacancies">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vacancies
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Vacancy: {vacancy.title}
          </h1>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Vacancy Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter job title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter detailed job description"
                  rows={4}
                  required
                />
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
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter job location"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Requirements</Label>
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                      className="flex-1"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('requirements', index)}
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
                  onClick={() => addArrayItem('requirements')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Responsibilities</Label>
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={responsibility}
                      onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                      placeholder={`Responsibility ${index + 1}`}
                      className="flex-1"
                    />
                    {formData.responsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('responsibilities', index)}
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
                  onClick={() => addArrayItem('responsibilities')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responsibility
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked as boolean)}
                />
                <Label htmlFor="isActive">
                  Active (visible to job seekers)
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin h-4 w-4 border border-white border-t-transparent rounded-full mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Update Vacancy
                </Button>
                <Link href="/dashboard/vacancies">
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