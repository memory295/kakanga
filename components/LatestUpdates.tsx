'use client';

import Link from 'next/link';
import { CalendarDays, ArrowRight, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useUpdates } from '@/hooks/use-data';
import { truncateWords } from '@/lib/utils';

export default function LatestUpdates() {
  const { updates, loading } = useUpdates();
  const latest = updates.slice(0, 3);

  if (!loading && latest.length === 0) return null;

  return (
    <section className="section-padding bg-section-alt">
      <div className="container-wide">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="caption text-header">Latest News</span>
            <h2 className="heading-3 mt-2">Updates</h2>
          </div>
          <Link href="/updates" className="hidden items-center gap-2 text-sm font-semibold text-primary hover:underline sm:flex">
            View all updates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">Loading updates...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {latest.map(update => (
              <Link key={update.id} href={`/updates/${update.id}`}>
                <Card className="group h-full overflow-hidden border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="aspect-video bg-muted">
                    {update.image ? (
                      <img src={update.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-header/10"><Newspaper className="h-10 w-10 text-primary/60" /></div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">{update.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{new Date(update.publishedDate || update.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="mb-3 line-clamp-2 text-lg font-semibold group-hover:text-primary">{update.title}</h3>
                    <p className="text-sm text-muted-foreground">{truncateWords(update.content)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
        <Link href="/updates" className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline sm:hidden">
          View all updates <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
