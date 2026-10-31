'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { updatesService } from '@/lib/supabase-service';
import { Update } from '@/lib/types';
import { ArrowLeft, CalendarDays } from 'lucide-react';

export default function UpdateDetailPage() {
  const params = useParams();
  const [update, setUpdate] = useState<Update | null>(null);

  useEffect(() => {
    updatesService.getById(params.id as string).then(setUpdate);
  }, [params.id]);

  if (!update) {
    return <Layout><PageHeader title="Update" /><div className="section-padding text-center">Loading update...</div></Layout>;
  }

  return (
    <Layout>
      <PageHeader title={update.title} />
      <article className="section-padding">
        <div className="container-wide mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{update.category}</Badge>
            <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{new Date(update.publishedDate || update.createdAt).toLocaleDateString()}</span>
          </div>
          {update.image && <img src={update.image} alt="" className="mb-8 max-h-[480px] w-full rounded-2xl object-cover shadow-md" />}
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">{update.excerpt}</p>
          <div className="whitespace-pre-wrap text-base leading-8 text-foreground">{update.content}</div>
          <Link href="/updates" className="mt-10 inline-block">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" />Back to Updates</Button>
          </Link>
        </div>
      </article>
    </Layout>
  );
}
