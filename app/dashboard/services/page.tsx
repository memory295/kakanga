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
  Settings,
  Calendar,
  Image as ImageIcon,
  List
} from 'lucide-react';
import Link from 'next/link';
import { useServices } from '@/hooks/use-data';
import { servicesService } from '@/lib/firebase-service';
import { useAuth } from '@/contexts/auth-context';
import { toast } from '@/hooks/use-toast';

export default function ServicesDashboard() {
  const { services, loading, error, refetch } = useServices(true);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      setDeleting(serviceId);
      try {
        const success = await servicesService.delete(serviceId);
        if (success) {
          toast({
            title: "Success",
            description: "Service deleted successfully",
          });
          refetch();
        } else {
          toast({
            title: "Error",
            description: "Failed to delete service",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the service",
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
              <Settings className="mr-2 h-6 w-6" />
              Services Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your service offerings and descriptions
            </p>
          </div>
          <Link href="/dashboard/services/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Service
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-sm line-clamp-2 flex-1">
                    {service.title}
                  </h3>
                  <div className="flex gap-1">
                    <Link href={`/dashboard/services/${service.id}/edit`}>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(service.id)}
                      disabled={deleting === service.id}
                    >
                      {deleting === service.id ? (
                        <div className="animate-spin h-3 w-3 border border-red-600 border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <List className="h-3 w-3 text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">Features:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>Updated: {service.updatedAt.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? 'No services match your search criteria.'
                  : 'Get started by creating your first service.'}
              </p>
              <Link href="/dashboard/services/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Service
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}