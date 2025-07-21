import { cn } from "@/utils/cn";

interface GlassifyProps {
  children: React.ReactNode;
  className?: string;
}

export default function Glassify({
  children,
  className = "p-4 rounded-lg",
}: GlassifyProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-4 rounded-xl border-1 border-txt-secondary/20 w-fit",
        "bg-gradient-to-bl from-transparent via-white/5 to-transparent aspect-square",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(225deg, rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 120%), linear-gradient(45deg, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)",
        maskComposite: "intersect",
      }}
    >
      {children}
    </div>
  );
}
