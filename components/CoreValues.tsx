'use client';

import { useEffect, useMemo, useState } from "react";
import { Shield, Heart, Award, Lightbulb, Users, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

type ValueKey = "Integrity" | "Safety" | "Quality" | "Innovation" | "Collaboration";

const values = [
  {
    key: "Integrity" as ValueKey,
    title: "Integrity",
    description:
      "We operate with unwavering integrity, maintaining transparency, ethical practices, and strict adherence to regulations and industry standards.",
    icon: Shield,
    image: "/images/core-values/intergirity.png",
  },
  {
    key: "Safety" as ValueKey,
    title: "Safety",
    description:
      "We prioritize the safety of our workforce, clients, and the communities in which we operate through continuous improvement of safety practices.",
    icon: Heart,
    image: "/images/core-values/safety.png",
  },
  {
    key: "Quality" as ValueKey,
    title: "Quality",
    description:
      "We are committed to delivering construction projects of the highest quality, meeting or exceeding client expectations through meticulous planning.",
    icon: Award,
    image: "/images/core-values/quality.png",
  },
  {
    key: "Innovation" as ValueKey,
    title: "Innovation",
    description:
      "We embrace innovation and technological advancements, constantly seeking new and efficient ways to deliver projects.",
    icon: Lightbulb,
    image: "/images/core-values/innovation.png",
  },
  {
    key: "Collaboration" as ValueKey,
    title: "Collaboration",
    description:
      "We believe in the power of collaboration and teamwork, fostering an inclusive and supportive work environment.",
    icon: Users,
    image: "/images/core-values/collaboration.png",
  },
];

const CoreValues = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = values[activeIndex];

  // Auto-slide every 6s
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % values.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const onPrev = () => setActiveIndex((i) => (i - 1 + values.length) % values.length);
  const onNext = () => setActiveIndex((i) => (i + 1) % values.length);

  const leftNavItems = useMemo(
    () =>
      values.map((v, idx) => ({
        title: v.title,
        icon: v.icon,
        active: idx === activeIndex,
        onClick: () => setActiveIndex(idx),
      })),
    [activeIndex]
  );

  return (
    <section id="values" className="section-padding bg-white motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
      <div className="container-wide">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">
            What We Stand For
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_560px] items-start gap-6">
          {/* Left: small container with links and fade grey bg */}
          <aside className="rounded-lg p-4 md:p-5 bg-gradient-to-b from-gray-200 to-gray-100 text-foreground">
            <nav className="space-y-2">
              {leftNavItems.map((item, idx) => (
                <button
                  key={item.title}
                 
                  className={`w-full flex items-center gap-3 rounded-md px-3 py-2 label transition-colors ${
                    item.active
                      ? "bg-white shadow-sm text-header"
                      : "hover:bg-white/70"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Middle: text in between the two containers */}
          <div className="flex flex-col items-start justify-center text-left px-4 pr-6 md:pr-10">
            <div className="flex items-center gap-2 mb-3">
              <active.icon className="w-6 h-6 text-header" />
              <h3 className="heading-5 text-foreground">{active.title}</h3>
            </div>
            <p className="body-small text-gray-700 max-w-md ml-2">
              {active.description}
            </p>
            <a
              href="#"
              className="mt-4 ml-2 inline-flex items-center text-header font-medium hover:underline"
            >
              Learn more
              <ArrowRight className="w-4 h-4 ml-2 animate-bounce" />
            </a>
          </div>

          {/* Right: smaller, centered slideshow */}
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden mx-auto w-full max-w-[560px]">
            <div className="relative h-64 bg-black/10">
              {/* Image; fallback gradient if missing */}
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover transition-transform duration-500"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  // Fallback to correctly spelled integrity if available
                  if (active.title === "Integrity" && img.src.endsWith("intergirity.png")) {
                    img.src = "/images/core-values/intergirity.png";
                    return;
                  }
                  // Hide if not found
                  img.style.display = "none";
                }}
              />
              <div className="absolute inset-0 hidden [img+&]:hidden bg-gradient-to-br from-header/40 to-indigo-500/30" />

              {/* Controls */}
              <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
                <button
                  aria-label="Previous"
                 
                  className="rounded-full bg-black/40 hover:bg-black/60 text-white p-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1">
                  {values.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-6 rounded-full ${i === activeIndex ? "bg-header" : "bg-white/40"}`}
                    />
                  ))}
                </div>
                <button
                  aria-label="Next"
                 
                  className="rounded-full bg-black/40 hover:bg-black/60 text-white p-2"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* No text here; text is in the middle column */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
