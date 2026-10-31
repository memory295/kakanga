'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import UpdateForm from '@/components/UpdateForm';
import { updatesService } from '@/lib/supabase-service';
import { Update } from '@/lib/types';

export default function EditUpdatePage() {
  const params = useParams();
  const [update, setUpdate] = useState<Update | null>(null);

  useEffect(() => {
    updatesService.getById(params.id as string, true).then(setUpdate);
  }, [params.id]);

  return <DashboardLayout>{update ? <UpdateForm update={update} /> : <div className="py-16 text-center text-gray-500">Loading update...</div>}</DashboardLayout>;
}
