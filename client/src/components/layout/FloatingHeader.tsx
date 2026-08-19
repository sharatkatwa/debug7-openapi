import React from "react";
import { Search, Bell, Settings, ArrowUpRight } from "lucide-react";
import { Button } from "../common/Button";

interface FloatingHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  activeTab = "Health",
  onTabChange,
}) => {
  const tabs = ["API Docs", "Health", "Logs"];

  return (
    <header className="sticky top-4 z-40 mx-6 mb-8">
      <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-sm border border-white/80">
        {/* Left: Engine title & navigation pills */}
        <div className="flex items-center gap-8">
          <span className="font-extrabold text-base tracking-tight text-[#1b1c1c]">
            Horizon Engine
          </span>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#5a413b]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className={`transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "text-[#b42907] font-bold border-b-2 border-[#b42907] pb-0.5"
                    : "hover:text-[#1b1c1c]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Search, Notifications, Settings, Deploy button */}
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5a413b]/60" />
            <input
              type="text"
              placeholder="Search endpoints or orders..."
              className="pl-9 pr-4 py-1.5 rounded-full text-xs bg-white/50 border border-white/70 focus:outline-none focus:bg-white focus:border-[#b42907]/40 w-48 transition-all"
            />
          </div>

          <button className="p-2 rounded-full hover:bg-white/70 text-[#5a413b] transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/70 text-[#5a413b] transition-colors">
            <Settings className="w-4 h-4" />
          </button>

          <Button
            variant="primary"
            size="sm"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            onClick={() => window.open("http://localhost:4000/api/docs", "_blank")}
          >
            Deploy
          </Button>
        </div>
      </div>
    </header>
  );
};
