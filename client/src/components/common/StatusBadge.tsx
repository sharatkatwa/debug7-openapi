import React from "react";

interface StatusBadgeProps {
  status?: "operational" | "processing" | "pending" | "shipped" | "delivered" | "cancelled" | "connected" | "error";
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = "operational",
  label,
  size = "md",
  className = "",
}) => {
  const statusStyles: Record<string, { bg: string; text: string; dot: string; glow: string; defaultText: string }> = {
    operational: {
      bg: "bg-[#27C93F]/10 border-[#27C93F]/30",
      text: "text-[#27C93F]",
      dot: "bg-[#27C93F]",
      glow: "glow-success",
      defaultText: "ALL SYSTEMS OPERATIONAL",
    },
    connected: {
      bg: "bg-[#27C93F]/10 border-[#27C93F]/30",
      text: "text-[#27C93F]",
      dot: "bg-[#27C93F]",
      glow: "glow-success",
      defaultText: "CONNECTED",
    },
    processing: {
      bg: "bg-[#3B82F6]/10 border-[#3B82F6]/30",
      text: "text-[#3B82F6]",
      dot: "bg-[#3B82F6]",
      glow: "shadow-[0_0_10px_rgba(59,130,246,0.3)]",
      defaultText: "Processing",
    },
    pending: {
      bg: "bg-[#ff5e3a]/10 border-[#ff5e3a]/30",
      text: "text-[#ff5e3a]",
      dot: "bg-[#ff5e3a]",
      glow: "glow-primary",
      defaultText: "Pending",
    },
    shipped: {
      bg: "bg-[#546500]/10 border-[#bad061]/40",
      text: "text-[#546500]",
      dot: "bg-[# bad061]",
      glow: "",
      defaultText: "Shipped",
    },
    delivered: {
      bg: "bg-[#27C93F]/10 border-[#27C93F]/30",
      text: "text-[#27C93F]",
      dot: "bg-[#27C93F]",
      glow: "",
      defaultText: "Delivered",
    },
    cancelled: {
      bg: "bg-[#ba1a1a]/10 border-[#ba1a1a]/30",
      text: "text-[#ba1a1a]",
      dot: "bg-[#ba1a1a]",
      glow: "",
      defaultText: "Cancelled",
    },
    error: {
      bg: "bg-[#ba1a1a]/10 border-[#ba1a1a]/30",
      text: "text-[#ba1a1a]",
      dot: "bg-[#ba1a1a]",
      glow: "",
      defaultText: "Degraded",
    },
  };

  const current = statusStyles[status] || statusStyles.operational;
  const isSm = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-bold tracking-wider rounded-full border backdrop-blur-md transition-all ${
        isSm ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]"
      } ${current.bg} ${current.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} ${current.glow} animate-pulse`} />
      <span>{label || current.defaultText}</span>
    </span>
  );
};
