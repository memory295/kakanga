import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';

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

  return (
    <section id="home" className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          key={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          poster="/images/hero-fallback.jpg"
          preload="auto"
          src={videoSrc}
          onError={handleVideoError}
          onCanPlay={handleCanPlay}
          onEnded={handleEnded}
        />
        <div className="hero-overlay absolute inset-0" />
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
      <div className="relative z-10 px-4 w-full mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            {/* Vertical blue pillar (thicker & shorter, centered) */}
            <div className="hidden sm:block h-[36vh] w-2 rounded-full bg-primary shadow-lg" />
            {/* Slogan text aligned to pillar start/end with four lines spanning the pillar */}
            <div className="text-left h-[36vh] flex flex-col justify-between">
              <p className="font-heading font-bold uppercase text-xl md:text-3xl lg:text-4xl text-primary-foreground tracking-tight leading-tight">
                Building with quality
              </p>
              <p className="font-heading font-bold uppercase text-xl md:text-3xl lg:text-4xl text-primary-foreground tracking-tight leading-tight">
                and integrity
              </p>
              <p className="font-heading font-bold uppercase text-xl md:text-3xl lg:text-4xl text-primary-foreground tracking-tight leading-tight">
                to move
              </p>
              <p className="font-heading font-bold uppercase text-xl md:text-3xl lg:text-4xl text-primary-foreground tracking-tight leading-tight">
                Malawi forward.
              </p>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
