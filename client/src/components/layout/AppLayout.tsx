import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { FloatingHeader } from "./FloatingHeader";

export const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#fbf9f8]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16">
        <FloatingHeader />
        <main className="flex-1 px-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
