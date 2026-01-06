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
  Users,
  Calendar,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import Link from 'next/link';
import { useStaff } from '@/hooks/use-data';
import { staffService } from '@/lib/firebase-service';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';

export default function StaffDashboard() {
  const { staff, loading, error, refetch } = useStaff(true);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [deleting, setDeleting] = useState<string | null>(null);

  // Get unique departments
  const departments = ['All', ...Array.from(new Set(staff.map(member => member.department || 'General').filter(Boolean)))];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'All' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleDelete = async (staffId: string) => {
    if (window.confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
      setDeleting(staffId);
      try {
        const success = await staffService.delete(staffId);
        if (success) {
          toast({
            title: "Success",
            description: "Staff member deleted successfully",
          });
          refetch();
        } else {
          toast({
            title: "Error",
            description: "Failed to delete staff member",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the staff member",
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
              <Users className="mr-2 h-6 w-6" />
              Staff Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your team members and their information
            </p>
          </div>
          <Link href="/dashboard/staff/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Staff Member
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
                    placeholder="Search staff members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
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
          </CardContent>
        </Card>

        {/* Staff Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStaff.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/placeholder-person.jpg';
                  }}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/dashboard/staff/${member.id}/edit`}>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(member.id)}
                      disabled={deleting === member.id}
                    >
                      {deleting === member.id ? (
                        <div className="animate-spin h-3 w-3 border border-red-600 border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  {member.department && (
                    <div className="flex items-center gap-2">
                      <Building className="h-3 w-3" />
                      <span>{member.department}</span>
                    </div>
                  )}
                  
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                  
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                  )}

                  {member.bio && (
                    <p className="text-xs text-gray-500 line-clamp-2 pt-2">
                      {member.bio}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Updated: {member.updatedAt.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No staff members found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedDepartment !== 'All'
                  ? 'No staff members match your current filters.'
                  : 'Get started by adding your first team member.'}
              </p>
              <Link href="/dashboard/staff/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Team Member
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}