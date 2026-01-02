'use client';

import { useState } from 'react';
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
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  Building,
  CheckCircle,
  XCircle,
  List
} from 'lucide-react';
import Link from 'next/link';
import { useVacancies } from '@/hooks/use-data';
import { vacanciesService } from '@/lib/firebase-service';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';

export default function VacanciesDashboard() {
  const { vacancies, loading, error, refetch } = useVacancies();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [deleting, setDeleting] = useState<string | null>(null);

  // Get unique departments and statuses
  const departments = ['All', ...Array.from(new Set(vacancies.map(vacancy => vacancy.department).filter(Boolean)))];
  const statuses = ['All', 'Active', 'Inactive'];

  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vacancy.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vacancy.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Active' && vacancy.isActive) ||
                         (selectedStatus === 'Inactive' && !vacancy.isActive);
    const matchesDepartment = selectedDepartment === 'All' || vacancy.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleDelete = async (vacancyId: string) => {
    if (window.confirm('Are you sure you want to delete this vacancy? This action cannot be undone.')) {
      setDeleting(vacancyId);
      try {
        const success = await vacanciesService.delete(vacancyId);
        if (success) {
          toast({
            title: "Success",
            description: "Vacancy deleted successfully",
          });
          refetch();
        } else {
          toast({
            title: "Error",
            description: "Failed to delete vacancy",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the vacancy",
          variant: "destructive",
        });
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleToggleStatus = async (vacancyId: string, currentStatus: boolean) => {
    try {
      const success = await vacanciesService.update(vacancyId, { isActive: !currentStatus });
      if (success) {
        toast({
          title: "Success",
          description: `Vacancy ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
        });
        refetch();
      } else {
        toast({
          title: "Error",
          description: "Failed to update vacancy status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating the vacancy",
        variant: "destructive",
      });
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
              <Briefcase className="mr-2 h-6 w-6" />
              Vacancies Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage job postings and recruitment
            </p>
          </div>
          <Link href="/dashboard/vacancies/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Post New Vacancy
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search vacancies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700 px-2 py-1">Status:</span>
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700 px-2 py-1">Department:</span>
                  {departments.map((department) => (
                    <Button
                      key={department}
                      variant={selectedDepartment === department ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDepartment(department)}
                    >
                      {department}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vacancies Grid */}
        <div className="grid gap-6">
          {filteredVacancies.map((vacancy) => (
            <Card key={vacancy.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {vacancy.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge 
                          variant={vacancy.isActive ? "default" : "secondary"}
                          className={vacancy.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {vacancy.isActive ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vacancy.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {vacancy.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {vacancy.department}
                      </span>
                      {vacancy.applicationDeadline && (
                        <span className="flex items-center gap-1 text-red-600">
                          <Calendar className="w-4 h-4" />
                          Deadline: {vacancy.applicationDeadline.toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {vacancy.description}
                    </p>

                    {vacancy.requirements && vacancy.requirements.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <List className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Requirements:</span>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 pl-4">
                          {vacancy.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                              {req}
                            </li>
                          ))}
                          {vacancy.requirements.length > 3 && (
                            <li className="text-xs text-gray-500">
                              +{vacancy.requirements.length - 3} more requirements...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Posted: {vacancy.postedDate.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated: {vacancy.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:shrink-0">
                    <Button
                      variant={vacancy.isActive ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleToggleStatus(vacancy.id, vacancy.isActive)}
                    >
                      {vacancy.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Link href={`/dashboard/vacancies/${vacancy.id}/edit`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(vacancy.id)}
                      disabled={deleting === vacancy.id}
                    >
                      {deleting === vacancy.id ? (
                        <div className="animate-spin h-3 w-3 border border-red-600 border-t-transparent rounded-full mr-1" />
                      ) : (
                        <Trash2 className="h-3 w-3 mr-1" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVacancies.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No vacancies found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedStatus !== 'All' || selectedDepartment !== 'All'
                  ? 'No vacancies match your current filters.'
                  : 'Get started by posting your first job vacancy.'}
              </p>
              <Link href="/dashboard/vacancies/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post First Vacancy
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}