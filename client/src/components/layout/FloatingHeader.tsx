import React from "react";
import { ExternalLink, CheckCircle } from "lucide-react";

export const FloatingHeader: React.FC = () => {
  return (
    <header className="sticky top-4 z-40 mx-6 mb-8">
      <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-sm border border-white/80">
        {/* Left: Store Title & backend status */}
        <div className="flex items-center gap-4">
          <span className="font-extrabold text-sm tracking-tight text-[#1b1c1c]">
            Horizon E-Commerce Dashboard
          </span>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#27C93F]/10 border border-[#27C93F]/30 text-[#27C93F] text-[11px] font-mono font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Backend Connected (Port 5000)</span>
          </div>
        </div>

        {/* Right: Scalar Docs Link */}
        <div className="flex items-center gap-3">
          <a
            href="http://localhost:5000/api/docs"
            target="_blank"
            rel="noreferrer"
            className="glass-pill px-4 py-1.5 rounded-full text-xs font-bold text-[#b42907] hover:bg-white flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Interactive API Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
