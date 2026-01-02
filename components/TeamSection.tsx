'use client';

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useStaff } from '@/hooks/use-data';

export default function TeamSection() {
  const { staff, loading, error } = useStaff();

  if (loading) {
    return (
      <section id="our-team" className="section-padding bg-section-alt scroll-mt-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="caption text-header mb-2 block">Our Team</span>
            <h2 className="heading-3 font-heading mb-4">Meet the Leadership</h2>
            <p className="body-base max-w-2xl mx-auto">Experienced professionals leading projects with integrity and excellence.</p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Staff section error:', error);
    // Component will still render with empty state or cached data
  }

  return (
    <section id="our-team" className="section-padding bg-section-alt scroll-mt-24">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="caption text-header mb-2 block">Our Team</span>
          <h2 className="heading-3 font-heading mb-4">Meet the Leadership</h2>
          <p className="body-base max-w-2xl mx-auto">Experienced professionals leading projects with integrity and excellence.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.slice(0, 6).map((member) => (
            <div key={member.id} className="group rounded-2xl overflow-hidden border border-gray-100 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <AspectRatio ratio={4/3}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </AspectRatio>
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-header border border-white/70">
                  {member.department || 'Team'}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="heading-6 text-foreground line-clamp-1">{member.name}</h3>
                    <p className="body-small text-muted-foreground mb-2">{member.role}</p>
                    {member.bio && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{member.bio}</p>
                    )}
                    <div className="space-y-1">
                      {member.email && (
                        <p className="text-xs text-blue-600">{member.email}</p>
                      )}
                      {member.phone && (
                        <p className="text-xs text-gray-500">{member.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}