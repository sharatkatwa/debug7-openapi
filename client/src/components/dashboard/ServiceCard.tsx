import React from "react";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  name: string;
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  throughput: string;
  latency?: string;
  icon?: LucideIcon;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  endpoint,
  method = "GET",
  throughput,
  latency,
  icon: Icon,
  featured = false,
}) => {
  if (featured) {
    return (
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-md border border-white/90">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            <code className="font-mono text-xs font-semibold text-[#5a413b]">
              <span className="text-[#3B82F6] font-bold">{method}</span> {endpoint}
            </code>
          </div>
          <h3 className="text-3xl font-extrabold text-[#1b1c1c] tracking-tight">{name}</h3>
        </div>

        <div className="mt-8 flex items-baseline justify-between">
          <div>
            <span className="text-5xl font-black text-[#3B82F6] tracking-tight">{throughput}</span>
            <span className="text-xs font-mono text-[#5a413b]/80 ml-2 font-bold uppercase">req/sec</span>
          </div>
          {latency && (
            <span className="font-mono text-xs font-bold text-[#27C93F] px-2.5 py-1 rounded-full bg-[#27C93F]/10 border border-[#27C93F]/30">
              {latency}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-white/90 transition-all group">
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className="w-10 h-10 rounded-2xl bg-white/70 flex items-center justify-center text-[#5a413b] group-hover:scale-105 transition-transform">
            <Icon className="w-5 h-5" />
          </div>
        )}
        {latency && (
          <span className="font-mono text-[10px] font-bold text-[#27C93F] px-2 py-0.5 rounded-full bg-[#27C93F]/10">
            {latency}
          </span>
        )}
      </div>

      <div>
        <h4 className="text-base font-bold text-[#1b1c1c] tracking-tight mb-2">{name}</h4>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#5a413b]/70 truncate max-w-[120px]">
            <strong className="text-[#b42907]">{method}</strong> {endpoint}
          </span>
          <span className="font-bold text-[#1b1c1c]">
            {throughput} <span className="text-[9px] text-[#5a413b]/60 uppercase">req/s</span>
          </span>
        </div>
      </div>
    </div>
  );
};
