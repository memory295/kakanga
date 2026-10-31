'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updatesService } from '@/lib/supabase-service';
import { UPDATE_CATEGORIES, Update, UpdateCategory } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import { uploadFile } from '@/lib/supabase-storage';

interface UpdateFormProps {
  update?: Update;
}

export default function UpdateForm({ update }: UpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageSource, setImageSource] = useState<'url' | 'upload'>(update?.image ? 'url' : 'url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: update?.title || '',
    content: update?.content || '',
    category: update?.category || UPDATE_CATEGORIES[0],
    image: update?.image || '',
    publishedDate: update?.publishedDate ? new Date(update.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    isPublished: update?.isPublished || false,
    isFeatured: update?.isFeatured || false,
  });

  const setField = (field: string, value: string | boolean) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleImageFileChange = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid image', description: 'Please select an image file.', variant: 'destructive' });
      return;
    }
    setImageFile(file);
    setField('image', URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.category.trim()) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    let image = formData.image.trim() || undefined;
    if (imageSource === 'upload' && imageFile) {
      try {
        image = await uploadFile(imageFile, 'updates');
      } catch (error) {
        console.error('Update image upload error:', error);
        toast({ title: 'Image upload failed', description: 'The update was not saved. Please try again.', variant: 'destructive' });
        setLoading(false);
        return;
      }
    }
    const data = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category as UpdateCategory,
      image,
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
            <div className="space-y-2"><Label htmlFor="content">Full Content *</Label><Textarea id="content" value={formData.content} onChange={e => setField('content', e.target.value)} rows={10} required /></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={value => setField('category', value)}>
                  <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {UPDATE_CATEGORIES.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label htmlFor="publishedDate">Publish Date</Label><Input id="publishedDate" type="date" value={formData.publishedDate} onChange={e => setField('publishedDate', e.target.value)} /></div>
            </div>
            <div className="space-y-3">
              <Label>Cover image</Label>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant={imageSource === 'url' ? 'default' : 'outline'} size="sm" onClick={() => setImageSource('url')}>Use image URL</Button>
                <Button type="button" variant={imageSource === 'upload' ? 'default' : 'outline'} size="sm" onClick={() => setImageSource('upload')}><Upload className="mr-2 h-4 w-4" />Choose from computer</Button>
              </div>
              {imageSource === 'url' ? (
                <Input id="image" type="url" value={formData.image} onChange={e => setField('image', e.target.value)} placeholder="https://..." />
              ) : (
                <Input id="image-file" type="file" accept="image/*" onChange={e => handleImageFileChange(e.target.files?.[0])} className="file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-primary/90" />
              )}
              {formData.image && <img src={formData.image} alt="Cover preview" className="h-32 w-full rounded-md object-cover md:w-64" />}
            </div>
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
