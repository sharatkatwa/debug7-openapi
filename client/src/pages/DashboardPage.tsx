import React from "react";
import { StatusBadge } from "../components/common/StatusBadge";
import { TelemetryGrid } from "../components/dashboard/TelemetryGrid";
import { ServerEntryStatus } from "../components/dashboard/ServerEntryStatus";
import { ServiceCard } from "../components/dashboard/ServiceCard";
import { ShoppingBag, UserCheck, Search, Truck, Filter } from "lucide-react";

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Top Hero Section: Engine Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Engine Health Headline & Metrics */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <StatusBadge status="operational" label="ALL SYSTEMS OPERATIONAL" size="md" />
            <h1 className="text-5xl md:text-6xl font-black text-[#1b1c1c] tracking-tight">
              Engine Health
            </h1>
            <p className="text-base text-[#5a413b]/80 max-w-xl leading-relaxed">
              Real-time telemetry and API performance metrics for the Horizon E-commerce backend infrastructure.
            </p>
          </div>

          {/* Telemetry Metrics Grid */}
          <TelemetryGrid />
        </div>

        {/* Right: Server Entry & Database Status */}
        <div className="lg:col-span-4">
          <ServerEntryStatus />
        </div>
      </div>

      {/* The 12 APIs Core Service Throughput */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1b1c1c] tracking-tight">The 12 APIs</h2>
            <p className="text-xs text-[#5a413b]/80 mt-1">Core service throughput and request volume.</p>
          </div>

          <button className="glass-pill px-4 py-2 text-xs font-bold text-[#5a413b] flex items-center gap-2 hover:bg-white transition-colors cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Large Service Card (Catalog Service) */}
          <div className="md:col-span-2 lg:col-span-1">
            <ServiceCard
              name="Catalog Service"
              endpoint="/api/products"
              method="GET"
              throughput="12.4k"
              latency="24ms"
              featured={true}
            />
          </div>

          {/* Checkout Service */}
          <ServiceCard
            name="Checkout Service"
            endpoint="/api/orders"
            method="POST"
            throughput="3.2k"
            latency="45ms"
            icon={ShoppingBag}
          />

          {/* User Auth Service */}
          <ServiceCard
            name="User Auth"
            endpoint="/api/users/login"
            method="POST"
            throughput="8.1k"
            latency="120ms"
            icon={UserCheck}
          />

          {/* Search Index Service */}
          <ServiceCard
            name="Search Service"
            endpoint="/api/products?search="
            method="GET"
            throughput="5.8k"
            latency="22ms"
            icon={Search}
          />

          {/* Logistics & Shipping */}
          <ServiceCard
            name="Cart Service"
            endpoint="/api/cart"
            method="POST"
            throughput="4.3k"
            latency="85ms"
            icon={Truck}
          />
        </div>
      </div>
    </div>
  );
};
