'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { updatesService } from '@/lib/supabase-service';
import { Update } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface UpdateFormProps {
  update?: Update;
}

export default function UpdateForm({ update }: UpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: update?.title || '',
    excerpt: update?.excerpt || '',
    content: update?.content || '',
    category: update?.category || 'Company News',
    image: update?.image || '',
    publishedDate: update?.publishedDate ? new Date(update.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    isPublished: update?.isPublished || false,
    isFeatured: update?.isFeatured || false,
  });

  const setField = (field: string, value: string | boolean) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim() || !formData.category.trim()) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const data = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      content: formData.content.trim(),
      category: formData.category.trim(),
      image: formData.image.trim() || undefined,
      publishedDate: formData.isPublished ? new Date(formData.publishedDate) : undefined,
      isPublished: formData.isPublished,
      isFeatured: formData.isFeatured,
    };

    const success = update
      ? await updatesService.update(update.id, data)
      : Boolean(await updatesService.create(data));

    setLoading(false);
    if (!success) {
      toast({ title: 'Error', description: `Failed to ${update ? 'update' : 'create'} update`, variant: 'destructive' });
      return;
    }
    toast({ title: 'Success', description: `Update ${update ? 'updated' : 'created'} successfully` });
    router.push('/dashboard/updates');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/updates"><Button variant="outline" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />Back to Updates</Button></Link>
        <h1 className="text-2xl font-bold text-gray-900">{update ? 'Edit Update' : 'Create Update'}</h1>
      </div>
      <Card className="max-w-3xl">
        <CardHeader><CardTitle>Update Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2"><Label htmlFor="title">Title *</Label><Input id="title" value={formData.title} onChange={e => setField('title', e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="excerpt">Excerpt *</Label><Textarea id="excerpt" value={formData.excerpt} onChange={e => setField('excerpt', e.target.value)} rows={3} required /></div>
            <div className="space-y-2"><Label htmlFor="content">Full Content *</Label><Textarea id="content" value={formData.content} onChange={e => setField('content', e.target.value)} rows={10} required /></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="category">Category *</Label><Input id="category" value={formData.category} onChange={e => setField('category', e.target.value)} placeholder="Project Updates" required /></div>
              <div className="space-y-2"><Label htmlFor="publishedDate">Publish Date</Label><Input id="publishedDate" type="date" value={formData.publishedDate} onChange={e => setField('publishedDate', e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="image">Cover Image URL</Label><Input id="image" type="url" value={formData.image} onChange={e => setField('image', e.target.value)} placeholder="https://..." /></div>
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-sm font-medium"><Checkbox checked={formData.isPublished} onCheckedChange={value => setField('isPublished', value === true)} />Publish this update</label>
              <label className="flex items-center gap-3 text-sm font-medium"><Checkbox checked={formData.isFeatured} onCheckedChange={value => setField('isFeatured', value === true)} />Feature this update</label>
            </div>
            <Button type="submit" disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? 'Saving...' : 'Save Update'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
