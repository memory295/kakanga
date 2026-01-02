'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';

const Hero = () => {
  const intended = ['/construction.mp4', '/construction-2.mp4'];
  const fallbacks = [
    'https://assets.mixkit.co/videos/preview/mixkit-workers-laying-bricks-on-a-construction-site-29241-large.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  ];
  const sources = [...intended, ...fallbacks];

  const [sourceIndex, setSourceIndex] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string>(sources[0]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref: heroRef, inView } = useInView({ threshold: 0.2, once: true });

  useEffect(() => {
    setVideoSrc(sources[sourceIndex]);
  }, [sourceIndex]);

  const handleVideoError = () => {
    // Try next source if available
    setSourceIndex((i) => (i + 1 < sources.length ? i + 1 : i));
  };

  const handleCanPlay = () => {
    // Ensure autoplay kicks in across browsers
    try {
      videoRef.current?.play().catch(() => {});
    } catch {}
  };

  const handleEnded = () => {
    // If currently playing first intended, go to second; if second, wrap to first
    setSourceIndex((i) => {
      if (i === 0) return 1; // play second
      if (i === 1) return 0; // wrap
      return i; // for fallback sources, keep as-is
    });
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          key={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          poster="/images/house1.jpg"
          preload="auto"
          src={videoSrc}
          onError={handleVideoError}
          onCanPlay={handleCanPlay}
          onEnded={handleEnded}
        />
        {/* Darkish blue with light red on left, pure darkish blue on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-800/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/16 to-transparent" />
        {/* Bottom grey background band starting at the tagline position */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '64px',
            background: 'hsl(var(--section-alt))',
          }}
        />
      </div>

      {/* Pillar + Slogan left, vertically centered */}
      <div ref={heroRef as any} className="relative z-10 px-4 w-full mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            {/* Vertical blue pillar (thicker & shorter, centered) */}
            <div
              className={
                `hidden sm:block h-[36vh] w-2 rounded-full bg-primary shadow-lg will-change-transform origin-bottom transform transition-transform duration-700 ease-out ` +
                (inView ? 'scale-y-100' : 'scale-y-0')
              }
            />
            {/* Slogan text aligned to pillar start/end with four lines spanning the pillar */}
            <div className="text-left h-[36vh] flex flex-col justify-center space-y-1">
              <div className={`relative transition-all duration-700 ease-out will-change-transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <h1 className="hero-title">
                  Building with <span className="text-primary font-semibold">quality</span>
                </h1>
                <div className={`h-0.5 bg-primary mt-2 opacity-80 transition-all duration-700 ease-out ${inView ? 'w-16' : 'w-0'} `}></div>
              </div>
              
              <h1 className={`hero-title ml-8 transition-all duration-700 ease-out will-change-transform ${inView ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 translate-y-3'}`}>
                and <span className="text-primary font-semibold">integrity</span>
              </h1>
              
              <h1 className={`hero-title transition-all duration-700 ease-out will-change-transform ${inView ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-3'}`}>
                to move <span className="text-primary font-semibold">Malawi</span> forward.
              </h1>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
