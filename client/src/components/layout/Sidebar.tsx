import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { tokenStorage } from "../../api/tokenStorage";

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/inventory", label: "Inventory", icon: Boxes },
    { to: "/orders", label: "Orders", icon: ShoppingCart },
    { to: "/security", label: "Security & Auth", icon: ShieldCheck },
  ];

  const isAuthenticated = !!tokenStorage.getAccessToken();

  return (
    <aside className="w-64 min-h-screen flex flex-col justify-between p-6 border-r border-[#eae8e7]/80 bg-[#fbf9f8]/60 backdrop-blur-md sticky top-0 h-screen overflow-y-auto">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-full bg-[#b42907] text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-[#b42907]/25">
            H
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-[#1b1c1c] leading-tight">
              Horizon Store
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
              <span className="font-mono text-[10px] font-bold text-[#5a413b]/70 tracking-wider">
                API Live
              </span>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "glass-pill text-[#b42907] shadow-sm font-bold"
                    : "text-[#5a413b] hover:bg-white/60 hover:text-[#1b1c1c]"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Profile & Scalar Docs */}
      <div className="space-y-4 pt-6 border-t border-[#eae8e7]/80">
        <a
          href="http://localhost:5000/api/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel text-xs font-bold text-[#1b1c1c] hover:bg-white transition-all shadow-sm group"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-[#b42907]" />
            <span>Scalar API Docs</span>
          </div>
          <span className="font-mono text-[10px] text-[#5a413b]/70 group-hover:text-[#b42907]">
            :5000
          </span>
        </a>

        {/* User profile card */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/40 border border-white/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#EC4899] p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-[#1b1c1c]">
              {isAuthenticated ? "U" : "G"}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1b1c1c] truncate">
              {isAuthenticated ? "Signed In User" : "Guest Mode"}
            </p>
            <p className={`font-mono text-[10px] font-bold ${isAuthenticated ? "text-[#27C93F]" : "text-[#5a413b]/70"}`}>
              {isAuthenticated ? "Token Active" : "No Auth Session"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
