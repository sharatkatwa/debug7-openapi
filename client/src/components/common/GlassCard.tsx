import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "panel" | "pill" | "interactive";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "glass-card rounded-2xl p-6",
    panel: "glass-panel rounded-3xl p-8",
    pill: "glass-pill rounded-full px-4 py-2",
    interactive:
      "glass-card rounded-2xl p-6 hover:shadow-lg hover:border-white/90 hover:scale-[1.01] transition-all duration-200 cursor-pointer",
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
