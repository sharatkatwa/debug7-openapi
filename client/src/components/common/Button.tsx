import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold gap-2",
    lg: "px-7 py-3 text-base font-bold gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#b42907] text-white hover:bg-[#932005] active:scale-95 shadow-md shadow-[#b42907]/20 border border-[#b42907]",
    secondary:
      "bg-[#546500] text-white hover:bg-[#435100] active:scale-95 shadow-md shadow-[#546500]/20 border border-[#546500]",
    glass:
      "glass-panel text-[#1b1c1c] hover:bg-white/80 active:scale-95 border border-white/70 shadow-sm",
    ghost:
      "bg-transparent text-[#5a413b] hover:bg-white/50 active:scale-95 border border-transparent hover:border-black/5",
    danger:
      "bg-[#ba1a1a] text-white hover:bg-[#93000a] active:scale-95 shadow-md shadow-[#ba1a1a]/20",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
