import React from "react";
import { Server, Database, Zap, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";

export const ServerEntryStatus: React.FC = () => {
  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden shadow-lg border border-white/80">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/10 to-[#27C93F]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top row: Icon and region pill */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#eae8e7] flex items-center justify-center text-[#5a413b]">
          <Server className="w-5 h-5" />
        </div>
        <span className="font-mono text-[10px] font-bold tracking-wider px-3 py-1 rounded-full bg-white/70 border border-white text-[#5a413b]">
          US-EAST-1
        </span>
      </div>

      {/* Server Entry Status */}
      <div className="mb-6">
        <h3 className="text-xl font-extrabold text-[#1b1c1c] tracking-tight">Server Entry</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <code className="px-2.5 py-0.5 rounded-lg bg-black/5 font-mono text-xs text-[#5a413b] font-medium">
            server.ts
          </code>
          <CheckCircle2 className="w-4 h-4 text-[#27C93F]" />
        </div>
      </div>

      {/* Infrastructure connections */}
      <div className="space-y-4 pt-4 border-t border-[#eae8e7]/80">
        {/* MongoDB */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#27C93F]/10 flex items-center justify-center text-[#27C93F]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1b1c1c]">MongoDB</p>
              <p className="font-mono text-[10px] text-[#5a413b]/70">742h 12m uptime</p>
            </div>
          </div>
          <StatusBadge status="connected" size="sm" />
        </div>

        {/* Redis */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1b1c1c]">Redis Cache</p>
              <p className="font-mono text-[10px] text-[#5a413b]/70">Hit Rate: 94%</p>
            </div>
          </div>
          <StatusBadge status="connected" size="sm" />
        </div>
      </div>
    </div>
  );
};
