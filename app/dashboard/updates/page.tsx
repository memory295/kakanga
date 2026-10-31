'use client';

import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUpdates } from '@/hooks/use-data';
import { updatesService } from '@/lib/supabase-service';
import { toast } from '@/hooks/use-toast';
import { CalendarDays, Edit, Newspaper, Plus, Trash2 } from 'lucide-react';

export default function UpdatesDashboard() {
  const { updates, loading, refetch } = useUpdates(true);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this update? This action cannot be undone.')) return;
    if (await updatesService.delete(id)) {
      toast({ title: 'Success', description: 'Update deleted successfully' });
      refetch();
    } else {
      toast({ title: 'Error', description: 'Failed to delete update', variant: 'destructive' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="flex items-center text-2xl font-bold text-gray-900"><Newspaper className="mr-2 h-6 w-6" />Updates</h1><p className="mt-1 text-gray-600">Manage company news and announcements.</p></div>
          <Link href="/dashboard/updates/new"><Button><Plus className="mr-2 h-4 w-4" />Create Update</Button></Link>
        </div>
        {loading ? <div className="py-16 text-center text-gray-500">Loading updates...</div> : updates.length === 0 ? (
          <Card><CardContent className="py-16 text-center text-gray-500">No updates created yet.</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {updates.map(update => (
              <Card key={update.id}><CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0"><div className="mb-2 flex flex-wrap items-center gap-2"><Badge variant={update.isPublished ? 'default' : 'secondary'}>{update.isPublished ? 'Published' : 'Draft'}</Badge><Badge variant="outline">{update.category}</Badge>{update.isFeatured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}</div><h2 className="truncate text-lg font-semibold">{update.title}</h2><p className="mt-1 flex items-center gap-2 text-sm text-gray-500"><CalendarDays className="h-4 w-4" />{new Date(update.publishedDate || update.createdAt).toLocaleDateString()}</p></div>
                <div className="flex shrink-0 gap-2"><Link href={`/dashboard/updates/${update.id}/edit`}><Button variant="outline" size="sm"><Edit className="mr-1 h-4 w-4" />Edit</Button></Link><Button variant="outline" size="sm" onClick={() => handleDelete(update.id)}><Trash2 className="mr-1 h-4 w-4" />Delete</Button></div>
              </CardContent></Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
