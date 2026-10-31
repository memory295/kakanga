'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useUpdates } from '@/hooks/use-data';
import { CalendarDays, ArrowRight, Newspaper } from 'lucide-react';
import { truncateWords } from '@/lib/utils';

export default function UpdatesPage() {
  const { updates, loading } = useUpdates();
  const featured = updates.find(update => update.isFeatured) || updates[0];
  const remaining = featured ? updates.filter(update => update.id !== featured.id) : [];

  return (
    <Layout>
      <PageHeader title="Updates" />
      <section className="section-padding">
        <div className="container-wide">
          {loading ? (
            <div className="py-16 text-center text-muted-foreground">Loading updates...</div>
          ) : updates.length === 0 ? (
            <div className="py-16 text-center">
              <Newspaper className="mx-auto mb-4 h-12 w-12 text-primary/60" />
              <h2 className="heading-4 mb-2">No updates yet</h2>
              <p className="body-base">Check back soon for news from Kakanga Constructions.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {featured && (
                <Link href={`/updates/${featured.id}`} className="group grid overflow-hidden rounded-2xl bg-header text-white shadow-lg md:grid-cols-2">
                  <div className="min-h-64 bg-white/10">
                    {featured.image && <img src={featured.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <Badge className="mb-4 w-fit bg-accent text-accent-foreground">{featured.category}</Badge>
                    <h2 className="heading-3 mb-4 text-white">{featured.title}</h2>
                    <div className="mb-4 flex items-center gap-2 text-sm text-white/70">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(featured.publishedDate || featured.createdAt).toLocaleDateString()}
                    </div>
                    <p className="mb-6 text-white/80">{truncateWords(featured.content)}</p>
                    <span className="flex items-center gap-2 font-semibold text-primary">Read update <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              )}
              {remaining.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {remaining.map(update => (
                    <Link key={update.id} href={`/updates/${update.id}`}>
                      <Card className="group h-full overflow-hidden border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="aspect-video bg-muted">
                          {update.image && <img src={update.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                        </div>
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary">{update.category}</Badge>
                          <h3 className="mb-3 line-clamp-2 text-xl font-semibold group-hover:text-primary">{update.title}</h3>
                          <p className="mb-5 text-sm text-muted-foreground">{truncateWords(update.content)}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            {new Date(update.publishedDate || update.createdAt).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
