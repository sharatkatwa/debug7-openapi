import React from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: "blue" | "green" | "orange" | "dark" | "purple";
  subtext?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit = "",
  color = "dark",
  subtext,
  className = "",
}) => {
  const colorStyles = {
    blue: "text-[#3B82F6]",
    green: "text-[#27C93F]",
    orange: "text-[#ff5e3a]",
    dark: "text-[#1b1c1c]",
    purple: "text-[#8B5CF6]",
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-mono text-[10px] font-bold tracking-wider text-[#5a413b]/70 uppercase mb-1">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${colorStyles[color]}`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm font-semibold text-[#5a413b]/60 lowercase">
            {unit}
          </span>
        )}
      </div>
      {subtext && (
        <span className="text-xs text-[#5a413b]/70 mt-1 font-medium">
          {subtext}
        </span>
      )}
    </div>
  );
};
