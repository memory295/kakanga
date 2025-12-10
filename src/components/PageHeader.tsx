import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

const PageHeader = ({ title, backgroundImage }: PageHeaderProps) => {
  return (
    <section 
      className="relative h-[360px] md:h-[420px] flex items-center justify-center"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : 'linear-gradient(135deg, hsl(var(--header-bg)), hsl(var(--primary)))',
        backgroundSize: 'cover',
        backgroundPosition: backgroundImage ? 'center' : 'center',
      }}
    >
      {/* Overlay stack to soften busy imagery and keep text legible */}
      <div
        className="absolute inset-0"
        style={
          backgroundImage
            ? { background: "linear-gradient(135deg, rgba(10, 28, 52, 0.7), rgba(0, 163, 232, 0.42))" }
            : { backgroundColor: "hsl(var(--header-bg))", opacity: 0.12 }
        }
        aria-hidden="true"
      />
      {backgroundImage && (
        <>
          <div className="absolute inset-0 bg-[#071a33]/28 mix-blend-multiply" aria-hidden="true" />
          <div className="absolute inset-0 bg-primary/22 mix-blend-soft-light" aria-hidden="true" />
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0a1f3f]/55 via-primary/32 to-transparent" aria-hidden="true" />
      <div className="relative z-10 text-center text-header-foreground">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">{title}</h1>
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">{title}</span>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
